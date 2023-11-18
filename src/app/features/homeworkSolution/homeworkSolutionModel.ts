export type HomeworkSolutionStatus = 'new' | 'approve' | 'reject';

export type HomeworkSolution = {
    id: string | number;
    hwID: string | number;
    studentID: string | number;
    createTime: string;
    text?: string;
    file: string; // ‘host/…./file.pdf
    status: HomeworkSolutionStatus;
    teacherEvaluation: string;
};
