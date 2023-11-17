export type Announcement = {
    id: string | number;
    text: string;
    createTime: string;
    attaches: string[];
};

export type AnnouncementCreatePayload = {
    text: string;
    attaches: string[];
};
