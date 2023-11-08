import MainLayout from '@components/MainLayout/MainLayout';
import RequireAuth from '@hoc/RequireAuth';
import LandingPage from '@pages/LandingPage';
import LoginPage from '@pages/LoginPage';
import NotFoundPage from '@pages/NotFoundPage';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AppRoutes from './routes';
import ClassesPage from '@pages/ClassesPage';
import ClassPage from '@pages/ClassPage/ClassPage';
import { Chat } from '@pages/MessengerPage/Chat';

const AppRouter: React.FC = () => {
    return (
        <Routes>
            <Route path={AppRoutes.base}>
                {/* Public */}
                <Route
                    index
                    element={<LandingPage />}
                />
                <Route
                    path={AppRoutes.login}
                    element={<LoginPage />}
                />
                <Route
                    path={AppRoutes.none}
                    element={<NotFoundPage />}
                />

                {/* Private */}
                <Route
                    element={
                        <RequireAuth>
                            <MainLayout />
                        </RequireAuth>
                    }
                >
                    <Route
                        path={AppRoutes.messenger}
                        element={<Chat />}
                    />
                    <Route path={AppRoutes.classes}>
                        <Route
                            index
                            element={<ClassesPage />}
                        />
                        <Route
                            path={AppRoutes.class}
                            element={<ClassPage />}
                        />
                    </Route>
                </Route>
            </Route>
        </Routes>
    );
};

export default AppRouter;
