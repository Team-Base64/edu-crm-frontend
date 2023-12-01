export type HomeworkSolutionStatus = 'new' | 'approve' | 'reject';

export type HomeworkSolution = {
    id: number;
    hwID: number;
    studentID: number;
    createTime: string;
    text?: string;
    files: string[];
    status: HomeworkSolutionStatus;
    teacherEvaluation: string;
};
