import { UiComponentProps } from '@ui-kit/interfaces';
import React, { useId } from 'react';
// import styles from './ClassAnnounceList.module.scss';
import { useGetClassAnnouncementsByIdQuery } from 'app/features/api/class/classSlice';
import ClassAnnounceCard from '@components/ClassAnnounceCard/ClassAnnounceCard';
import Container from '@ui-kit/Container/Container';

interface ClassAnnounceListProps extends UiComponentProps {
    classId: string | number;
}

const ClassAnnounceList: React.FC<ClassAnnounceListProps> = ({ classId }) => {
    const listId = useId();
    const { data, isError, error } = useGetClassAnnouncementsByIdQuery({
        id: classId,
    });

    if (!data?.announcements || isError) {
        return (
            <>
                {isError && JSON.stringify(error)}
                {!isError && 'Some error'}
            </>
        );
    }

    const list = data.announcements;
    return (
        <Container
            direction="vertical"
            layout="defaultBase"
        >
            {!list.length && 'EMPTY'}

            {list.length &&
                list.map(({ id, text, time }) => (
                    <React.Fragment key={`${listId}-${id}`}>
                        <ClassAnnounceCard
                            firstName="George"
                            lastName="Illarionov"
                            avatarSrc=""
                            text={text}
                            time={Number(time)}
                        />
                    </React.Fragment>
                ))}
        </Container>
    );
};

export default ClassAnnounceList;
