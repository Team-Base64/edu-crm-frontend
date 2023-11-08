import MainLayout from '@components/MainLayout/MainLayout';
import RequireAuth from '@hoc/RequireAuth';
import LandingPage from '@pages/LandingPage';
import LoginPage from '@pages/LoginPage/LoginPage';
import NotFoundPage from '@pages/NotFoundPage';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AppRoutes from './routes';
import ClassPage from '@pages/ClassPage/ClassPage';
import { Chat } from '@pages/MessengerPage/Chat';
import ClassesPage from '@pages/ClassesPage/ClassesPage';
import RequireNotAuth from '@hoc/RequireNotAuth';

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
                    path={AppRoutes.none}
                    element={<NotFoundPage />}
                />
                {/* only for unauthorized */}
                <Route element={<RequireNotAuth />}>
                    <Route
                        path={AppRoutes.login}
                        element={<LoginPage />}
                    />
                </Route>

                {/* Private */}
                {/*<Route element={<RequireAuth />}>*/}
                <Route element={<MainLayout />}>
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
                {/*</Route>*/}
            </Route>
        </Routes>
    );
};

export default AppRouter;
