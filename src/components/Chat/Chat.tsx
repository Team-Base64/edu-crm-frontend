import React, { useEffect, useState } from 'react';
import { UiComponentProps } from '@ui-kit/interfaces';
import Container from '@ui-kit/Container/Container';
import axios from 'axios';
import { Message } from '@types/Message';
import MessageItem from '@components/MessageItem/MessageItem';
import styles from './Chat.module.scss';
interface ChatProps extends UiComponentProps {
    id: number;
}

const Chat: React.FC<ChatProps> = () => {
    const [msgList, setMsgList] = useState<Message[]>([]);

    useEffect(() => {
        axios
            .get('https://jsonplaceholder.typicode.com/comments?_limit=10', {})
            .then((resp) => {
                const msgs: Message[] = [];

                resp.data.forEach((raw_msg: any, index) => {
                    msgs.push({
                        id: raw_msg.id,
                        chatId: raw_msg.postId,
                        text: raw_msg.body,
                    });
                });
                setMsgList(msgs);
            })
            .catch((e) => {
                console.log(e);
            });
    }, []);

    return (
        <Container
            direction={'vertical'}
            gap={'l'}
            classes={[styles.chat].join(' ')}
        >
            {msgList.map(({ id, chatId, text }) => (
                <MessageItem
                    text={String(id) + '   ' + text}
                    id={id}
                    time={Date.now().toString()}
                    isMine={Math.random() > 0.5 ? true : false}
                    authorAvatarSrc={'/'}
                />
            ))}
        </Container>
    );
};

export default Chat;
