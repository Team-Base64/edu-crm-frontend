export type ReviewItem = {
    id: number;
    evaluation: string;
};

export type ReviewPayload = {
    isApproved : boolean;
    tasks: ReviewItem[];
}