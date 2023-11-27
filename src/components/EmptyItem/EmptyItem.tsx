import Container from '@ui-kit/Container/Container';
import { UiComponentProps } from '@ui-kit/interfaces';
import React from 'react';
import styles from './EmptyItem.module.scss';
import Text from '@ui-kit/Text/Text';
import Spinner from '@ui-kit/Spinner/Spinner';
import Icon from '@ui-kit/Icon/Icon';

const emptyItemTypes = {
    loading: 'Загрузка...',
    error: 'Произошла ошибка',
    default: 'Здесь пока пусто',
}
type EmptyItemType = keyof typeof emptyItemTypes;

const emptyItemAlign = {
    start: styles.start,
    end:styles.end,
    center: styles.center,
}
type EmptyItemAlign = keyof typeof emptyItemAlign;

interface EmptyItemProps extends UiComponentProps {
    text?: string;
    type?: EmptyItemType;
    align ?: EmptyItemAlign;
}

const EmptyItem: React.FC<EmptyItemProps> = ({
    children,
    classes,
    type = 'default',
    text = emptyItemTypes[type],
    align = 'center',
}) => {
    return (
        <Container
            classes={[classes, styles.item, emptyItemAlign[align]].join(' ')}
            layout="defaultBase"
        >
            {type === 'loading' && <Spinner classes={styles.spinner} />}
            {type === 'error' && <Icon name='alert' classes={styles.icon} />}
            <Text
                type="p"
                size={1}
            >
                {text}
            </Text>
            {children && children}
        </Container>
    );
};

export default EmptyItem;
