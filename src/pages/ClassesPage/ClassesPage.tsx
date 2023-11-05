import React from 'react';
import { UiComponentProps } from '@ui-kit/interfaces';
import ClassList from '@components/ClassList/ClassList';
import Container from '@ui-kit/Container/Container';
import styles from './ClassesPage.module.scss';
import Text from '@ui-kit/Text/Text';

interface ClassesPageProps extends UiComponentProps {}

const ClassesPage: React.FC<ClassesPageProps> = () => {
    return (
        <>
            <Container
                direction={'vertical'}
                classes={styles.page}
                layout={'defaultBase'}
                gap={'l'}
            >
                <Text
                    type={'h'}
                    size={3}
                    weight={'bold'}
                >
                    Ваши классы:
                </Text>
                <Container
                    direction={'horizontal'}
                    classes={styles.list}
                >
                    <ClassList classes={styles.item} />
                </Container>
            </Container>
        </>
    );
};

export default ClassesPage;
