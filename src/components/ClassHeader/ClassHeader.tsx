import Container from '@ui-kit/Container/Container';
import Text from '@ui-kit/Text/Text';
import { UiComponentProps } from '@ui-kit/interfaces';
import React from 'react';
import styles from './ClassHeader.module.scss';
import { useGetClassByIdQuery } from '@app/features/class/classSlice';
import ShowQueryState from '@components/ShowQueryState/ShowQueryState';
import ClassInvite from '@components/ClassInvite/ClassInvite';

interface ClassHeaderProps extends UiComponentProps {
    classId: string | number;
}

const ClassHeader: React.FC<ClassHeaderProps> = ({ classId }) => {
    const { data, isSuccess, ...status } = useGetClassByIdQuery({
        id: classId,
    });

    return (
        <Container
            classes={styles.widget}
            layout="defaultBase"
        >
            <ShowQueryState status={status} />
            {isSuccess && (
                <>
                    <Container
                        direction="vertical"
                        classes={styles.header}
                    >
                        <Text
                            type="h"
                            size={2}
                            classes={styles.title}
                        >
                            {data.class.title}
                        </Text>
                        <Text
                            type="p"
                            size={1}
                            classes={styles.description}
                        >
                            {data.class.description
                                ? data.class.description
                                : 'Без описания'}
                        </Text>
                    </Container>
                    <ClassInvite
                        token={data.class.inviteToken}
                        classTitle={data.class.title}
                        wrap
                        classes={styles.invite}
                    />
                </>
            )}
        </Container>
    );
};

export default ClassHeader;
