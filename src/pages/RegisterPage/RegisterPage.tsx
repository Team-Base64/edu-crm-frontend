import React from 'react';
import styles from './RegisterPage.module.scss';
import Container from '@ui-kit/Container/Container';
import RegisterForm from '@components/RegisterForm/RegisterForm';
import { useNavigate } from 'react-router-dom';
import AppRoutes from '@router/routes';
import Button from '@ui-kit/Button/Button';
import Text from '@ui-kit/Text/Text';

const RegisterPage: React.FC = () => {
    const navigate = useNavigate();

    const handleRegister = () => {
        return navigate(`/${AppRoutes.login}`);
    };

    return (
        <Container
            direction="vertical"
            classes={styles.page}
        >
            <RegisterForm classes={styles.form} />
            <Button
                type="link"
                onClick={handleRegister}
            >
                <Text
                    type="p"
                    size={1}
                    weight="bold"
                >
                    Уже есть аккаунт?
                </Text>
            </Button>
        </Container>
    );
};

export default RegisterPage;
