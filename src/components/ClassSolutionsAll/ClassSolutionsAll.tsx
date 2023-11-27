import { useGetClassSolutionsQuery } from '@app/features/homeworkSolution/homeworkSolutionSlice';
import Container from '@ui-kit/Container/Container';
import Text from '@ui-kit/Text/Text';
import React from 'react';
import styles from './ClassSolutionsAll.module.scss';
import SolutionsGroup from '@components/SolutionsGroup/SolutionsGroup';
import ShowQueryState from '@components/ShowQueryState/ShowQueryState';
import { UiComponentProps } from '@ui-kit/interfaces';

interface ClassSolutionsAllProps extends UiComponentProps {
    classID: number;
}

const ClassSolutionsAll: React.FC<ClassSolutionsAllProps> = ({ 
    classID,
    classes
 }) => {
    const { data, isSuccess, ...status} = useGetClassSolutionsQuery({
        class_id: classID,
    });

    return (
        <Container
            direction="vertical"
            layout="defaultBase"
            classes={[styles.widget, classes].join(' ')}
        >
            <Text
                type="h"
                size={3}
                weight="bold"
            >
                Все решения класса
            </Text>
            <ShowQueryState status={status}/>
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
