import appApi from '@app/appApi.ts';
import { PrefetchOptions } from '@reduxjs/toolkit/query';
import { useAppDispatch } from '@app/hooks/baseHooks.ts';
import { useEffect } from 'react';

export function usePrefetchImmediately<EndpointNames>(
    endpoint: EndpointNames,
    arg: null,
    options: PrefetchOptions = {},
) {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(
            appApi.util.prefetch(endpoint as never, arg as never, options),
        );
    }, [arg, dispatch, endpoint, options]);
}
