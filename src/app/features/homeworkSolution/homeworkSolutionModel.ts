export type HomeworkSolution = {
    id: string | number;
    hwID: string | number;
    studentID: string | number;
    createTime: number;
    text?: string;
    file: string; // ‘host/…./file.pdf
};
