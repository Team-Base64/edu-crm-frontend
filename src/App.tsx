import AppRouter from '@router/router';
import React from 'react';
import styles from './App.module.scss';
import { useCheckAuthQuery } from '@app/features/teacher/teacherApi.ts';
// import { useNavigate } from 'react-router-dom';
// import AppRoutes from '@router/routes.ts';

const App: React.FC = () => {
    // document.addEventListener('DOMContentLoaded', userActions.fetchUser, {
    //     once: true,
    // });

    // const navigate = useNavigate();
    useCheckAuthQuery(null);
    // if (isError) {
    //     navigate(AppRoutes.base + AppRoutes.login);
    // }

    return (
        <div className={styles.app}>
            <AppRouter />
        </div>
    );
};

export default App;
