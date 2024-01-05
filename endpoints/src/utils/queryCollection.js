import { Op } from 'sequelize';
import * as yup from 'yup';
const paramsSchemaBuilder = (
    sortableFields,
    filterOptions,
    internalFields,
    defaultSortField = 'id'
) =>
    yup
        .object()
        .shape({
            offset: yup.number().min(0),
            first: yup
                .number()
                .min(1)
                .transform((v) => (v ? v : undefined)),
            sortBy: yup.lazy((v) => {
                return !v || typeof v === 'string'
                    ? yup.string().oneOf(sortableFields).required().default(defaultSortField)
                    : yup.object({
                          models: yup.array(yup.mixed().required()),
                          field: yup.string().required()
                      });
            }),
            filters: Object.keys(filterOptions)?.length
                ? yup.object().shape(filterOptions)
                : yup.object().strip(),
            sortOrder: yup
                .string()
                .transform((v) => v.toUpperCase())
                .oneOf(['ASC', 'DESC'])
                .required()
                .default('ASC'),
            search: yup.string(),
            excludeFields: yup.array().notOneOf(internalFields),
            includeFields: yup.array().notOneOf(internalFields)
        })
        .noUnknown();
export const requestParamsBuilder = async (
    {
        offset,
        first,
        sortBy = 'id',
        sortOrder = 'asc',
        search,
        excludeFields,
        includeFields,
        filters = {},
        internalFields = []
    } = {},
    baseQuery = {},
    searchableFields,
    ignoreSearch
) => {
    const query = {
        ...baseQuery,
        ...filters
    };
    if (search?.length && searchableFields?.length && !ignoreSearch)
        query[Op.or] = await Promise.all(
            searchableFields.map((field) => ({ [field]: { [Op.like]: `%${search}%` } }))
        );
    const options = {
        offset,
        limit: first,
        order:
            typeof sortBy === 'string'
                ? [[sortBy, sortOrder]]
                : [[...sortBy.models, sortBy.field, sortOrder]],
        attributes: excludeFields
            ? { exclude: [...excludeFields, ...internalFields] }
            : includeFields
            ? includeFields
            : { exclude: internalFields }
    };
    return { query, options };
};
export const pageInfoResolver = (count, offset, first) => {
    return {
        hasNextPage: typeof first === 'undefined' ? false : count > first + (offset || 0),
        hasPreviousPage: typeof offset === 'undefined' ? false : offset >= (first || 0),
        totalCount: count
    };
};
export const applyLookups = async (nodes = [], lookupers = {}) => {
    await Promise.all(
        nodes.map(async (e) => {
            await Promise.all(
                Object.entries(lookupers).map(
                    async ([field, { id, resolve, deleteId = false }]) => {
                        e[field] = await resolve(e[id], e);
                        if (deleteId) delete e[id];
                    }
                )
            );
        })
    );
    return nodes;
};
export const applyTransformer = async (nodes = [], transformer) => {
    if (!transformer) {
        return nodes;
    } else {
        return await Promise.all(nodes.map(transformer));
    }
};
export const validateFilters = async (filters, filterOptions) => {
    const schema = Object.keys(filterOptions || {})?.length
        ? yup.object().shape(filterOptions)
        : yup.object().strip();
    return schema.validate(filters);
};
const queryCollection = async ({
    collection,
    params,
    searchableFields = [],
    sortableFields = ['id'],
    filterOptions = {},
    internalFields = [],
    baseQuery = {},
    include = [],
    requestedFields = {
        nodes: true,
        pageInfo: true
    },
    filterTransformation,
    defaultSortField = 'id',
    transformer,
    ignoreSearch
} = {}) => {
    const validated = await paramsSchemaBuilder(
        sortableFields,
        filterOptions,
        internalFields,
        defaultSortField
    ).validate(params);
    if (typeof filterTransformation == 'function')
        validated.filters = await filterTransformation(validated?.filters);
    const { offset, first } = validated || {};
    const { query, options } = await requestParamsBuilder(
        { ...validated, internalFields },
        baseQuery,
        searchableFields,
        ignoreSearch
    );
    const { count, rows } = await collection.findAndCountAll({
        where: query,
        include,
        distinct: true,
        ...options
    });
    const res = {};
    const fieldRequestMapper = {
        nodes: async () => applyTransformer(rows, transformer),
        pageInfo: () => pageInfoResolver(count, offset, first)
    };
    await Promise.all(
        Object.entries(requestedFields).map(async ([field, isRequested]) => {
            if (isRequested) res[field] = await fieldRequestMapper[field]();
        })
    );
    return res;
};
/**
 *
 * @param {import('express').Request} req
 */
export const extractParamsFromRequest = (req) => {
    const { first, offset, sortBy, sortOrder, search, ...filters } = req.query;
    return { first, offset, sortBy, sortOrder, filters, search };
};
export default queryCollection;
