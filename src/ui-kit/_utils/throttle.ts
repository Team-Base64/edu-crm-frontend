export function throttle<A = unknown, R = void>(
    fn: (args: A) => R,
    ms: number
): [(args: A) => Promise<R>, () => void] {
    let timer: ReturnType<typeof setTimeout> | undefined = undefined;

    const throttledFunc = (args: A): Promise<R> =>
        new Promise((resolve) => {
            if (timer) {
                return;
            }

            timer = setTimeout(() => {
                clearTimeout(timer);
                timer = undefined;

                resolve(fn(args));
            }, ms);
        });

    const teardown = () => clearTimeout(timer);

    return [throttledFunc, teardown];
}
