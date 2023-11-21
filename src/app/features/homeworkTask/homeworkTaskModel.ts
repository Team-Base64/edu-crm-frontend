export type HomeworkTask = {
    id: number;
    description: string;
    attach?: string;
};

export type HomeworkTaskCreatePayload = {
    description: string;
    attach?: string;
};
