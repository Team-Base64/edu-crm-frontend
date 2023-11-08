import MessageItem from '@components/MessageItem/MessageItem.tsx';
import SendMessageArea from '@components/SendMessageArea/SendMessageArea.tsx';
import React, { useEffect, useRef } from 'react';
import { UiComponentProps } from '@ui-kit/interfaces.ts';
import Container from '@ui-kit/Container/Container.tsx';
import styles from './Messenger.module.scss';
import {
    useGetLiveMessagesQuery,
    useSendMessageMutation,
} from '../../app/features/api/chat/messageSlice.ts';

interface SendMessageAreaProps extends UiComponentProps {
    chatid: number;
}

export type ChatMessageType = {
    ismine: boolean;
    text: string;
    date: string;
    chatid: number;
    id?: number;
    attaches?: string[];
};
const Messenger: React.FC<SendMessageAreaProps> = ({ chatid, classes }) => {
    const { data, isLoading, isSuccess, isError, error } =
        useGetLiveMessagesQuery({
            channel: 'chat',
            chatid,
        });

    const [sendMessage] = useSendMessageMutation();

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

    const messagesRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (messagesRef.current instanceof HTMLElement) {
            messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
        } else {
            console.error('wrong element type');
        }
    });

    return (
        <Container
            direction={'vertical'}
            classes={[styles.messenger, classes].join(' ')}
            layout={'defaultBase'}
        >
            <Container
                direction={'vertical'}
                classes={styles.messageContainer}
                containerRef={messagesRef}
            >
                {isLoading && <span>loading...</span>}
                {isSuccess && messageBlock}
                {isError && <span>{error.toString()}</span>}
            </Container>
            <SendMessageArea
                id={chatid.toString()}
                name={'SendMessageArea'}
                onMessageSend={(text: string) =>
                    sendMessage({
                        message: {
                            chatid,
                            text: text.trim(),
                            ismine: true,
                            date: new Date().toISOString(),
                        },
                    })
                }
            ></SendMessageArea>
        </Container>
    );
};

export default Messenger;
