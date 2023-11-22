import MainLayout from '@components/MainLayout/MainLayout';
// import RequireAuth from '@hoc/RequireAuth';
// import LandingPage from '@pages/LandingPage';
import LoginPage from '@pages/LoginPage/LoginPage';
import NotFoundPage from '@pages/NotFoundPage';
import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import AppRoutes from './routes';
import ClassPage from '@pages/ClassPage/ClassPage';
import { ChatPage } from '@pages/ChatPage/ChatPage.tsx';
import ClassesPage from '@pages/ClassesPage/ClassesPage';
import RequireNotAuth from '@hoc/RequireNotAuth';
import { CalendarPage } from '@pages/CalendarPage/CalendarPage.tsx';
import TaskPage from '@pages/TaskPage/TaskPage';
import HomeworkPage from '@pages/HomeworkPage/HomeworkPage';
import HomeworkSolutionPage from '@pages/HomeworkSolutionPage/HomeworkSolutionPage';

const AppRouter: React.FC = () => {
    return (
        <Routes>
            <Route path={AppRoutes.base}>
                {/* Public */}
                <Route
                    index
                    // element={<LandingPage />}
                    element={
                        <Navigate
                            to={`/${AppRoutes.classes}`}
                            replace
                        />
                    }
                />
                <Route
                    path={AppRoutes.none}
                    element={<NotFoundPage />}
                />
                <Route
                    path={AppRoutes.page404}
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
                    <Route path={AppRoutes.solutions}>
                        <Route
                            index
                            element={<NotFoundPage />}
                        />
                        <Route
                            path={AppRoutes.solution}
                            element={<HomeworkSolutionPage />}
                        />
                    </Route>
                    <Route path={AppRoutes.homeworks}>
                        <Route
                            index
                            element={<NotFoundPage />}
                        />
                        <Route
                            path={AppRoutes.homework}
                            element={<HomeworkPage />}
                        />
                    </Route>
                    <Route
                        path={AppRoutes.messenger}
                        element={<ChatPage />}
                    />
                    <Route
                        path={AppRoutes.tasks}
                        element={<TaskPage />}
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
                    <Route
                        path={AppRoutes.calendar}
                        element={<CalendarPage />}
                    />
                </Route>
                {/*</Route>*/}
                {/*</Route>*/}
            </Route>
            {/*</Route>*/}
        </Routes>
    );
};

export default AppRouter;
