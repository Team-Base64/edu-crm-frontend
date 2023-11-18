import MessageItem from '@components/MessageItem/MessageItem.tsx';
import SendMessageArea from '@components/SendMessageArea/SendMessageArea.tsx';
import React, { useEffect, useRef } from 'react';
import { UiComponentProps } from '@ui-kit/interfaces.ts';
import Container from '@ui-kit/Container/Container.tsx';
import styles from './Messenger.module.scss';
import {
    useGetLiveMessagesQuery,
    useSendMessageMutation,
} from '@app/features/chat/chatSlice.ts';
import { useGetDialogsQuery } from '@app/features/dialog/dialogSlice.ts';
import Text from '@ui-kit/Text/Text.tsx';

interface SendMessageAreaProps extends UiComponentProps {
    chatid: number;
}

const Messenger: React.FC<SendMessageAreaProps> = ({ chatid, classes }) => {
    const { data, isLoading, isSuccess, isError, error } =
        useGetLiveMessagesQuery({
            channel: 'chat',
            chatid,
        });

    const [sendMessage] = useSendMessageMutation();

    const messagesRef = useRef<HTMLDivElement>(null);

    const dialogData = useGetDialogsQuery(null);

    useEffect(() => {
        if (messagesRef.current instanceof HTMLElement) {
            messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
        } else {
            console.error('wrong element type');
        }
    });

    const onMessageSendClick = (text: string) => {
        if (dialogData.data && chatid !== -1) {
            sendMessage({
                message: {
                    chatID: chatid,
                    text: text.trim(),
                    ismine: true,
                    date: new Date().toISOString(),
                    socialType: dialogData.data.dialogs[chatid].socialtype,
                },
            });
        }
    };

    const messageBlock = data?.messages[chatid]?.map((message, index) => {
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
                id={chatid.toString()}
                name={'SendMessageArea'}
                onMessageSend={onMessageSendClick}
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
            {isSuccess && chatid !== -1 ? (
                contentToRender
            ) : (
                <Text
                    type={'h'}
                    size={3}
                    classes={styles.unselectedChatText}
                >
                    Выберете чат, чтобы начать общаться
                </Text>
            )}
            {isError && <span>{error.toString()}</span>}
        </Container>
    );
};

export default Messenger;
