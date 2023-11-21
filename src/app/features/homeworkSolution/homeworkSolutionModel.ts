export type HomeworkSolutionStatus = 'new' | 'approve' | 'reject';

export type HomeworkSolution = {
    id: number;
    hwID: number;
    studentID: number;
    createTime: string;
    text?: string;
    file: string; // ‘host/…./file.pdf
    status: HomeworkSolutionStatus;
    teacherEvaluation: string;
    isApproved : boolean;
};
