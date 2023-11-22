import { useGetClassSolutionsQuery } from '@app/features/homeworkSolution/homeworkSolutionSlice';
import Container from '@ui-kit/Container/Container';
import Text from '@ui-kit/Text/Text';
import React from 'react';
import Spinner from '@ui-kit/Spinner/Spinner';
import styles from './ClassSolutionsAll.module.scss';
import Icon from '@ui-kit/Icon/Icon';
import SolutionsGroup from '@components/SolutionsGroup/SolutionsGroup';

interface ClassSolutionsAllProps {
    classID: number;
}

const ClassSolutionsAll: React.FC<ClassSolutionsAllProps> = ({ classID }) => {
    const { data, isSuccess, isLoading, isError } = useGetClassSolutionsQuery({
        class_id: classID,
    });

    return (
        <Container
            direction="vertical"
            layout="defaultBase"
            classes={styles.widget}
        >
            <Text
                type="h"
                size={3}
                weight="bold"
            >
                Все решения класса
            </Text>
            {isLoading && (
                <Container>
                    <Spinner classes={styles.statusSpinner} />
                    <Text
                        type="p"
                        size={1}
                        classes={styles.statusText}
                    >
                        Загрузка...
                    </Text>
                </Container>
            )}
            {isError && (
                <Container>
                    <Icon
                        name="alert"
                        classes={styles.statusIcon}
                    />
                    <Text
                        type="p"
                        size={1}
                        classes={styles.statusText}
                    >
                        Ошибка получения данных
                    </Text>
                </Container>
            )}
            {isSuccess && (
                <SolutionsGroup
                    classes={styles.content}
                    solutions={data.solutions}
                    keys={['hwID', 'studentID', 'status']}
                />
            )}
        </Container>
    );
};

export default ClassSolutionsAll;
