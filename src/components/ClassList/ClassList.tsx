import React, { useId } from 'react';
import { UiComponentProps } from '@ui-kit/interfaces';
import { useGetClassesQuery } from '@app/features/class/classSlice';
import ClassItem from '@components/ClassItem/ClassItem';
import EmptyItem from '@components/EmptyItem/EmptyItem';
import Icon from '@ui-kit/Icon/Icon';
import Spinner from '@ui-kit/Spinner/Spinner';

interface ClassListProps extends UiComponentProps {
    limit?: number;
}

const ClassList: React.FC<ClassListProps> = ({ limit, classes }) => {
    const listId = useId();
    const { data, isError, isLoading } = useGetClassesQuery({});

    if (isLoading) {
        return (
            <>
                <EmptyItem text="Загрузка...">
                    <Spinner />
                </EmptyItem>
            </>
        );
    }

    if (isError || !data?.classes) {
        return (
            <>
                <EmptyItem text="Произошла ошибка">
                    <Icon name="alert" />
                </EmptyItem>
            </>
        );
    }

    const list = data.classes;

    return (
        <>
            {!list.length ? (
                <EmptyItem text="У вас ещё нет классов" />
            ) : (
                list.slice(0, limit).map((data) => (
                    <React.Fragment key={`${listId}-${data.id}`}>
                        <ClassItem
                            classID={data.id}
                            classes={classes}
                        />
                    </React.Fragment>
                ))
            )}
        </>
    );
};

export default ClassList;
