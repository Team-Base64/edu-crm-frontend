import React, { useEffect } from 'react';
import { useLogoutMutation } from '@app/features/teacher/teacherApi.ts';
import Spinner from '@ui-kit/Spinner/Spinner';
import { useNavigate } from 'react-router-dom';
import AppRoutes from '@router/routes.ts';

export const LogoutPage: React.FC = () => {
    const [, { isSuccess, error }] = useLogoutMutation();

    const navigate = useNavigate();

    useEffect(() => {
        if (isSuccess) {
            navigate(`/${AppRoutes.login}`, {});
        } else {
            navigate(-1);
            console.error(error);
        }
    });

    return <Spinner></Spinner>;
};
