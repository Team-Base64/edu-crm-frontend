import AppRouter from '@router/router';
import React from 'react';
import styles from './App.module.scss';

const App: React.FC = () => {
    return (
        <div className={styles.app}>
            <AppRouter />
        </div>
    );
};

export default App;
