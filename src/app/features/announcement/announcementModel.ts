export type Announcement = {
    id: string | number;
    text: string;
    createTime: number;
};

export type AnnouncementCreatePayload = {
    text: string;
};
