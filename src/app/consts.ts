export const apiPaths = {
    origin: 'http://127.0.0.1:8080',
    basePath: `http://127.0.0.1:8080/api/`,
    chats: 'chats',

    classes: 'class',
    class: (id : string | number) => `class/${id}`,
    classNew: `class/new`,
    classStundets: (id: string | number) => `class/${id}/students`,
    classAnnouncements: (id: string | number) => `class/${id}/announcements`,
    classAnnouncementsNew: (id: string | number) => `class/${id}/announcements`,
};

export const noop = () => {};

export const maxLengthOfMessage = 4096;
