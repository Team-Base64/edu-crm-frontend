import MessageItem from '@components/MessageItem/MessageItem.tsx';
import SendMessageArea from '@components/SendMessageArea/SendMessageArea.tsx';
import React, { useEffect, useRef, useState } from 'react';
import { UiComponentProps } from '@ui-kit/interfaces.ts';

const short_msg = 'Hello world!';
const long_msg =
    'Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века. Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века.';
const man_photo_src = 'https://flirtic.com/media/photos/1/e/7/1e733948480.jpg';

interface SendMessageAreaProps extends UiComponentProps {}
const Messenger: React.FC<SendMessageAreaProps> = () => {
    const webSocket = useRef<WebSocket>(null);

    const [messages, setMessanges] = useState([
        {
            isMine: false,
            text: short_msg,
            time: '18:09',
            authorAvatarSrc: man_photo_src,
        },
        {
            isMine: true,
            text: long_msg,
            time: '18:09',
            authorAvatarSrc: man_photo_src,
        },
    ]);

    const messageBlock = messages.map((message, key: number) => (
        <MessageItem
            isMine={message.isMine}
            text={message.text}
            time={message.time}
            authorAvatarSrc={message.authorAvatarSrc}
            key={key.toString() + new Date()}
        />
    ));

    useEffect(() => {
        const conn = new WebSocket('ws://' + '127.0.0.1:8081' + '/ws');

        conn.onmessage = function (evt) {
            const socketMessages = evt.data.split('\n');
            console.log(socketMessages);
            setMessanges([
                ...messages,
                {
                    isMine: false,
                    text: socketMessages[0],
                    time: '18:10',
                    authorAvatarSrc: man_photo_src,
                },
            ]);
        };

        // @ts-ignore
        webSocket.current = conn;

        return () => {
            conn.close();
        };
    }, []);
    return (
        <>
            {messageBlock}
            <SendMessageArea
                id={'SendMessageArea'}
                name={'SendMessageArea'}
                onMessageSend={() => {
                    console.log('send');
                }}
            ></SendMessageArea>
        </>
    );
};

export default Messenger;
