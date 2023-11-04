import HomeworkSolutionItem from '@components/HomeworkSolutionItem/HomeworkSolutionItem';
import { UiComponentProps } from '@ui-kit/interfaces';
import { useGetClassSolutionsQuery } from 'app/features/api/class/classSlice';
import React, { useId } from 'react';
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
    const { data, isError, error } = useGetClassSolutionsQuery({ id: classId });
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
            {!list.length && 'EMPTY'}

            {list.length &&
                list
                    .slice(0, limit)
                    .map(({ id, time, student_id, homework_id }) => (
                        <React.Fragment key={`${listId}-${id}`}>
                            <HomeworkSolutionItem
                                id={id}
                                homeworkId={homework_id}
                                studentId={student_id}
                                passTime={time}
                            />
                        </React.Fragment>
                    ))}
        </>
    );
};

export default HomeworkSolutionList;
