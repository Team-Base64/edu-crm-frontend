import ClassAnnounceWidget from '@components/ClassAnnounceWidget/ClassAnnounceWidget';
import ClassHeader from '@components/ClassHeader/ClassHeader';
import ClassMembersWidget from '@components/ClassMembersWidget/ClassMembersWidget';
import ClassHomeworksWidget from '@components/HomeworkWidget/HomeworkWidget';
import HomeworkSolutionWidget from '@components/HomeworkSolutionWidget/HomeworkSolutionWidget';
import Container from '@ui-kit/Container/Container';
import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import styles from './ClassPage.module.scss';
import AppRoutes from '@router/routes';
import ClassSheduleWidget from '@components/ClassSheduleWidget/ClassSheduleWidget';

const useGetClassID = () => {
    const location = useLocation();
    const params = useParams();
    const navigate = useNavigate();

    const id = Number(params.id);

    if (Number.isNaN(id)) {
        navigate(`/${AppRoutes.page404}`, {
            replace: true,
            state: { from: location },
        });
        return -1;
    }

    return id;
};
const ClassPage: React.FC = () => {
    const id = useGetClassID();

    return (
        <Container
            direction="vertical"
            gap="l"
            classes={styles.page}
        >
            <ClassHeader classId={id} />
            <ClassSheduleWidget classID={id} />
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
