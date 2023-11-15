import ClassMemberItem from '@components/ClassMemberItem/ClassMemberItem';
import { UiComponentProps } from '@ui-kit/interfaces';
import React, { useId } from 'react';
import { useGetClassStudentsQuery } from '@app/features/stundent/stundentSlice';
import EmptyItem from '@components/EmptyItem/EmptyItem';
// import styles from './ClassMemberList.module.scss';

interface ClassMemberListProps extends UiComponentProps {
    classId: string | number;
    limit?: number;
}

const ClassMemberList: React.FC<ClassMemberListProps> = ({
    classId,
    limit,
}) => {
    const listId = useId();
    const { data, isError, error } = useGetClassStudentsQuery({
        class_id: classId,
    });

    if (!data?.students || isError) {
        return (
            <>
                {isError && JSON.stringify(error)}
                {!isError && 'Some error'}
            </>
        );
    }

    const list = data.students;
    return (
        <>
            {!list.length ? (
                <EmptyItem />
            ) : (
                list.slice(0, limit).map(({ id, name, avatarSrc }) => (
                    <React.Fragment key={`${listId}-${id}`}>
                        <ClassMemberItem
                            id={id}
                            name={name}
                            avatarSrc={avatarSrc}
                            role="Ученик"
                        />
                    </React.Fragment>
                ))
            )}
        </>
    );
};

export default ClassMemberList;
