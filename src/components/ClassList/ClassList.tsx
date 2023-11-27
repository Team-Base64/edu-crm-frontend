import React, { useEffect } from 'react';
import { UiComponentProps } from '@ui-kit/interfaces';
import { useGetClassesQuery } from '@app/features/class/classSlice';
import { ClassListItem } from '@components/ClassItem/ClassItem';
import EmptyItem from '@components/EmptyItem/EmptyItem';
import { useListItems } from '@ui-kit/List/hooks';
import { ClassData } from '@app/features/class/classModel';
import { arrayToItem } from '@ui-kit/List/helpers';
import ListFC from '@ui-kit/List/List';
import ShowQueryState from '@components/ShowQueryState/ShowQueryState';

interface ClassListProps extends UiComponentProps {
    limit?: number;
}

const ClassList: React.FC<ClassListProps> = ({ limit, classes }) => {
    const { data, isSuccess, ...status } = useGetClassesQuery(null);
    const [items, setItems] = useListItems([] as ClassData[]);
    useEffect(() => {
        if (!data) return;
        setItems(
            arrayToItem(data.classes)
        )
    }, [setItems, data]);

    return (
        <>
            <ShowQueryState status={status} />
            {isSuccess && (
                <ListFC
                    itemsState={[items.slice(0, limit), setItems]}
                    renderItem={ClassListItem}
                    renderItemProps={{}}
                    classes={classes}
                >
                    <EmptyItem text="У вас ещё нет классов" />
                </ListFC>
            )}
        </>
    );
};

export default ClassList;
