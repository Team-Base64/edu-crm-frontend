import React from 'react';
import styles from './App.module.scss';
import Messenger from '@components/Messenger/Messenger.tsx';

const App: React.FC = () => {
    return (
        <div className={styles.app}>
            <Messenger></Messenger>
        </div>
    );
};

export default App;
