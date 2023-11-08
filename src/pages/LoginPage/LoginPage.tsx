import React from 'react';
import LoginForm from '@components/LoginForm/LoginForm';
import Container from '@ui-kit/Container/Container';
import styles from './LoginPage.module.scss';

const LoginPage: React.FC = () => {
    return (
        <Container classes={styles.page}>
            <LoginForm  classes={styles.form}/>
        </Container>
    );
};

export default LoginPage;
