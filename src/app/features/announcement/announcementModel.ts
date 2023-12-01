export type Announcement = {
    id: number;
    text: string;
    createTime: string;
    attaches: string[];
};

export type AnnouncementCreatePayload = {
    text: string;
    attaches: string[];
};
