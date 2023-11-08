import ClassAnnounceWidget from '@components/ClassAnnounceWidget/ClassAnnounceWidget';
import ClassHeader from '@components/ClassHeader/ClassHeader';
import ClassMembersWidget from '@components/ClassMembersWidget/ClassMembersWidget';
import Container from '@ui-kit/Container/Container';
import React from 'react';
import { Navigate, useParams } from 'react-router-dom';

const ClassPage: React.FC = () => {
    const params = useParams();
    const id = Number(params.id);

    if (Number.isNaN(id)) {
        return (
            <Navigate
                to="/page404"
                state={{ from: location }}
            />
        );
    }

    return (
        <Container
            direction="vertical"
            gap="l"
        >
            <ClassHeader classId={id} />
            <ClassMembersWidget classId={id} />
            <ClassAnnounceWidget classId={id} />
        </Container>
    );
};

export default ClassPage;
