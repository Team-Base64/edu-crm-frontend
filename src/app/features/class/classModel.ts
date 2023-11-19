export type ClassData = {
    id: number;
    title: string;
    description?: string;
    inviteToken: string;
};

export type ClassCreatePayload = {
    title: string;
    description?: string;
};
