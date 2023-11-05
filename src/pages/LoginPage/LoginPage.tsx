import React from 'react';
import { useLocation } from 'react-router-dom';
import LoginForm from "@components/LoginForm/LoginForm";

const LoginPage: React.FC = () => {
    // console.log('login page');

    return (
        <>
            <LoginForm />
        </>
    );
};

export default LoginPage;
