import ClassAnnounceWidget from '@components/ClassAnnounceWidget/ClassAnnounceWidget';
import ClassHeader from '@components/ClassHeader/ClassHeader';
import ClassMembersWidget from '@components/ClassMembersWidget/ClassMembersWidget';
import ClassHomeworksWidget from '@components/HomeworkWidget/HomeworkWidget';
import HomeworkSolutionWidget from '@components/HomeworkSolutionWidget/HomeworkSolutionWidget';
import Container from '@ui-kit/Container/Container';
import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import styles from './ClassPage.module.scss';

const ClassPage: React.FC = () => {
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
        <Container
            direction="vertical"
            gap="l"
            classes={styles.page}
        >
            <ClassHeader classId={id} />
            <Container
                direction="horizontal"
                gap="l"
                classes={styles.widgets}
            >
                <ClassMembersWidget
                    classId={id}
                    classes={styles.widget}
                />
                <ClassHomeworksWidget
                    classId={id}
                    classes={styles.widget}
                />
                <HomeworkSolutionWidget
                    classId={id}
                    classes={styles.widget}
                />
            </Container>
            <ClassAnnounceWidget classId={id} />
        </Container>
    );
};

export default ClassPage;
