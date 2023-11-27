import MessageItem from '@components/MessageItem/MessageItem.tsx';
import SendMessageArea from '@components/SendMessageArea/SendMessageArea.tsx';
import React, { useEffect, useRef } from 'react';
import { UiComponentProps } from '@ui-kit/interfaces.ts';
import Container from '@ui-kit/Container/Container.tsx';
import styles from './Messenger.module.scss';

import { useGetLiveMessagesQuery } from '@app/features/chat/chatSlice.ts';
import Text from '@ui-kit/Text/Text.tsx';
import { unselectedId } from '@app/const/consts.ts';

interface SendMessageAreaProps extends UiComponentProps {
    chatID: number;
}

const Messenger: React.FC<SendMessageAreaProps> = ({ chatID, classes }) => {
    const { data, isLoading, isSuccess } = useGetLiveMessagesQuery({
        channel: 'chat',
        chatID,
    });

    const messagesRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (messagesRef.current instanceof HTMLElement) {
            messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
        }
    });

    const messageBlock = data?.messages[chatID]?.map((message, index) => {
        return (
            <MessageItem
                isMine={message.ismine}
                text={message.text}
                time={new Date(message.date)}
                key={message.date + index}
                attaches={message.attaches}
            />
        );
    });

    const contentToRender = (
        <>
            <Container
                direction={'vertical'}
                classes={styles.messengerContainer}
                containerRef={messagesRef}
            >
                {messageBlock}
            </Container>
            <SendMessageArea
                id={chatID}
                name={'SendMessageArea'}
                // onMessageSend={onMessageSendClick}
            ></SendMessageArea>
        </>
    );

    return (
        <Container
            direction={'vertical'}
            classes={[styles.messenger, classes].join(' ')}
            layout={'defaultBase'}
        >
            {isLoading && <span>loading...</span>}
            {isSuccess && chatID !== unselectedId ? (
                contentToRender
            ) : (
                <Text
                    type={'h'}
                    size={3}
                    classes={styles.messengerContainerUnselectedChatText}
                >
                    Выберете чат, чтобы начать общаться
                </Text>
            )}
        </Container>
    );
};

export default Messenger;
