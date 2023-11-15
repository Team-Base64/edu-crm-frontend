export type Announcement = {
    id: string | number;
    text: string;
    createTime: number;
    attaches: string[];
};

export type AnnouncementCreatePayload = {
    text: string;
    attaches: string[];
};
