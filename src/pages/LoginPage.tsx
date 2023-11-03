import React from 'react';
import { useLocation } from 'react-router-dom';

const LoginPage: React.FC = () => {
    const fromLocation = useLocation();
    const fromPath = fromLocation?.state?.from?.pathname;
    return (
        <div>
            <h1>LOGIN PAGE</h1>
            <p>IN PROGESS</p>
            <p>From: {fromPath || 'Откуда-то'}</p>
        </div>
    );
};

export default LoginPage;
