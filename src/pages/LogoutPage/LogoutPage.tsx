import React, { useEffect } from 'react';
import { useLogoutMutation } from '@app/features/teacher/teacherApi.ts';
import { useNavigate } from 'react-router-dom';
import AppRoutes from '@router/routes.ts';
import ShowQueryState from '@components/ShowQueryState/ShowQueryState';

export const LogoutPage: React.FC = () => {
    const [logout, { ...status }] = useLogoutMutation();
    const navigate = useNavigate();

    useEffect(() => {
        console.log('LOGOUT');
        logout(null).then(() => {
            navigate(`/${AppRoutes.login}`);
        });
    }, []);

    return (
        <ShowQueryState
            status={status}
            errorText="Не удалось выйти"
        />
    );
};
