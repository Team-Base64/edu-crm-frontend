// export const SerializeAttachesFromBackend = (
//     result: Awaited<ReturnType<typeof attachesSendPromise>>,
// ) =>
//     result.map((value) => {
//         if ('data' in value) {
//             return value.data.file;
//         }
//         throw Error(`error on send attach: ${value}`);
//     });
