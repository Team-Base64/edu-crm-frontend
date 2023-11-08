export type HomeworkSolution = {
    id: string | number;
    homework_id: string | number;
    student_id: string | number;
    time: number;
    text?: string;
    link_to_file: string; // ‘host/…./file.pdf
};
