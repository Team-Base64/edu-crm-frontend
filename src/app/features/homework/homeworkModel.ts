export type Homework = {
    id: number;
    classID: number;
    title: string;
    description: string;
    createTime: string;
    deadlineTime: string;
    tasks: number[];
};

export type HomeworkCreatePayload = {
    title: string;
    description: string;
    classID: number;
    deadlineTime: string;
    tasks: number[];
};
