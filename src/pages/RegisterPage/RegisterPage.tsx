import React from 'react';
import styles from './RegisterPage.module.scss';
import Container from '@ui-kit/Container/Container';
import RegisterForm from '@components/RegisterForm/RegisterForm';

const RegisterPage: React.FC = () => {
    return (
        <Container
            direction="vertical"
            classes={styles.page}
        >
            <RegisterForm classes={styles.form} />
            
        </Container>
    );
};

export default RegisterPage;
