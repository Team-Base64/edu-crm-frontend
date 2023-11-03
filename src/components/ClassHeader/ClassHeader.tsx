import Container from '@ui-kit/Container/Container';
import Text from '@ui-kit/Text/Text';
import { UiComponentProps } from '@ui-kit/interfaces';
import { useGetClassByIdQuery } from 'app/features/api/class/classSlice';
import React from 'react';

import styles from './ClassHeader.module.scss';

interface ClassHeaderProps extends UiComponentProps {
    classId: string | number;
}

const ClassHeader: React.FC<ClassHeaderProps> = ({ classId }) => {
    const { data, isSuccess } = useGetClassByIdQuery({ id: classId });

    if (!data?.class) {
        return <>Error</>;
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
