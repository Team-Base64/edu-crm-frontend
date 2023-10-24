import MessageItem from '@components/MessageItem/MessageItem.tsx';
import SendMessageArea from '@components/SendMessageArea/SendMessageArea.tsx';
import React, { useEffect, useRef } from 'react';
import { UiComponentProps } from '@ui-kit/interfaces.ts';
import {
    useGetMessagesQuery,
    useSendMessageMutation,
} from '../../services/api.ts';
import Container from '@ui-kit/Container/Container.tsx';
import styles from './Messenger.module.scss';
interface SendMessageAreaProps extends UiComponentProps {}

export type ChatMessage = {
    isMine: boolean;
    text: string;
    time: string;
    authorAvatarSrc: string;
    id?: number;
};
const Messenger: React.FC<SendMessageAreaProps> = () => {
    const { data, isLoading, isSuccess, isError, error } =
        useGetMessagesQuery('chat');

    // console.log(
    //     data?.messages,
    //     `isLoading: ${isLoading}`,
    //     `isSuccess: ${isSuccess}`,
    //     `isError: ${isError}`,
    //     `error: ${error}`,
    // );

    const [sendMessage] = useSendMessageMutation();

    const messageBlock = data?.messages.map((message) => (
        <MessageItem
            isMine={message.isMine}
            text={message.text}
            time={message.time}
            authorAvatarSrc={message.authorAvatarSrc}
            key={message.time}
        />
    ));

    const messagesRef = useRef<HTMLElement>(null);

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
            classes={styles.chat}
        >
            {/*// to do: make List component*/}
            <Container
                direction={'vertical'}
                classes={styles.messageContainer}
                containerRef={messagesRef}
            >
                {messageBlock}
            </Container>
            <SendMessageArea
                id={'SendMessageArea'}
                name={'SendMessageArea'}
                onMessageSend={(text: string) => {
                    sendMessage({
                        message: {
                            isMine: true,
                            text,
                            time: new Date().toString(),
                            authorAvatarSrc: 'string',
                        },
                    });
                }}
            ></SendMessageArea>
        </Container>
    );
};

export default Messenger;
