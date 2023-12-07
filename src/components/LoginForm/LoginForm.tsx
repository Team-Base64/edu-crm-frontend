import React, { useRef, useState } from 'react';
import { UiComponentProps } from '@ui-kit/interfaces';
import Input from '@ui-kit/Input/Input';
import Button from '@ui-kit/Button/Button';
import { useLocation, useNavigate } from 'react-router-dom';
import AppRoutes from '@router/routes';
import Icon from '@ui-kit/Icon/Icon';
import Container from '@ui-kit/Container/Container';
import Text from '@ui-kit/Text/Text';
import styles from './LoginForm.module.scss';
import { useLoginMutation } from '@app/features/teacher/teacherApi';
import { localStoragePath } from '@app/const/consts.ts';
import Spinner from '@ui-kit/Spinner/Spinner.tsx';
import Hint from '@ui-kit/Hint/Hint.tsx';
import useForm from '@ui-kit/_hooks/useForm';

interface LoginFormProps extends UiComponentProps {}

const LoginForm: React.FC<LoginFormProps> = ({ classes }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [login] = useLoginMutation();
    const [lock, setLock] = useState(false);
    const [passwordVisibility, setPasswordVisibility] = useState<
        'password' | 'text'
    >('password');
    const [hint, setHint] = useState(false);
    const formRef = useRef<HTMLFormElement>(null);
    const [form, isValid] = useForm({
        login: {
            rules: {
                noEmpty: true,
            },
            initial: '',
        },
        password: {
            rules: {
                noEmpty: true,
            },
            initial: '',
        },
    });

    const fromLocation = location?.state?.from;

    const handleSubmit = () => {
        if (!isValid) {
            return;
        }

        localStorage.setItem(localStoragePath.login, username);

        setLock(true);

        login({
            payload: {
                login: form.login.value,
                password: form.password.value,
            },
        })
            .then((resp: any) => {
                if ('error' in resp && resp.error.status === 401) {
                    setHint(true);
                    return;
                }
                navigate(
                    fromLocation
                        ? fromLocation.pathname
                        : AppRoutes.base + AppRoutes.classes,
                    {
                        replace: true,
                    },
                );
            })
            .finally(() => {
                setLock(false);
            });
    };

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
                    onSubmit={(e) => e.preventDefault()}
                    className={styles.loginForm}
                    ref={formRef}
                >
                    <Container direction={'vertical'}>
                        <Hint
                            state={[hint, setHint]}
                            text="Пользователь не найден"
                            timeoutSec={5}
                        />
                        <Input
                            label={{
                                text: 'Имя пользователя',
                                type: 'h',
                                size: 4,
                            }}
                            placeholder="Имя пользователя"
                            icon={<Icon name={'user'} />}
                            type={'text'}
                            name={form.login.name}
                            onChange={form.login.changeMiddleware()}
                            errors={form.login.errors}
                            button={
                                <Icon
                                    name={'close'}
                                    onClick={() => {
                                        if (!formRef.current) return;
                                        formRef.current[form.login.name].value =
                                            '';
                                    }}
                                />
                            }
                        />

                        <Input
                            label={{
                                text: 'Пароль',
                                type: 'h',
                                size: 4,
                            }}
                            icon={<Icon name={'lock'} />}
                            button={
                                <Icon
                                    name={
                                        passwordVisibility === 'text'
                                            ? 'eye'
                                            : 'eyeCrossed'
                                    }
                                    onClick={() => {
                                        setPasswordVisibility((prevState) =>
                                            prevState === 'password'
                                                ? 'text'
                                                : 'password',
                                        );
                                    }}
                                />
                            }
                            placeholder="Пароль"
                            type={passwordVisibility}
                            onChange={form.password.changeMiddleware()}
                            errors={form.password.errors}
                        />
                    </Container>
                    <Button
                        disabled={lock || !isValid}
                        classes={styles.submit}
                        onClick={handleSubmit}
                    >
                        {lock && <Spinner classes={styles.spinner} />}
                        <Text
                            type="h"
                            size={5}
                            classes={styles.text}
                            weight="bold"
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
