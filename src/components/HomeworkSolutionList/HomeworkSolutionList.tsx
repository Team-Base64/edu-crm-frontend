import HomeworkSolutionItem from '@components/HomeworkSolutionItem/HomeworkSolutionItem';
import { UiComponentProps } from '@ui-kit/interfaces';
import React, { useId } from 'react';
import { useGetClassSolutionsQuery } from '@app/features/homeworkSolution/homeworkSolutionSlice';
import EmptyItem from '@components/EmptyItem/EmptyItem';
import Spinner from '@ui-kit/Spinner/Spinner';
import Icon from '@ui-kit/Icon/Icon';
import { groupByValuesReturnMap } from '@helpers/group';
import { getDelta } from 'utils/common/PrettyDate/common/delta';
import { HomeworkSolution } from '@app/features/homeworkSolution/homeworkSolutionModel';
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
    const { data, isLoading, isError } = useGetClassSolutionsQuery({
        class_id: classId,
    });

    if (isLoading) {
        return <>
            <EmptyItem text='Загрузка...'><Spinner /></EmptyItem>
        </>
    }

    if (isError || !data?.solutions) {
        return <>
            <EmptyItem text='Произошла ошибка'><Icon name='alert' /></EmptyItem>
        </>
    }


    const list: HomeworkSolution[] = [];
    const groups = groupByValuesReturnMap(data.solutions, ['studentID', 'hwID']);

    groups.forEach(group => {
        if (!group.length) return;
        group.sort((a, b) => {
            return getDelta(b.createTime, a.createTime);
        });
        list.push(group[0]);
    });

    return (
        <>
            {
                !list.length ? <EmptyItem text='Пока нет решений' /> :
                    list.slice(0, limit)
                        .map(item => (
                            <React.Fragment key={`${listId}-${item.id}`}>
                                <HomeworkSolutionItem
                                    data={item}
                                />
                            </React.Fragment>
                        ))
            }
        </>
    );
};

export default HomeworkSolutionList;
