import { AttachmentsList } from '@ui-kit/AttachmentsList/AttachmentsList.tsx';
import Container from '@ui-kit/Container/Container';
import Text from '@ui-kit/Text/Text.tsx';
import { UiComponentProps } from '@ui-kit/interfaces';
import React, { memo } from 'react';
import getTime from 'utils/common/PrettyDate/common/time.ts';
import styles from './MessageItem.module.scss';

interface MessageItemProps extends UiComponentProps {
    id?: number;
    text: string;
    time: Date;
    isMine: boolean;
    attaches?: string[];
}

const MessageItem: React.FC<MessageItemProps> = memo(function MessageItem({
    id,
    text,
    time,
    isMine,
    attaches = [],
}) {
    return (
        <Container
            key={id}
            classes={[styles.messageItem, isMine ? styles.mine : ''].join(' ')}
            direction={'horizontal'}
        >
            <Container
                direction={'grid'}
                classes={[
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
                <AttachmentsList staticAttachments={attaches}></AttachmentsList>
                <Text
                    type={'p'}
                    size={2}
                    classes={styles.messageItemContent__time}
                    color={'light'}
                >
                    {getTime(time)}
                </Text>
            </Container>
            <div className={styles.polygon}></div>
        </Container>
    );
});

export default MessageItem;
