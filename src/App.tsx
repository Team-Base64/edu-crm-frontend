import React, { useState } from 'react';
import styles from './App.module.scss';
import Messenger from '@components/Messenger/Messenger.tsx';
import MessageSelector from '@components/MessageSelector/MessageSelector.tsx';
import Container from '@ui-kit/Container/Container.tsx';

const App: React.FC = () => {
    const [chatID, setChatID] = useState(1);
    return (
        <div className={styles.app}>
            <Container direction={'horizontal'}>
                <MessageSelector setChatID={setChatID}></MessageSelector>
                <Messenger chatid={chatID}></Messenger>
            </Container>
        </div>
    );
};

export default App;
