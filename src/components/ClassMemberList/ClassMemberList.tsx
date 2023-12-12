import { UiComponentProps } from '@ui-kit/interfaces';
import React, { useEffect } from 'react';
import { useGetClassStudentsQuery } from '@app/features/stundent/stundentSlice';
import EmptyItem from '@components/EmptyItem/EmptyItem';
import ShowQueryState from '@components/ShowQueryState/ShowQueryState';
import ListFC from '@ui-kit/List/List';
import { useListItems } from '@ui-kit/List/hooks';
import { Student } from '@app/features/stundent/stundentModel';
import { arrayToItem } from '@ui-kit/List/helpers';
import { ClassMemberListItem } from '@components/ClassMemberItem/ClassMemberItem';
// import styles from './ClassMemberList.module.scss';

interface ClassMemberListProps extends UiComponentProps {
    classId: string | number;
    limit?: number;
}

const ClassMemberList: React.FC<ClassMemberListProps> = ({
    classId,
    limit,
    classes,
}) => {
    const { data, isSuccess, ...status } = useGetClassStudentsQuery({
        class_id: classId,
    });
    const [items, setItems] = useListItems([] as Student[]);

    useEffect(() => {
        if (!data) return;
        setItems(arrayToItem(data.students));
    }, [setItems, data]);

    return (
        <>
            <ShowQueryState status={status} />
            {isSuccess && (
                <ListFC
                    itemsState={[items.slice(0, limit), setItems]}
                    renderItem={ClassMemberListItem}
                    renderItemProps={{
                        role: 'Ученик',
                        classes: classes,
                        students: data.students,
                    }}
                    classes={classes}
                >
                    <EmptyItem text="Пока нет участников" />
                </ListFC>
            )}
        </>
    );
};

export default ClassMemberList;
