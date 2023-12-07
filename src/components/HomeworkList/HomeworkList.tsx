import HomeworkItem from '@components/HomeworkItem/HomeworkItem';
import { UiComponentProps } from '@ui-kit/interfaces';
import React, { useEffect } from 'react';
import { useGetClassHomeworksQuery } from '@app/features/homework/homeworkSlice';
import EmptyItem from '@components/EmptyItem/EmptyItem';
import { useListItems } from '@ui-kit/List/hooks';
import { Homework } from '@app/features/homework/homeworkModel';
import { arrayToItem } from '@ui-kit/List/helpers';
import ShowQueryState from '@components/ShowQueryState/ShowQueryState';
import ListFC from '@ui-kit/List/List';
// import styles from './HomeworkList.module.scss';

interface HomeworkListProps extends UiComponentProps {
    classId: string | number;
    limit?: number;
}

const HomeworkList: React.FC<HomeworkListProps> = ({
    classId,
    limit,
    classes,
}) => {
    const { data, isSuccess, ...status } = useGetClassHomeworksQuery({
        id: classId,
    });
    const [items, setItems] = useListItems([] as Homework[]);

    useEffect(() => {
        if (!data) return;
        setItems(arrayToItem(data.homeworks));
    }, [setItems, data]);

    return (
        <>
            <ShowQueryState status={status} />
            {isSuccess && (
                <ListFC
                    itemsState={[items.slice(0, limit), setItems]}
                    renderItem={HomeworkItem}
                    renderItemProps={{}}
                    classes={classes}
                >
                    <EmptyItem text="Пока нет дз" />
                </ListFC>
            )}
        </>
    );
};

export default HomeworkList;
