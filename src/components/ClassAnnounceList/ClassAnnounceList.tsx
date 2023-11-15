import { UiComponentProps } from '@ui-kit/interfaces';
import React, { useId } from 'react';
import styles from './ClassAnnounceList.module.scss';
import ClassAnnounceCard from '@components/ClassAnnounceCard/ClassAnnounceCard';
import Container from '@ui-kit/Container/Container';
import { useGetClassAnnouncementsQuery } from '@app/features/announcement/announcementSlice';
import EmptyItem from '@components/EmptyItem/EmptyItem';

interface ClassAnnounceListProps extends UiComponentProps {
    classId: string | number;
}

const ClassAnnounceList: React.FC<ClassAnnounceListProps> = ({ classId }) => {
    const listId = useId();
    const { data, isError, error } = useGetClassAnnouncementsQuery({
        class_id: classId,
    });

    if (!data?.posts || isError) {
        return (
            <>
                {isError && JSON.stringify(error)}
                {!isError && 'Some error'}
            </>
        );
    }

    const list = data.posts;
    return (
        <Container
            direction="vertical"
            layout="defaultBase"
        >
            {!list.length ? (
                <EmptyItem
                    classes={styles.empty}
                    text="В этом классе пока нет объявлений"
                />
            ) : (
                list.map(({ id, text, createTime: time }) => (
                    <React.Fragment key={`${listId}-${id}`}>
                        <ClassAnnounceCard
                            firstName="George"
                            lastName="Illarionov"
                            avatarSrc=""
                            text={text}
                            time={Number(time)}
                        />
                    </React.Fragment>
                ))
            )}
        </Container>
    );
};

export default ClassAnnounceList;
