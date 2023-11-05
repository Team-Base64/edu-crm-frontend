import React, { useId } from 'react';
import { UiComponentProps } from '@ui-kit/interfaces';
import { useGetClassesQuery } from '@app/features/class/classSlice';
import ClassItem from '@components/ClassItem/ClassItem';

interface ClassListProps extends UiComponentProps {
    limit?: number;
}

const ClassList: React.FC<ClassListProps> = ({ limit, classes }) => {
    const listId = useId();
    const { data, isError, error } = useGetClassesQuery({});

    if (!data?.classes || isError) {
        return (
            <>
                {isError && JSON.stringify(error)}
                {!isError && 'Some error'}
            </>
        );
    }

    const list = data.classes;
    return (
        <>
            {!list.length && 'EMPTY'}

            {list.length &&
                list.slice(0, limit).map((data) => (
                    <React.Fragment key={`${listId}-${data.id}`}>
                        <ClassItem
                            data={data}
                            classes={classes}
                        />
                    </React.Fragment>
                ))}
        </>
    );
};

export default ClassList;
