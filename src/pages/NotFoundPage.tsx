import React from 'react';
import { useLocation } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
    const fromLocation = useLocation();
    const fromPath = fromLocation?.state?.from.pathname || 'NW';
    return (
        <div>
            <h1>404 PAGE</h1>
            <p>IN PROGESS</p>
            <p>From : {fromPath}</p>
        </div>
    );
};

export default NotFoundPage;
