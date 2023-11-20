export const updateOneSearchParam = (
    searchParams: URLSearchParams,
    key: string,
    value: string,
) => {
    const updatedSearchParams = new URLSearchParams(searchParams.toString());
    updatedSearchParams.set(key, value);

    return updatedSearchParams;
};
