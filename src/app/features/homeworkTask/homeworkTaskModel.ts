export type HomeworkTask = {
    id: number;
    description: string;
    attaches: string[];
};

export type HomeworkTaskCreatePayload = {
    description: string;
    attaches: string[];
};
