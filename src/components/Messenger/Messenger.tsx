import MessageItem from '@components/MessageItem/MessageItem.tsx';
import SendMessageArea from '@components/SendMessageArea/SendMessageArea.tsx';
import React from 'react';
import { UiComponentProps } from '@ui-kit/interfaces.ts';
import {
    useGetMessagesQuery,
    useSendMessageMutation,
} from '../../services/chat.ts';
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

    console.log(
        data?.messages,
        `isLoading: ${isLoading}`,
        `isSuccess: ${isSuccess}`,
        `isError: ${isError}`,
        `error: ${error}`,
    );

    const [sendMessage] = useSendMessageMutation();

    const messageBlock = data?.messages.map((message, key: number) => (
        <MessageItem
            isMine={message.isMine}
            text={message.text}
            time={message.time}
            authorAvatarSrc={message.authorAvatarSrc}
            key={key.toString() + new Date()}
        />
    ));

    return (
        <Container
            direction={'vertical'}
            classes={styles.chat}
        >
            <Container
                direction={'vertical'}
                classes={styles.messageContainer}
            >
                {messageBlock}
            </Container>
            <SendMessageArea
                id={'SendMessageArea'}
                name={'SendMessageArea'}
                onMessageSend={(text: string) => {
                    console.log('send');
                    sendMessage({ message: text });
                }}
            ></SendMessageArea>
        </Container>
    );
};

export default Messenger;
