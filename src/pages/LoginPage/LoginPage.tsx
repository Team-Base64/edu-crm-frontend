import React from 'react';
import LoginForm from '@components/LoginForm/LoginForm';
import Container from '@ui-kit/Container/Container';
import styles from './LoginPage.module.scss';
import Button from '@ui-kit/Button/Button';
import Icon from '@ui-kit/Icon/Icon';
import Text from '@ui-kit/Text/Text';
import { useNavigate } from 'react-router-dom';
import AppRoutes from '@router/routes';

const LoginPage: React.FC = () => {
    const navigate = useNavigate();

    const handleRegister = () => {
        return navigate(`/${AppRoutes.register}`);
    };

    return (
        <Container
            classes={styles.page}
            direction="vertical"
        >
            <LoginForm classes={styles.form} />
            <Button
                type="link"
                onClick={handleRegister}
            >
                <Text
                    type="p"
                    size={1}
                    weight="bold"
                >
                    Ещё нет аккаунта?
                </Text>
            </Button>
        </Container>
    );
};

export default LoginPage;
