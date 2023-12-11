import { ReviewPayload } from './reviewModel';
import { reviewPaths } from './reviewPaths';
import { homeworkSolutionSlice } from '../homeworkSolution/homeworkSolutionSlice';

export const reviewSlice = homeworkSolutionSlice.injectEndpoints({
    endpoints: (build) => ({
        createReview: build.mutation<
            unknown,
            { solutionID: number | string; payload: ReviewPayload }
        >({
            query: ({ solutionID, payload }) => {
                return {
                    url: reviewPaths.createReview(solutionID),
                    method: 'PUT',
                    body: JSON.stringify(payload),
                };
            },
            // TODO
            invalidatesTags: ['getHomeworkSolutions', 'getClassSolutions', 'getSolution'],
        }),
    }),
});

export const { useCreateReviewMutation } = reviewSlice;
