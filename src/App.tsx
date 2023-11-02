import React from 'react';
import styles from './App.module.scss';
import { Chat } from './views/Chat/Chat.tsx';

const App: React.FC = () => {
    return (
        <div className={styles.app}>
            <Chat></Chat>
        </div>
    );
};

export default App;
