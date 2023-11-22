import React, { FormEvent, useEffect, useRef, useState } from 'react';
import { UiComponentProps } from '@ui-kit/interfaces';
import Input from '@ui-kit/Input/Input';
import Button from '@ui-kit/Button/Button';
import { useLoginMutation } from '@app/features/teacher/teacherApi';
import { useLocation, useNavigate } from 'react-router-dom';
import Spinner from '@ui-kit/Spinner/Spinner';
import AppRoutes from '@router/routes';
import Icon from '@ui-kit/Icon/Icon';
import Container from '@ui-kit/Container/Container';
import Text from '@ui-kit/Text/Text';
import styles from './LoginForm.module.scss';
import { getEmptyStringValidation } from '../../validation/string.ts';

interface LoginFormProps extends UiComponentProps {}

const LoginForm: React.FC<LoginFormProps> = ({ classes }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const [login, { isLoading, isError, error, isSuccess }] =
        useLoginMutation();

    const [passwordVisibility, setPasswordVisibility] = useState<
        'password' | 'text'
    >('password');

    useEffect(() => {
        if (!passwordRef.current) return;
        passwordRef.current.type = passwordVisibility;
    }, [passwordVisibility]);

    const [loginError, setLoginErorr] = useState<string>('');
    const [passwordError, setPasswordErorr] = useState<string>('');

    const fromLocation = location?.state?.from;
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;
        if (!username || !password) {
            setLoginErorr(getEmptyStringValidation(username));
            setPasswordErorr(getEmptyStringValidation(password));
            return;
        }
        login({
            payload: {
                username: username,
                password: password,
            },
        });
    };

    useEffect(() => {
        if (isSuccess) {
            navigate(fromLocation ? fromLocation.pathname : AppRoutes.classes, {
                replace: true,
            });
        }
        if (isError) {
            console.error(error);
        }
    }, [error, fromLocation, isError, isLoading, isSuccess, navigate]);

    return (
        <>
            <Container
                direction={'vertical'}
                layout={'defaultBase'}
                gap={'l'}
                classes={classes}
            >
                <Text
                    type={'h'}
                    size={3}
                    weight={'bold'}
                >
                    Пожалуйста, войдите
                </Text>
                <form
                    onSubmit={handleSubmit}
                    className={styles.loginForm}
                >
                    <Container direction={'vertical'}>
                        <Input
                            inputRef={usernameRef}
                            label={{
                                text: 'Имя пользователя',
                                type: 'h',
                                size: 4,
                            }}
                            placeholder={'DEV Любое'}
                            icon={<Icon name={'user'} />}
                            button={
                                <Icon
                                    name={'close'}
                                    onClick={() => {
                                        if (!usernameRef.current) return;
                                        usernameRef.current.value = '';
                                    }}
                                />
                            }
                            type={'text'}
                            error={{ text: loginError, position: 'right' }}
                            onChange={({ target }) =>
                                setLoginErorr(
                                    getEmptyStringValidation(target.value),
                                )
                            }
                        />
                        <Input
                            inputRef={passwordRef}
                            label={{
                                text: 'Пароль',
                                type: 'h',
                                size: 4,
                            }}
                            placeholder={'DEV пароль 123'}
                            icon={<Icon name={'lock'} />}
                            error={{ text: passwordError, position: 'right' }}
                            button={
                                <Icon
                                    name={
                                        passwordVisibility === 'text'
                                            ? 'eye'
                                            : 'eyeCrossed'
                                    }
                                    onClick={() => {
                                        if (!passwordRef.current) return;

                                        setPasswordVisibility((prevState) =>
                                            prevState === 'password'
                                                ? 'text'
                                                : 'password',
                                        );
                                    }}
                                />
                            }
                            type={'text'}
                            onChange={({ target }) => {
                                setPasswordErorr(
                                    getEmptyStringValidation(target.value),
                                );
                            }}
                        />
                    </Container>
                    <Button
                        disabled={isLoading}
                        classes={styles.loginFormSubmitButton}
                    >
                        {isLoading && <Spinner />}
                        <Text
                            type={'h'}
                            size={5}
                        >
                            Войти
                        </Text>
                    </Button>
                </form>
            </Container>
        </>
    );
};

export default LoginForm;
