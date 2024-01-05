import { useState } from 'react';

const useFakePagination = ({ data = [], ...params }) => {
    const [offset, setOffset] = useState(params?.offset || 0);
    const [first, setFirst] = useState(params?.first || 0);
    const count = data?.length;
    const currentPage = Math.ceil(offset / first) + 1;
    const handlePage = (i) => {
        i = Math.min(Math.max(1, i), count);
        if (i != currentPage) {
            setOffset((i - 1) * first);
        }
    };
    const handleFirst = (first) => {
        setFirst(first);
        setOffset(0);
    };
    return {
        page: {
            nodes: data.filter((e, i) => i >= offset && i < offset + first),
            pageInfo: {
                totalCount: count,
                hasNextPage: typeof first === 'undefined' ? false : count > first + (offset || 0),
                hasPreviousPage: typeof offset === 'undefined' ? false : offset >= (first || 0)
            }
        },
        offset,
        first,
        currentPage,
        handlePage,
        handleFirst
    };
};

export default useFakePagination;
