import MainLayout from '@components/MainLayout/MainLayout';
import RequireAuth from '@hoc/RequireAuth';
import LandingPage from '@pages/Landing.page';
import LoginPage from '@pages/Login.page';
import NotFoundPage from '@pages/NotFound.page';
import TestPage from '@pages/Test.page';
import React from 'react';
import { Route, Routes } from 'react-router-dom';

const App: React.FC = () => {
    return (
        <Routes>
            <Route path="/">
                {/* Public */}
                <Route
                    index
                    element={<LandingPage />}
                />
                <Route
                    path="login"
                    element={<LoginPage />}
                />
                <Route
                    path="*"
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
                        path="test"
                        element={<TestPage />}
                    />
                    <Route
                        path="test2"
                        element={<TestPage />}
                    />
                </Route>
            </Route>
        </Routes>
    );
};

export default App;
