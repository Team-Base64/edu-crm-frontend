export type ClassData = {
    id: number | string;
    title: string;
    description?: string;
    invite_token: string;
};

export type ClassCreatePayload = {
    title: string;
    description?: string;
};
