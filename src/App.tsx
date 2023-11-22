import AppRouter from '@router/router';
import React from 'react';
import styles from './App.module.scss';

const App: React.FC = () => {
    // document.addEventListener('DOMContentLoaded', userActions.fetchUser, {
    //     once: true,
    // });
    return (
        <div className={styles.app}>
            <AppRouter />
        </div>
    );
};

export default App;
