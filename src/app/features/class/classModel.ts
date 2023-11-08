export type ClassData = {
    id: number | string;
    title: string;
    description?: string;
    inviteToken: string;
};

export type ClassCreatePayload = {
    title: string;
    description?: string;
};
