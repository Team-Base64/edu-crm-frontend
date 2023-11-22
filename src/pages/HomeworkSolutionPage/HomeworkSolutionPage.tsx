import { useGetSolutionQuery } from '@app/features/homeworkSolution/homeworkSolutionSlice';
import Container from '@ui-kit/Container/Container';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import Review from '@components/Review/Review';
import styles from './HomeworkSolutionPage.module.scss';
import React from 'react';
import SolutionHeader from '@components/SolutionHeader/SolutionHeader';
import Solution from '@components/Solution/Solution';
import AppRoutes from '@router/routes';

const useGetSolutionID = () => {
    const location = useLocation();
    const params = useParams();
    const navigate = useNavigate();

    const id = Number(params.id);

    if (Number.isNaN(id)) {
        navigate(`/${AppRoutes.page404}`, {
            replace: true,
            state: { from: location },
        });
        return -1;
    }

    return id;
};

const HomeworkSolutionPage: React.FC = () => {
    const id = useGetSolutionID();
    const { data, isSuccess } = useGetSolutionQuery({ id: id });

    return (
        <Container
            direction="vertical"
            gap="l"
            classes={styles.page}
        >
            {isSuccess && <SolutionHeader solution={data.solution} />}
            <Container
                gap="l"
                classes={styles.content}
            >
                {isSuccess && (
                    <Solution
                        id={id}
                        classes={styles.solution}
                    />
                )}
                {isSuccess && (
                    <Review
                        solution={data.solution}
                        classes={styles.review}
                    />
                )}
            </Container>
        </Container>
    );
};

export default HomeworkSolutionPage;
