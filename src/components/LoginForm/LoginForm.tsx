import React, { FormEvent, useEffect, useRef, useState } from 'react';
import { UiComponentProps } from '@ui-kit/interfaces';
import Input from '@ui-kit/Input/Input';
import Button from '@ui-kit/Button/Button';
import { useLocation, useNavigate } from 'react-router-dom';
import AppRoutes from '@router/routes';
import Icon from '@ui-kit/Icon/Icon';
import Container from '@ui-kit/Container/Container';
import Text from '@ui-kit/Text/Text';
import styles from './LoginForm.module.scss';
import { useEmptyStringValidation } from '../../hooks/validation/string.ts';
import { useLoginMutation } from '@app/features/teacher/teacherApi';

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

    const loginError = useEmptyStringValidation();
    const passwordError = useEmptyStringValidation();

    const fromLocation = location?.state?.from;
    const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;

        if (!username || !password) {
            return;
        }

        login({
            payload: {
                login: username,
                password: password,
            },
        });
    };

    const handleButtonSubmit = () => {
        if (!loginError.errorText || !passwordError.errorText) {
            loginError.setStringError(usernameRef.current?.value ?? '');
            passwordError.setStringError(passwordRef.current?.value ?? '');
            return;
        }
    };

    useEffect(() => {
        if (isSuccess) {
            navigate(
                fromLocation
                    ? fromLocation.pathname
                    : AppRoutes.base + AppRoutes.classes,
                {
                    replace: true,
                },
            );
        }
        if (isError) {
            loginError.setError('Произошла ошибка');
        }
    }, [
        error,
        fromLocation,
        isError,
        isLoading,
        isSuccess,
        loginError,
        navigate,
    ]);

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
                    onSubmit={handleFormSubmit}
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
                            type={'text'}
                            error={{
                                text: loginError.errorText,
                                position: 'right',
                            }}
                            onChange={({ target }) =>
                                loginError.setStringError(target.value)
                            }
                        >
                            <Icon
                                name={'close'}
                                onClick={() => {
                                    if (!usernameRef.current) return;
                                    usernameRef.current.value = '';
                                }}
                            />
                        </Input>
                        <Input
                            inputRef={passwordRef}
                            label={{
                                text: 'Пароль',
                                type: 'h',
                                size: 4,
                            }}
                            placeholder={'DEV пароль 123'}
                            icon={<Icon name={'lock'} />}
                            error={{
                                text: passwordError.errorText,
                                position: 'right',
                            }}
                            type={'text'}
                            onChange={({ target }) => {
                                passwordError.setStringError(target.value);
                            }}
                        >
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
                        </Input>
                    </Container>
                    <Button
                        disabled={isLoading}
                        classes={styles.loginFormSubmitButton}
                        onClick={handleButtonSubmit}
                    >
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
