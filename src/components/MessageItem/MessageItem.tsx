import React, { memo } from 'react';
import { UiComponentProps } from '@ui-kit/interfaces';
import Container from '@ui-kit/Container/Container';
import Avatar from '@ui-kit/Avatar/Avatar';
import styles from './MessageItem.module.scss';

interface MessageItemProps extends UiComponentProps {
    id?: number;
    text: string;
    time: string;
    isMine: boolean;
    authorAvatarSrc: string;
    authorId?: number;
}

const MessageItem: React.FC<MessageItemProps> = memo(function MessageItem({
    id,
    text,
    time,
    isMine,
    authorAvatarSrc,
    // authorId,
}) {
    return (
        <Container
            key={id}
            classes={[styles.messageItem, isMine ? styles.mine : ''].join(' ')}
            direction={'horizontal'}
        >
            <Container
                direction={'vertical'}
                classes={styles.messageItemAuthor}
            >
                <Avatar
                    classes={styles.messageItemAuthor__avatar}
                    src={authorAvatarSrc}
                ></Avatar>
            </Container>
            <Container
                classes={[
                    styles.messageItemContent,
                    isMine ? styles.mine : '',
                ].join(' ')}
                direction={'horizontal'}
            >
                <div className={styles.messageItemContent__text}>{text}</div>
                <div className={styles.messageItemContent__time}>{time}</div>
            </Container>
        </Container>
    );
});

export default MessageItem;
