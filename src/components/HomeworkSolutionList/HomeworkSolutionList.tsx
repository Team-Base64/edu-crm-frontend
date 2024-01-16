import HomeworkSolutionItem from '@components/HomeworkSolutionItem/HomeworkSolutionItem';
import { UiComponentProps } from '@ui-kit/interfaces';
import React, { useEffect, useId, useState } from 'react';
import { useGetClassSolutionsQuery } from '@app/features/homeworkSolution/homeworkSolutionSlice';
import EmptyItem from '@components/EmptyItem/EmptyItem';
import Spinner from '@ui-kit/Spinner/Spinner';
import { HomeworkSolution } from '@app/features/homeworkSolution/homeworkSolutionModel.ts';
import { groupByValues } from '@ui-kit/_utils/group.ts';
import { getDelta } from '../../utils/common/PrettyDate/common/delta.ts';
import Icon from '@ui-kit/Icon/Icon';

// import styles from './HomeworkList.module.scss';

interface HomeworkSolutionListProps extends UiComponentProps {
    classId: string | number;
    limit?: number;
    emptyTitle: string;
    showStatus: 'all' | 'approved' | 'rejected';
}

const HomeworkSolutionList: React.FC<HomeworkSolutionListProps> = ({
    classId,
    limit,
    emptyTitle,
    showStatus,
}) => {
    const listId = useId();
    const { data, isLoading, isError, isSuccess } = useGetClassSolutionsQuery({
        class_id: classId,
    });
    const [list, setList] = useState<HomeworkSolution[]>([]);

    useEffect(() => {
        if (!isSuccess) return;

        try {
            const filtered = data.solutions.filter((s) => {
                if (
                    showStatus === 'all' ||
                    (showStatus === 'approved' && s.status === 'approve') ||
                    (showStatus === 'rejected' && s.status === 'reject')
                ) {
                    return s;
                }
                // fix
                return {};
            });

            const groups = groupByValues(filtered, ['studentID', 'hwID']);

            const newList: HomeworkSolution[] = [];

            groups.forEach((group) => {
                if (!group.length) return;
                group.sort((a, b) => {
                    return getDelta(b.createTime, a.createTime);
                });
                newList.push(group[0]);
            });
            setList(newList);
        } catch (e) {
            console.log(e);
        }
    }, [data?.solutions, isSuccess, showStatus]);

    if (isLoading) {
        return (
            <>
                <EmptyItem text="Загрузка...">
                    <Spinner />
                </EmptyItem>
            </>
        );
    }

    if (isError) {
        return (
            <>
                <EmptyItem text="Произошла ошибка">
                    <Icon name="alert" />
                </EmptyItem>
            </>
        );
    }

    return (
        <>
            {!list.length ? (
                <EmptyItem text={emptyTitle} />
            ) : (
                list.slice(0, limit).map((item) => (
                    <React.Fragment key={`${listId}-${item.id}`}>
                        <HomeworkSolutionItem data={item} />
                    </React.Fragment>
                ))
            )}
        </>
    );
};

export default HomeworkSolutionList;
