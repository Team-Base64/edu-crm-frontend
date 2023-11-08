import React, { memo } from 'react';
import { UiComponentProps } from '@ui-kit/interfaces';
import Container from '@ui-kit/Container/Container';
import styles from './MessageItem.module.scss';
import Text from '@ui-kit/Text/Text.tsx';
import { getUTCTime } from '../../utils/common/dateRepresentation.ts';
import { ChatAttachment } from '@components/ChatAttachment/ChatAttachment.tsx';
import { noop } from '@app/const/consts.ts';

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
    attaches,
}) {
    const elementsAttaches = attaches?.map((attachment, index) => {
        return (
            <ChatAttachment
                file={attachment}
                key={id + time.toString() + index}
                onRemoveClick={noop}
                isStatic={true}
            ></ChatAttachment>
        );
    });

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
                {elementsAttaches}
                <Text
                    type={'p'}
                    size={2}
                    classes={styles.messageItemContent__time}
                    color={'light'}
                >
                    {getUTCTime(time)}
                </Text>
            </Container>
            <div className={styles.polygon}></div>
        </Container>
    );
});

export default MessageItem;
