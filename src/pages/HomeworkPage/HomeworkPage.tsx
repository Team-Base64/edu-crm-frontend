import Container from '@ui-kit/Container/Container';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import styles from './HomeworkPage.module.scss';
import Text from '@ui-kit/Text/Text';
import { useGetHomeworkQuery } from '@app/features/homework/homeworkSlice';
import { SolutionHeaderHomeworkData } from '@components/SolutionHeader/SolutionHeader';
import { ClassItem } from '@components/ClassItem/ClassItem';
import ClassMemberList from '@components/ClassMemberList/ClassMemberList';
import React from 'react';
import HomeworkSolutionsAll from '@components/HomeworkSolutionsAll/HomeworkSolutionsAll';
import AppRoutes from '@router/routes';
import HomeworkTaskList from '@components/HomeworkTaskList/HomeworkTaskList';
import ShowQueryState from '@components/ShowQueryState/ShowQueryState';

const useGetHomeworkID = () => {
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

const HomeworkPage: React.FC = () => {
    const id = useGetHomeworkID();
    const { data, isSuccess, ...status } = useGetHomeworkQuery({
        id: id,
    });

    return (
        <Container
            direction="vertical"
            classes={styles.page}
            layout="defaultBase"
            gap="l"
        >
            <Text
                type="h"
                size={3}
                weight="bold"
            >
                Домашнее задание id{id}
            </Text>
            <ShowQueryState status={status} />
            {isSuccess && (
                <Container
                    direction="grid"
                    classes={styles.content}
                    gap="l"
                >
                    <Text
                        type="h"
                        size={4}
                        weight="bold"
                        classes={styles.contentTitle}
                    >
                        Данные:
                    </Text>
                    <SolutionHeaderHomeworkData
                        homeworkID={id}
                        classes={styles.contentItem}
                    />

                    <Text
                        type="h"
                        size={4}
                        weight="bold"
                        classes={styles.contentTitle}
                    >
                        Задачи:
                    </Text>
                    <HomeworkTaskList homework={data.homework} classes={styles.contentItem} />
                    <Text
                        type="h"
                        size={4}
                        weight="bold"
                        classes={styles.contentTitle}
                    >
                        Класс:
                    </Text>
                    <ClassItem
                        classID={data.homework.classID}
                        classes={[styles.contentItem, styles.classItem].join(
                            ' ',
                        )}
                    />
                    <Text
                        type="h"
                        size={4}
                        weight="bold"
                        classes={styles.contentTitle}
                    >
                        Ученики:
                    </Text>
                    <Container
                        direction="grid"
                        classes={[
                            styles.contentItem,
                            styles.participantList,
                        ].join(' ')}
                    >
                        <ClassMemberList
                            classId={data.homework.classID}
                            classes={styles.participantItem}
                        />
                    </Container>
                    <Text
                        type="h"
                        size={4}
                        weight="bold"
                        classes={styles.contentTitle}
                    >
                        Решения:
                    </Text>
                    <HomeworkSolutionsAll
                        homeworkID={id}
                        classes={[styles.contentItem, styles.solutions].join(
                            ' ',
                        )}
                    />
                </Container>
            )}
        </Container>
    );
};

export default HomeworkPage;
