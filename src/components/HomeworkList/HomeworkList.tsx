import HomeworkItem from '@components/HomeworkItem/HomeworkItem';
import { UiComponentProps } from '@ui-kit/interfaces';
import React, { useId } from 'react';
import { useGetClassHomeworksQuery } from '@app/features/homework/homeworkSlice';
import EmptyItem from '@components/EmptyItem/EmptyItem';
// import styles from './HomeworkList.module.scss';

interface HomeworkListProps extends UiComponentProps {
    classId: string | number;
    limit?: number;
}

const HomeworkList: React.FC<HomeworkListProps> = ({ classId, limit }) => {
    const listId = useId();
    const { data, isError, error } = useGetClassHomeworksQuery({ id: classId });
    if (!data?.homeworks || isError) {
        return (
            <>
                {isError && JSON.stringify(error)}
                {!isError && 'Some error'}
            </>
        );
    }

    const list = data.homeworks;
    return (
        <>
            {!list.length ? (
                <EmptyItem />
            ) : (
                list
                    .slice(0, limit)
                    .map(
                        ({
                            id,
                            title,
                            description,
                            deadlineTime: deadline_time,
                        }) => (
                            <React.Fragment key={`${listId}-${id}`}>
                                <HomeworkItem
                                    id={id}
                                    title={title}
                                    description={description}
                                    deadlineTime={deadline_time}
                                />
                            </React.Fragment>
                        ),
                    )
            )}
        </>
    );
};

export default HomeworkList;
