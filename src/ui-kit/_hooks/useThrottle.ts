import { throttle } from '@ui-kit/_utils/throttle';
import { useEffect } from 'react';

export const useThrottle = <A = unknown, R = void>(
    fn: (args: A) => R,
    ms: number,
): ((args: A) => Promise<R>) => {
    const [throttledFunc, teardown] = throttle<A, R>(fn, ms);

    useEffect(() => () => teardown(), [teardown]);

    return throttledFunc;
};
