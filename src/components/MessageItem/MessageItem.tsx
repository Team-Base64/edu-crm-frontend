import React, { memo } from 'react';
import { UiComponentProps } from '@ui-kit/interfaces';
import Container from '@ui-kit/Container/Container';
import styles from './MessageItem.module.scss';
import Text from '@ui-kit/Text/Text.tsx';
import { getUTCTime } from '../../utils/common/dateRepresentation.ts';
import { Attachment } from '@ui-kit/Attachment/Attachment.tsx';
import { noop } from '@app/const/consts.ts';
import { Link } from 'react-router-dom';

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
    const elementsAttaches = attaches?.map((attachment, index) => {
        return (
            <Attachment
                file={attachment}
                key={id + time.toString() + index}
                onRemoveClick={noop}
                isStatic={true}
            ></Attachment>
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
                {attaches.length ? (
                    <Text
                        type={'p'}
                        size={1}
                    >
                        <Link
                            to={attaches[0]}
                            className={styles.linkAttachment}
                        >
                            {attaches[0]}
                        </Link>
                    </Text>
                ) : (
                    ''
                )}
                {elementsAttaches && elementsAttaches}
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
