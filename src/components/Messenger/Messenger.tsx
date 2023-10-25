import MessageItem from '@components/MessageItem/MessageItem.tsx';
import SendMessageArea from '@components/SendMessageArea/SendMessageArea.tsx';
import React, { useEffect, useRef } from 'react';
import { UiComponentProps } from '@ui-kit/interfaces.ts';
import {
    useGetMessagesQuery,
    useSendMessageMutation,
    util,
} from '../../app/services/api.ts';
import Container from '@ui-kit/Container/Container.tsx';
import styles from './Messenger.module.scss';
import { useAppDispatch } from '../../app/hooks.ts';
interface SendMessageAreaProps extends UiComponentProps {
    chatid: number;
}

const man_photo_src = 'https://flirtic.com/media/photos/1/e/7/1e733948480.jpg';

export type ChatMessage = {
    isMine: boolean;
    text: string;
    time: string;
    authorAvatarSrc: string;
    id?: number;
    chatid?: number;
};
const Messenger: React.FC<SendMessageAreaProps> = ({ chatid }) => {
    const dispatch = useAppDispatch();
    const { data, isLoading, isSuccess, isError, error } = useGetMessagesQuery({
        channel: 'chat',
        chatid,
    });

    // if (isSuccess) {
    const dataMessages = data?.messages.filter(
        (message) => message.chatid === chatid,
    );
    // }

    // console.log(
    //     data?.messages,
    //     `isLoading: ${isLoading}`,
    //     `isSuccess: ${isSuccess}`,
    //     `isError: ${isError}`,
    //     `error: ${error}`,
    // );
    const [sendMessage] = useSendMessageMutation();

    const messageBlock = dataMessages?.map((message, index) => (
        <MessageItem
            isMine={message.isMine}
            text={message.text}
            time={message.time}
            authorAvatarSrc={message.authorAvatarSrc}
            key={message.time + index}
            alt={'avatar of' + message.isMine ? 'teacher' : 'student'}
        />
    ));

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
            classes={styles.chat}
        >
            {/* to do: List component*/}
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
                onMessageSend={(text: string) => {
                    const message = {
                        isMine: true,
                        text,
                        time: new Date().toString(),
                        authorAvatarSrc: man_photo_src,
                    };
                    sendMessage({
                        message: {
                            chatid: 1,
                            text: text,
                        },
                    });

                    dispatch(
                        util.updateQueryData(
                            'getMessages',
                            { channel: 'chat', chatid },
                            (draft) => {
                                draft.messages.push(message);
                            },
                        ),
                    );
                }}
            ></SendMessageArea>
        </Container>
    );
};

export default Messenger;
