import React, { memo } from 'react';
import { UiComponentProps } from '@ui-kit/interfaces';
import Container from '@ui-kit/Container/Container';
import styles from './MessageItem.module.scss';
import Text from '@ui-kit/Text/Text.tsx';

interface MessageItemProps extends UiComponentProps {
    id?: number;
    text: string;
    time: string;
    isMine: boolean;
}

const MessageItem: React.FC<MessageItemProps> = memo(function MessageItem({
    id,
    text,
    time,
    isMine,
}) {
    return (
        <Container
            key={id}
            classes={[styles.messageItem, isMine ? styles.mine : ''].join(' ')}
            direction={'horizontal'}
        >
            <div
                className={[
                    styles.messageItemContent,
                    isMine ? styles.mine : '',
                ].join(' ')}
            >
                <Text
                    type={'p'}
                    size={1}
                    classes={styles.messageItemContent__text}
                >
                    {text}
                </Text>
                <Text
                    type={'p'}
                    size={2}
                    classes={styles.messageItemContent__time}
                    color={'light'}
                >
                    {time}
                </Text>
            </div>
            <div className={styles.polygon}></div>
        </Container>
    );
});

export default MessageItem;
