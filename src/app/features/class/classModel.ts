export type ClassCreatePayload = {
    title: string;
    description?: string;
};

export interface ClassData extends ClassCreatePayload {
    id: number;
    inviteToken: string;
}
