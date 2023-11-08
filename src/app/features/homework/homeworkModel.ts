export type Homework = {
    id: string | number;
    class_id: string | number;
    title: string;
    description: string;
    create_time: number;
    deadline_time: number;
    link_to_file: string; // ‘host/…./file.pdf
};

export type HomeworkCreatePayload = {
    title: string;
    description: string;
    deadline_time: number;
    // payload: Blob
};
