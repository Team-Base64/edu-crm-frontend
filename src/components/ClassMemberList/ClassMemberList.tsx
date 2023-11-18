import ClassMemberItem from '@components/ClassMemberItem/ClassMemberItem';
import { UiComponentProps } from '@ui-kit/interfaces';
import React, { useId } from 'react';
import { useGetClassStudentsQuery } from '@app/features/stundent/stundentSlice';
import EmptyItem from '@components/EmptyItem/EmptyItem';
import Icon from '@ui-kit/Icon/Icon';
import Spinner from '@ui-kit/Spinner/Spinner';
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
    const { data, isError, isLoading } = useGetClassStudentsQuery({
        class_id: classId,
    });

    if(isLoading){
        return <>
            <EmptyItem text='Загрузка...'><Spinner/></EmptyItem>
        </>
    }

    if(isError || !data?.students) {
        return <>
            <EmptyItem text='Произошла ошибка'><Icon name='alert'/></EmptyItem>
        </>
    }

    const list = data.students;

    return (
        <>
            {
                !list.length ? <EmptyItem text='Пока нет участников' /> :
                    list.slice(0, limit).map(stundet => (
                        <React.Fragment key={`${listId}-${stundet.id}`}>
                            <ClassMemberItem
                                student={stundet}
                                role="Ученик"
                            />
                        </React.Fragment>
                    ))
            }
        </>
    );
};

export default ClassMemberList;
