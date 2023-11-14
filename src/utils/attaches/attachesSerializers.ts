import useSendAttaches from '../../hooks/useSendAttaches.ts';
export const SerializeAttachesFromBackend = (
    result: Awaited<
        ReturnType<ReturnType<typeof useSendAttaches>['attachesSendPromise']>
    >,
) =>
    result.map((value) => {
        if ('data' in value) {
            return value.data.file;
        }
        throw Error(`error on send attach: ${value}`);
    });
