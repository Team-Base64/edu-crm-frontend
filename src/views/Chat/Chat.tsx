import Container from '@ui-kit/Container/Container.tsx';
import MessageSelector from '@components/MessageSelector/MessageSelector.tsx';
import Messenger from '@components/Messenger/Messenger.tsx';
import React, { useState } from 'react';
import styles from './Chat.module.scss';
export const Chat: React.FC = () => {
    const [chatID, setChatID] = useState<number>(1);

    return (
        <Container
            direction={'horizontal'}
            classes={styles.chat}
        >
            <MessageSelector setChatID={setChatID}></MessageSelector>
            <Messenger chatid={chatID}></Messenger>
        </Container>
    );
};
