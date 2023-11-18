import HomeworkItem from '@components/HomeworkItem/HomeworkItem';
import { UiComponentProps } from '@ui-kit/interfaces';
import React, { useId } from 'react';
import { useGetClassHomeworksQuery } from '@app/features/homework/homeworkSlice';
import EmptyItem from '@components/EmptyItem/EmptyItem';
import Icon from '@ui-kit/Icon/Icon';
import Spinner from '@ui-kit/Spinner/Spinner';
// import styles from './HomeworkList.module.scss';

interface HomeworkListProps extends UiComponentProps {
    classId: string | number;
    limit?: number;
}

const HomeworkList: React.FC<HomeworkListProps> = ({ classId, limit }) => {
    const listId = useId();
    const { data, isError, isLoading } = useGetClassHomeworksQuery({ id: classId });
   
    if(isLoading){
        return <>
            <EmptyItem text='Загрузка...'><Spinner/></EmptyItem>
        </>
    }

    if(isError || !data?.homeworks) {
        return <>
            <EmptyItem text='Произошла ошибка'><Icon name='alert'/></EmptyItem>
        </>
    }

    const list = data.homeworks;

    return (
        <>
            {
                !list.length ? <EmptyItem text='Пока нет дз'/> :
                    list.slice(0, limit)
                        .map(homework => (
                            <React.Fragment key={`${listId}-${homework.id}`}>
                                <HomeworkItem
                                    homework={homework}
                                />
                            </React.Fragment>
                        ))
            }
        </>
    );
};

export default HomeworkList;
