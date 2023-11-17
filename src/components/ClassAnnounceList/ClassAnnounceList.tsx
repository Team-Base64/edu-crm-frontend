import { UiComponentProps } from '@ui-kit/interfaces';
import React, { useId } from 'react';
import styles from './ClassAnnounceList.module.scss';
import ClassAnnounceCard from '@components/ClassAnnounceCard/ClassAnnounceCard';
import Container from '@ui-kit/Container/Container';
import { useGetClassAnnouncementsQuery } from '@app/features/announcement/announcementSlice';
import EmptyItem from '@components/EmptyItem/EmptyItem';
import Icon from '@ui-kit/Icon/Icon';
import Spinner from '@ui-kit/Spinner/Spinner';

interface ClassAnnounceListProps extends UiComponentProps {
    classId: string | number;
}

const ClassAnnounceList: React.FC<ClassAnnounceListProps> = ({ classId }) => {
    const listId = useId();
    const { data, isError, isLoading } = useGetClassAnnouncementsQuery({
        class_id: classId,
    });

    if(isLoading){
        return <>
            <EmptyItem text='Загрузка...'><Spinner/></EmptyItem>
        </>
    }

    if(isError || !data?.posts) {
        return <>
            <EmptyItem text='Произошла ошибка'><Icon name='alert'/></EmptyItem>
        </>
    }

    const list = data.posts;
    return (
        <Container
            direction="vertical"
            layout="defaultBase"
        >
            {
                !list.length ? <EmptyItem classes={styles.empty} text='В этом классе пока нет объявлений' /> :
                    list.map(item => (
                        <React.Fragment key={`${listId}-${item.id}`}>
                            <ClassAnnounceCard
                                firstName="George"
                                lastName="Illarionov"
                                avatarSrc=""
                                data={item}
                            />
                        </React.Fragment>
                    ))
            }
        </Container>
    );
};

export default ClassAnnounceList;
