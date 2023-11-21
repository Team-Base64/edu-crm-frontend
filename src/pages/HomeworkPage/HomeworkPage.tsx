import Container from "@ui-kit/Container/Container";
import { Navigate, useParams } from "react-router-dom";
import styles from './HomeworkPage.module.scss';
import Text from "@ui-kit/Text/Text";
import { useGetHomeworkQuery } from "@app/features/homework/homeworkSlice";
import Spinner from "@ui-kit/Spinner/Spinner";
import { SolutionHeaderHomeworkData } from "@components/SolutionHeader/SolutionHeader";
import ClassItem from "@components/ClassItem/ClassItem";
import Icon from "@ui-kit/Icon/Icon";
import ClassMemberList from "@components/ClassMemberList/ClassMemberList";
import React from "react";
import { UiComponentProps } from "@ui-kit/interfaces";
import { useGetHomeworkSolutionsQuery } from "@app/features/homeworkSolution/homeworkSolutionSlice";
import SolutionsGroup from "@components/ClassSolutionsAll/test";



interface HomeworkSolutionsAllProps extends UiComponentProps {
    homeworkID: number;
}

const HomeworkSolutionsAll: React.FC<HomeworkSolutionsAllProps> = ({ homeworkID, classes }) => {
    const { data, isLoading, isError, isSuccess } = useGetHomeworkSolutionsQuery({ homeworkID: homeworkID });
    return (
        <>
            {isLoading && (
                <Container classes={styles.status}>
                    <Spinner classes={styles.statusSpinner} />
                    <Text type="p" size={1} classes={styles.statusText}>
                        Загрузка...
                    </Text>
                </Container>
            )}
            {
                isError && (
                    <Container classes={styles.status}>
                        <Icon name="alert" classes={styles.statusIcon} />
                        <Text type="p" size={1} classes={styles.statusText}>
                            Произошла ошибка...
                        </Text>
                    </Container>
                )
            }
            {
                isSuccess && (
                    <SolutionsGroup
                        solutions={data.solutions}
                        keys={['isApproved', 'studentID']}
                        classes={classes}
                    />
                )
            }
        </>
    );
}

const HomeworkPage: React.FC = () => {
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

    const { data, isLoading, isError, isSuccess } = useGetHomeworkQuery({ id: id });

    return (
        <Container direction='vertical' classes={styles.page} layout='defaultBase' gap="l">
            {/* <Container direction='vertical' layout='defaultBase' gap="l"> */}
            <Text type="h" size={3} weight="bold">
                Домашнее задание id{id}
            </Text>
            {isLoading && (
                <Container classes={styles.status}>
                    <Spinner classes={styles.statusSpinner} />
                    <Text type="p" size={1} classes={styles.statusText}>
                        Загрузка...
                    </Text>
                </Container>
            )}
            {isError && (
                <Container classes={styles.status}>
                    <Icon name="alert" classes={styles.statusIcon} />
                    <Text type="p" size={1} classes={styles.statusText}>
                        Произошла ошибка...
                    </Text>
                </Container>
            )}
            {isSuccess && (
                <Container direction='grid' classes={styles.content} gap="l">
                    <Text type="h" size={4} weight="bold" classes={styles.contentTitle}>
                        Данные:
                    </Text>
                    <SolutionHeaderHomeworkData homeworkID={id} classes={styles.contentItem} />
                    <Text type="h" size={4} weight="bold" classes={styles.contentTitle}>
                        Класс:
                    </Text>
                    <ClassItem classID={data.homework.classID} classes={[styles.contentItem, styles.classItem].join(' ')} />
                    <Text type="h" size={4} weight="bold" classes={styles.contentTitle}>
                        Ученики:
                    </Text>
                    <Container direction="grid" classes={[styles.contentItem, styles.participantList].join(' ')}>
                        <ClassMemberList classId={data.homework.classID} classes={styles.participantItem} />
                    </Container>
                    <Text type="h" size={4} weight="bold" classes={styles.contentTitle}>
                        Решения:
                    </Text>
                    <HomeworkSolutionsAll homeworkID={id} classes={[styles.contentItem, styles.solutions].join(' ')} />
                </Container>
            )}
            {/* </Container> */}
        </Container >
    );
}

export default HomeworkPage;