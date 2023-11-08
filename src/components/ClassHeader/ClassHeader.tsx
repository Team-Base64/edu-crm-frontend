import Container from '@ui-kit/Container/Container';
import Text from '@ui-kit/Text/Text';
import { UiComponentProps } from '@ui-kit/interfaces';
import React from 'react';

import styles from './ClassHeader.module.scss';
import { useGetClassByIdQuery } from '@app/features/class/classSlice';

interface ClassHeaderProps extends UiComponentProps {
    classId: string | number;
}

const ClassHeader: React.FC<ClassHeaderProps> = ({ classId }) => {
    const { data, isError, error } = useGetClassByIdQuery({ id: classId });

    if (!data?.class || isError) {
        return (
            <>
                {isError && JSON.stringify(error)}
                {!isError && 'Что то не так'}
            </>
        );
    }

    const { title, description } = data.class;

    return (
        <Container
            direction="vertical"
            classes={styles.header}
            layout="defaultBase"
        >
            <Text
                type="h"
                size={2}
                classes={styles.title}
            >
                {title}
            </Text>
            {description && (
                <Text
                    type="p"
                    size={1}
                    classes={styles.description}
                >
                    {description}
                </Text>
            )}
        </Container>
    );
};

export default ClassHeader;
