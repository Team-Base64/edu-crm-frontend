import Container from '@ui-kit/Container/Container';
import { UiComponentProps } from '@ui-kit/interfaces';
import React from 'react';
import styles from './EmptyItem.module.scss';
import Text from '@ui-kit/Text/Text';

interface EmptyItemProps extends UiComponentProps {
    text?: string;
}

const EmptyItem: React.FC<EmptyItemProps> = ({
    children,
    text = 'Пусто...',
    classes,
}) => {
    return (
        <Container
            classes={[classes, styles.item].join(' ')}
            layout="defaultBase"
        >
            {children && children}
            <Text
                type="p"
                size={1}
            >
                {text}
            </Text>
        </Container>
    );
};

export default EmptyItem;
