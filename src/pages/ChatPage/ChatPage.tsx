import Container from '@ui-kit/Container/Container.tsx';
import MessageSelector from '@components/MessageSelector/MessageSelector.tsx';
import Messenger from '@components/Messenger/Messenger.tsx';
import React, { useState } from 'react';
import styles from './ChatPage.module.scss';
import { MessengerHeader } from '@components/MessangerHeader/MessengerHeader.tsx';
export const ChatPage: React.FC = () => {
    const [chatID, setChatID] = useState<number>(-1);

    return (
        <Container
            direction={'grid'}
            classes={styles.chat}
        >
            <MessageSelector
                useSetChatId={[chatID, setChatID]}
                classes={styles.dialogList}
            ></MessageSelector>
            <MessengerHeader
                chatid={chatID}
                classes={styles.messengerHeader}
            ></MessengerHeader>
            <Messenger
                chatid={chatID}
                classes={styles.messenger}
            ></Messenger>
        </Container>
    );
};
