import React from 'react';
import { Navigate, useLocation, useParams } from 'react-router-dom';

const ClassPage: React.FC = () => {
    const location = useLocation();
    const params = useParams();

    const id = Number(params.id);

    if (isNaN(id)) {
        return (
            <Navigate
                to="/page404"
                state={{ from: location }}
            />
        );
    }

    return (
        <div>
            <h1>Class {id} PAGE</h1>
            <p>IN PROGESS</p>
        </div>
    );
};

export default ClassPage;
