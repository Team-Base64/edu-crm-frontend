export type Announcement = {
    id: string | number;
    text: string;
    time: number;
};

export type AnnouncementCreatePayload = {
    text: string;
};
