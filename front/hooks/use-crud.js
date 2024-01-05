import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';

import settings from '../settings';
import objectEquals from '../ui/utils/objectEquals';
import useToast from './use-toast';
const { endpointUrl } = settings;

const CRUDContext = createContext();
const MultiCRUDContext = createContext();
const defaultPageSize = 10;

const useCRUD = ({
    singleName,
    pluralName,
    lazy,
    filters: _filters = {},
    pageSize: _pageSize = defaultPageSize,
    withBaseRoute = true,
    readPath,
    prefix,
    extraPath = '',
    crudField,
    defaultSort = { field: 'id', direction: 'asc' }
}) => {
    const [offset, setOffset] = useState(0);
    const [search, setSearch] = useState('');
    const [first, setFirst] = useState(_pageSize);
    const [loading, setLoading] = useState(true);
    const [allowFetch, setAllowFetch] = useState(!lazy);
    const [page, setPage] = useState();
    const [filters, _setFilters] = useState(_filters);
    const { setToast } = useToast();
    const [sort, setSort] = useState(defaultSort);
    const [extra, setExtra] = useState();
    const [isTouched, setIsTouched] = useState();
    const [isFiltersTouched, setIsFiltersTouched] = useState(false);
    const [isExporting, setIsExporting] = useState(false);
    const cleanFilter = (obj) => {
        return Object.fromEntries(
            Object.entries(obj).filter((value) =>
                typeof value[1] === 'string' && !value[1]?.length ? false : true
            )
        );
    };
    const setFilters = (payload) => {
        const cleanedNewFilters = cleanFilter(payload);
        const cleanedOldFilters = cleanFilter(_filters);
        setIsFiltersTouched(!objectEquals(cleanedNewFilters, cleanedOldFilters));
        _setFilters(payload);
    };
    const fetchParams = {
        offset,
        first,
        sortBy: sort?.field,
        sortOrder: sort?.direction,
        search,
        filters
    };
    const getQuery = ({
        sortBy = fetchParams.sortBy,
        sortOrder = fetchParams.sortOrder,
        search = fetchParams.search,
        filters = fetchParams.filters
    } = {}) => {
        const params = { sortBy, sortOrder, search, ...filters };
        const queryParams = Object.entries(params)
            .filter((v) => typeof v[1] != 'undefined' && v[1] !== null)
            .map((e) => `${e[0]}=${e[1]}`)
            .join('&');
        return queryParams;
    };
    const refetch = async (
        {
            offset = fetchParams.offset,
            first = fetchParams.first,
            sortBy = fetchParams.sortBy,
            sortOrder = fetchParams.sortOrder,
            search = fetchParams.search,
            filters = fetchParams.filters
        } = {},
        force
    ) => {
        if (allowFetch || force) {
            const params = { offset, first, sortBy, sortOrder, search, ...filters };
            const queryParams = Object.entries(params)
                .filter((v) => typeof v[1] != 'undefined' && v[1] !== null)
                .map((e) => `${e[0]}=${e[1]}`)
                .join('&');
            setLoading(true);
            try {
                const { data } = await axios.get(
                    `${endpointUrl}${prefix?.length ? `/${prefix}` : ''}/${
                        readPath?.length ? readPath : pluralName
                    }${extraPath}?${queryParams}`
                );
                setPage(crudField?.length ? data[crudField] : data);
                if (crudField?.length) {
                    const dataWithoutCRUD = JSON.parse(JSON.stringify(data));
                    delete dataWithoutCRUD[crudField];
                    setExtra(dataWithoutCRUD);
                }
                setLoading(false);
                return crudField?.length ? data[crudField] : data;
            } catch (e) {
                setToast({ message: 'Échec de la récupération des données', variant: 'danger' });
            }
            setLoading(false);
        }
    };
    const handleSearch = (value) => {
        setIsTouched(true);
        setSearch(value);
        setOffset(0);
        return refetch({
            offset: 0,
            sortBy: sort.field,
            sortOrder: sort.direction,
            search: encodeURIComponent(value)
        });
    };
    const handleFirst = (value) => {
        const first = parseInt(value);
        setFirst(first);
        setOffset(0);
        refetch({ first, offset: 0 });
    };
    const handleFilters = async (_filters) => {
        setIsTouched(true);
        setFilters(_filters);
        await refetch({
            filters: _filters,
            offset,
            sortBy: sort.field,
            sortOrder: sort.direction,
            search
        });
    };
    const handleSort = (field) => {
        if (field === sort.field) {
            const _sortOrder = isDesc(sort) ? 'asc' : 'desc';
            setSort((v) => ({ ...v, direction: _sortOrder }));
            refetch(
                {
                    offset,
                    sortBy: sort.field,
                    sortOrder: _sortOrder,
                    search
                },
                true
            );
        } else {
            setSort({ field, direction: 'desc' });
            refetch(
                {
                    offset,
                    sortBy: field,
                    sortOrder: 'desc',
                    search
                },
                true
            );
        }
    };
    const add = async (data, withToast = true) => {
        const path = `${endpointUrl}${prefix?.length ? `/${prefix}` : ''}/${
            withBaseRoute ? `/${pluralName}/create` : `create-${singleName}`
        }`;
        await axios.post(path, data);
        refetch();
        if (withToast) setToast({ message: `${singleName} a été ajouté avec succès` });
    };
    const _import = async (file, withToast = true) => {
        const formData = new FormData();
        formData.append('sheet', file);
        const path = `${endpointUrl}${prefix?.length ? `/${prefix}` : ''}/${
            withBaseRoute ? `/${pluralName}/import` : `import-${singleName}`
        }`;
        await axios.post(path, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        refetch();
        if (withToast) setToast({ message: `${singleName} a été ajouté avec succès` });
    };
    const update = async ({ id, data }) => {
        const path = `${endpointUrl}${prefix?.length ? `/${prefix}` : ''}/${
            withBaseRoute ? `/${pluralName}/update` : `update-${singleName}`
        }`;
        await axios.post(`${path}/${id}`, data);
        refetch();
    };
    const _delete = async (id) => {
        const newOffset = page?.nodes?.length === 1 && currentPage != 1 ? offset - first : offset;
        if (page?.nodes?.length === 1) {
            setOffset(newOffset);
        }
        const path = `${endpointUrl}${prefix?.length ? `/${prefix}` : ''}/${
            withBaseRoute ? `${pluralName}/delete` : `delete-${singleName}`
        }`;
        await axios.post(`${path}/${id}`);
        refetch({ offset: newOffset });
    };
    const firstFetch = async (force) => {
        try {
            await refetch(undefined, force);
        } catch (e) {
            console.log(e);
        }
        setLoading(false);
    };
    useEffect(() => {
        firstFetch();
    }, [sort]);
    const fetch = async () => {
        setAllowFetch(true);
        firstFetch(true);
    };
    const currentPage = Math.ceil(offset / first) + 1;
    const handlePage = (i) => {
        i = Math.min(Math.max(1, i), page?.pageInfo?.totalCount);
        if (i != currentPage) {
            setOffset((i - 1) * first);
            refetch(
                {
                    offset: (i - 1) * first,
                    sortBy: sort.field,
                    sortOrder: sort.direction,
                    search
                },
                true
            );
        }
    };
    const _export = async ({
        sortBy = fetchParams.sortBy,
        sortOrder = fetchParams.sortOrder,
        search = fetchParams.search,
        filters = fetchParams.filters,
        title
    } = {}) => {
        setIsExporting(true);
        const params = { sortBy, sortOrder, search, ...filters };
        const queryParams = Object.entries(params)
            .filter((v) => typeof v[1] != 'undefined' && v[1] !== null)
            .map((e) => `${e[0]}=${e[1]}`)
            .join('&');
        try {
            const { data } = await axios.get(
                `${endpointUrl}${prefix?.length ? `/${prefix}` : ''}/${
                    readPath?.length ? readPath : pluralName
                }/export?${queryParams}`,
                {
                    responseType: 'arraybuffer'
                }
            );
            const url = window.URL.createObjectURL(new Blob([data]));
            const a = document.createElement('a');
            a.href = url;
            a.setAttribute('target', '_blank');
            a.setAttribute('download', title);
            a.click();
        } catch (e) {
            setToast({
                message: "Erreur lors de l'exportation du fichier excel",
                variant: 'danger'
            });
        }
        setIsExporting(false);
    };
    return {
        offset,
        first,
        loading,
        setSort,
        setSearch,
        setFilters,
        sort,
        add,
        update,
        _delete,
        handleSearch,
        handleFirst,
        handleSort,
        handlePage,
        fetch,
        currentPage,
        search,
        page,
        refetch,
        _import,
        _export,
        getQuery,
        handleFilters,
        extra,
        filters,
        isTouched,
        isFiltersTouched,
        isExporting
    };
};
export const useCRUDContext = () => useContext(CRUDContext);
export const useMultiCRUDContext = () => useContext(MultiCRUDContext);

export const CRUDProvider = ({ children, ...props }) => (
    <CRUDContext.Provider value={props}>{children}</CRUDContext.Provider>
);
export const MultiCRUDProvider = ({ children, ...props }) => (
    <MultiCRUDContext.Provider value={props}>{children}</MultiCRUDContext.Provider>
);

export default useCRUD;
function isDesc(sort) {
    return sort.direction === 'desc';
}
