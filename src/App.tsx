import AppRouter from '@router/router';
import React from 'react';
import styles from './App.module.scss';
import { usePrefetchImmediately } from '@app/hooks/preFetch.ts';
import { getSocket } from '@app/websocket.ts';

const App: React.FC = () => {
    usePrefetchImmediately('checkAuth', null);
    getSocket();
    return (
        <div className={styles.app}>
            <AppRouter />
        </div>
    );
};

export default App;
