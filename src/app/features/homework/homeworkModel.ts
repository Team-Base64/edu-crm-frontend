export type Homework = {
    id: string | number;
    classID: string | number;
    title: string;
    description: string;
    createTime: number;
    deadlineTime: number;
    file: string; // ‘host/…./file.pdf
};

export type HomeworkCreatePayload = {
    title: string;
    description: string;
    classID: number;
    deadlineTime: string;
    tasks: number[];
};