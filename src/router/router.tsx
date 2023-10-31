import MainLayout from '@components/MainLayout/MainLayout';
import RequireAuth from '@hoc/RequireAuth';
import LandingPage from '@pages/Landing.page';
import LoginPage from '@pages/Login.page';
import NotFoundPage from '@pages/NotFound.page';
import TestPage from '@pages/Test.page';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AppRoutes from './routes';

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
                        path={AppRoutes.test}
                        element={<TestPage />}
                    />
                </Route>
            </Route>
        </Routes>
    );
};

export default AppRouter;
