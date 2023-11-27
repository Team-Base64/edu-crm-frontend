import React, { useEffect } from 'react';
import { useLogoutMutation } from '@app/features/teacher/teacherApi.ts';
import Spinner from '@ui-kit/Spinner/Spinner';
import { useNavigate } from 'react-router-dom';
import AppRoutes from '@router/routes.ts';

export const LogoutPage: React.FC = () => {
    const [, { isError, error, isSuccess, isLoading, status }] =
        useLogoutMutation();

    const navigate = useNavigate();

    console.log(isSuccess, isLoading, status);

    useEffect(() => {
        if (isError) {
            navigate(-1);
            console.error(error);
        } else {
            navigate(`/${AppRoutes.login}`, {});
        }
    });

    return <Spinner></Spinner>;
};
