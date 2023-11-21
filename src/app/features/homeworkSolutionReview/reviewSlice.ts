import appApi from '@app/appApi';
import { ReviewPayload } from './reviewModel';
import { reviewPaths } from './reviewPaths';

export const reviewSlice = appApi.injectEndpoints({
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
        }),
    }),
});

export const { useCreateReviewMutation } = reviewSlice;
