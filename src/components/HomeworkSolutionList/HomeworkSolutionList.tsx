import HomeworkSolutionItem from '@components/HomeworkSolutionItem/HomeworkSolutionItem';
import { UiComponentProps } from '@ui-kit/interfaces';
import React, { useId } from 'react';
import { useGetClassSolutionsQuery } from '@app/features/homeworkSolution/homeworkSolutionSlice';
import EmptyItem from '@components/EmptyItem/EmptyItem';
// import styles from './HomeworkList.module.scss';

interface HomeworkSolutionListProps extends UiComponentProps {
    classId: string | number;
    limit?: number;
}

const HomeworkSolutionList: React.FC<HomeworkSolutionListProps> = ({
    classId,
    limit,
}) => {
    const listId = useId();
    const { data, isError, error } = useGetClassSolutionsQuery({
        class_id: classId,
    });
    if (!data?.solutions || isError) {
        return (
            <>
                {isError && JSON.stringify(error)}
                {!isError && 'Some error'}
            </>
        );
    }

    const list = data.solutions;
    return (
        <>
            {
                !list.length ? <EmptyItem /> :
                    list.slice(0, limit)
                        .map(({ id, createTime: time, studentID: student_id, hwID: homework_id }) => (
                            <React.Fragment key={`${listId}-${id}`}>
                                <HomeworkSolutionItem
                                    id={id}
                                    homeworkId={homework_id}
                                    studentId={student_id}
                                    passTime={time}
                                />
                            </React.Fragment>
                        ))
            }
        </>
    );
};

export default HomeworkSolutionList;
