export type HomeworkTask  = {
    id: number,
    description: string;
    attach: string;
}


export type HomeworkTaskCreate  = {
    id: number,
    description: string;
    attach ?: File ;
}
