import sequelize from '../db';
import bulkActionSchema from '../validations/requests.validation';
import queryCollection, { extractParamsFromRequest, validateFilters } from './queryCollection';
const generateCRUD = (
    router,
    model,
    singleName,
    pluralName,
    schema,
    {
        createFunction,
        updateFunction,
        bulkUpdateFunction,
        deleteFunction,
        bulkDeleteFunction,
        routes: {
            create = true,
            list = true,
            view = true,
            update = true,
            _delete = true,
            bulkUpdate = true,
            bulkDelete = true
        } = {
            create: true,
            list: true,
            view: true,
            update: true,
            _delete: true,
            bulkUpdate: true,
            bulkDelete: true
        },
        queryCollection: {
            sortableFields,
            searchableFields,
            filterOptions,
            internalFields = [],
            baseQuery,
            defaultSortField,
            transformer,
            include,
            filterTransformation,
            attributes,
            sortByTransformation,
            ignoreSearch = false
        } = {},
        routesNames,
        guards,
        updateSchema,
        withBaseRoute = true,
        options: { softDeleteField = false, viewInclude = [], viewAttributes } = {
            softDeleteField: false,
            viewInclude: []
        }
    } = {}
) => {
    singleName = singleName.toLowerCase();
    pluralName = pluralName.toLowerCase();
    const finalRoutesNames = {
        list: routesNames?.list || (withBaseRoute ? '' : `/${pluralName}`),
        view: routesNames?.view || (withBaseRoute ? '' : `/${pluralName}`),
        create: routesNames?.create || (withBaseRoute ? '/create' : `/create-${singleName}`),
        _delete: routesNames?._delete || (withBaseRoute ? '/delete' : `/delete-${singleName}`),
        update: routesNames?.update || (withBaseRoute ? '/update' : `/update-${singleName}`),
        bulkUpdate:
            routesNames?.bulkUpdate ||
            (withBaseRoute ? '/bulk-update' : `/bulk-update-${singleName}`),
        bulkDelete:
            routesNames?.bulkDelete ||
            (withBaseRoute ? '/bulk-delete' : `/bulk-delete-${singleName}`)
    };
    if (list) {
        const controller = async (req, res) => {
            if (typeof internalFields === 'function') {
                try {
                    await internalFields(req);
                } catch (e) {
                    console.log(e);
                }
            }

            try {
                const _filterOptions = filterOptions ?? model.filterOptions;
                const params = extractParamsFromRequest(req);
                if (typeof sortByTransformation === 'function') {
                    params.sortBy = await sortByTransformation(params.sortBy);
                }
                const filters = await validateFilters(params?.filters, _filterOptions);
                res.json(
                    await queryCollection({
                        collection: model,
                        sortableFields: sortableFields ?? model.sortableFields,
                        searchableFields: searchableFields ?? model.searchableFields,
                        filterOptions: _filterOptions,
                        internalFields:
                            (typeof internalFields === 'function'
                                ? await internalFields(req)
                                : internalFields) ?? model.internalFields,
                        params: { ...params, includeFields: attributes },
                        baseQuery:
                            typeof baseQuery == 'function'
                                ? await baseQuery(req, filters, params)
                                : baseQuery || {},
                        include:
                            typeof include === 'function'
                                ? await include(req, filters, params)
                                : include,
                        defaultSortField,
                        transformer,
                        filterTransformation,
                        ignoreSearch
                    })
                );
            } catch (e) {
                console.log(e);
                if (!res.headersSent) res.status(400).json(e);
            }
        };
        if (guards?.list) {
            router.get(finalRoutesNames?.list, guards?.list, controller);
        } else {
            router.get(finalRoutesNames?.list, controller);
        }
    }
    if (view) {
        const controller = async (req, res) => {
            const item = await model.findOne({
                where: {
                    id: req.params.id,
                    ...(typeof baseQuery == 'function' ? await baseQuery(req) : baseQuery || {})
                },
                attributes: viewAttributes?.length ? viewAttributes : { exclude: internalFields },
                include: typeof viewInclude === 'function' ? await viewInclude(req) : viewInclude
            });
            if (!item) {
                res.status(404).json({ message: `${singleName} not found` });
                return;
            }
            res.json(item);
        };
        if (guards?.view) {
            router.get(`${finalRoutesNames?.view}/:id`, guards?.view, controller);
        } else {
            router.get(`${finalRoutesNames?.view}/:id`, controller);
        }
    }

    if (create) {
        const controller = async (req, res, next) => {
            let item, id;
            try {
                const finalSchema = typeof schema == 'function' ? await schema(req) : schema;
                item = await finalSchema.validate(req.body, { stripUnknown: true });
            } catch (e) {
                console.log(e);
                return res.status(400).json(e);
            }
            const t = await sequelize.transaction();
            try {
                if (typeof createFunction == 'function') {
                    await createFunction(item, t, req, res, next);
                } else {
                    const info = await model.create(item, { transaction: t });
                    id = info.id;
                }
                await t.commit();
            } catch (e) {
                await t.rollback();
                console.log(e);
                if (!res.headersSent) res.status(400).json(e);
            }
            if (!res.headersSent) {
                res.json({ id, ok: true, [singleName]: item });
            }
        };
        if (guards?.create) {
            router.post(finalRoutesNames?.create, guards?.create, controller);
        } else {
            router.post(finalRoutesNames?.create, controller);
        }
    }
    if (_delete) {
        const controller = async (req, res, next) => {
            if (!(await model.findOne({ where: { id: req.params.id } })))
                res.status(404).json({ message: `${singleName} not found` });
            else {
                const t = await sequelize.transaction();
                if (typeof deleteFunction == 'function') {
                    try {
                        await deleteFunction(req.params.id, t, req, res, next);
                    } catch (e) {
                        console.log(e);
                        await t.rollback();
                        return res.status(400).json(e);
                    }
                } else {
                    try {
                        if (softDeleteField?.length) {
                            await model.update(
                                {
                                    [softDeleteField]: true
                                },
                                {
                                    where: {
                                        id: req.params.id
                                    }
                                },
                                { transaction: t }
                            );
                        } else {
                            await model.destroy(
                                { where: { id: req.params.id } },
                                { transaction: t }
                            );
                        }
                        await t.commit();
                    } catch (e) {
                        await t.rollback();
                        console.log(e?.message);
                        return res.status(500).json(e);
                    }
                }
                if (!res.headersSent) res.json({ ok: true, id: req.params.id });
            }
        };
        if (guards?.delete) {
            router.post(`${finalRoutesNames?._delete}/:id`, guards?.delete, controller);
        } else {
            router.post(`${finalRoutesNames?._delete}/:id`, controller);
        }
    }
    if (update) {
        const controller = async (req, res, next) => {
            const item = await model.findOne({ where: { id: req.params.id } });
            if (!item) return res.status(404).json({ message: `${singleName} not found` });
            let data;
            try {
                const finalSchema = typeof schema == 'function' ? await schema(req) : schema;
                const finalUpdateSchema =
                    typeof updateSchema == 'function' ? await updateSchema(req) : updateSchema;
                data = await (finalUpdateSchema || finalSchema).validate(req.body, {
                    stripUnknown: true
                });
            } catch (e) {
                console.log(e);
                res.status(400).json(e);
            }
            const t = await sequelize.transaction();

            try {
                if (typeof updateFunction == 'function') {
                    await updateFunction(req.params.id, data, t, req, res, next);
                } else {
                    await item.update(data, { transaction: t });
                }
                await t.commit();
            } catch (e) {
                console.log(e);
                await t.rollback();
                if (!res.headersSent) res.status(400).json(e);
            }
            if (!res.headersSent) res.json({ ok: true, id: req.params.id });
        };
        if (guards?.write) {
            router.post(`${finalRoutesNames?.update}/:id`, guards?.write, controller);
        } else {
            router.post(`${finalRoutesNames?.update}/:id`, controller);
        }
    }
    if (bulkUpdate) {
        const controller = async (req, res, next) => {
            let ids;
            try {
                ids = (await bulkActionSchema.validate(req.body)).ids;
            } catch (e) {
                res.status(400).json(e);
                return;
            }
            if ((await model.count({ where: { id: ids } })) !== ids?.length)
                return res.status(404).json({ message: `invalid Ids` });
            let data;
            try {
                const finalSchema = typeof schema == 'function' ? await schema(req) : schema;
                const finalUpdateSchema =
                    typeof updateSchema == 'function' ? await updateSchema(req) : updateSchema;
                data = await (finalUpdateSchema || finalSchema).validate(req.body, {
                    stripUnknown: true
                });
            } catch (e) {
                console.log(e);
                if (!res.headersSent) res.status(400).json(e);
            }
            const t = await sequelize.transaction();

            try {
                if (typeof bulkUpdateFunction == 'function') {
                    await bulkUpdateFunction(ids, data, t, req, res, next);
                } else {
                    await Promise.all(
                        (
                            await model.find({ id: ids })
                        ).map(async (model) => model.update(data, { transaction: t }))
                    );
                }
                await t.commit();
            } catch (e) {
                await t.rollback();
                console.log(e);
                if (!res.headersSent) res.status(400).json(e);
            }
            if (!res.headersSent) res.json({ ok: true, ids });
        };
        if (guards?.write) {
            router.post(finalRoutesNames?.bulkUpdate, guards?.write, controller);
        } else {
            router.post(finalRoutesNames?.bulkUpdate, controller);
        }
    }
    if (bulkDelete) {
        const controller = async (req, res, next) => {
            let ids;
            try {
                ids = (await bulkActionSchema.validate(req.body)).ids;
            } catch (e) {
                res.status(400).json(e);
                return;
            }
            if ((await model.count({ where: { id: ids } })) !== ids?.length)
                return res.status(404).json({ message: `invalid Ids` });
            const t = await sequelize.transaction();
            try {
                if (typeof bulkDeleteFunction == 'function') {
                    await bulkDeleteFunction(ids, t, req, res, next);
                } else {
                    await model.destroy({ where: { id: ids } }, { transaction: t });
                }
                await t.commit();
            } catch (e) {
                await t.rollback();
                console.log(e);
                if (!res.headersSent) res.status(400).json(e);
            }
            if (!res.headersSent) res.json({ ok: true, ids });
        };
        if (guards?.delete) {
            router.post(finalRoutesNames?.bulkDelete, guards?.delete, controller);
        } else {
            router.post(finalRoutesNames?.bulkDelete, controller);
        }
    }
};

export default generateCRUD;
