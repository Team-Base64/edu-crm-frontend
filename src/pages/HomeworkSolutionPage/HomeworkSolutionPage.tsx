import { useGetSolutionQuery } from "@app/features/homeworkSolution/homeworkSolutionSlice";
import Container from "@ui-kit/Container/Container";
import { useParams, Navigate } from "react-router-dom";
import Review from "@components/Review/Review";
import styles from './HomeworkSolutionPage.module.scss';
import React from "react";
import SolutionHeader from "@components/SolutionHeader/SolutionHeader";
import Solution from "@components/Solution/Solution";



const HomeworkSolutionPage : React.FC = () => {
    const params = useParams();
    const id = Number(params.id);

    if (Number.isNaN(id)) {
        return (
            <Navigate
                to="/page404"
                state={{ from: location }}
            />
        );
    }

    const { data, isSuccess } = useGetSolutionQuery({ id: id });


    return (
        <Container direction='vertical' gap="l" classes={styles.page}> 
            {isSuccess && <SolutionHeader solution={data} />}
            <Container  gap="l" classes={styles.content}>
                <Solution id={id} classes={styles.solution}/>
                {isSuccess && <Review solution={data} classes={styles.review} />}
            </Container>
        </Container>
    );
}


export default HomeworkSolutionPage;
