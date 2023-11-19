import React, { useState } from 'react';
import { UiComponentProps } from '@ui-kit/interfaces';
import ClassList from '@components/ClassList/ClassList';
import Container from '@ui-kit/Container/Container';
import styles from './ClassesPage.module.scss';
import Text from '@ui-kit/Text/Text';
import Button from '@ui-kit/Button/Button';
import Icon from '@ui-kit/Icon/Icon';
import Overlay from '@ui-kit/Overlay/Overlay';
import ClassCreateForm from '@components/CreateClassForm/ClassCreateForm';
import { useNavigate } from 'react-router-dom';

interface ClassesPageProps extends UiComponentProps { }

const ClassesPage: React.FC<ClassesPageProps> = () => {
    const [showCreateForm, setShowCreateForm] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleSuccessCreate = (id : string | number) => {
        setShowCreateForm(false);
        return navigate(id.toString());
    };

    return (
        <>
            <Container
                direction={'vertical'}
                classes={styles.page}
                layout={'defaultBase'}
                gap={'l'}
            >
                <Container direction='horizontal' classes={styles.header}>
                    <Text
                        type={'h'}
                        size={3}
                        weight={'bold'}
                    >
                        Ваши классы:
                    </Text>
                    <Button onClick={() => setShowCreateForm(true)} >
                        <Icon name='addLine' classes={styles.btnIcon} />
                        <Text type='p' size={1} weight='bold' classes={styles.btnText}>
                            Создать класс
                        </Text>
                    </Button>
                </Container>
                <Container
                    direction={'horizontal'}
                    classes={styles.list}
                >
                    <ClassList classes={styles.item} />
                </Container>
            </Container>
            <Overlay isShowing={showCreateForm} closeOverlay={() => setShowCreateForm(false)}>
                <ClassCreateForm classes={styles.createForm} onSuccess={handleSuccessCreate} />
            </Overlay>
        </>
    );
};

export default ClassesPage;
