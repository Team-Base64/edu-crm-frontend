import React, { useState } from 'react';
import { UiComponentProps } from '@ui-kit/interfaces';
import Input from '@ui-kit/Input/Input';
import Button from '@ui-kit/Button/Button';
import { useLocation, useNavigate } from 'react-router-dom';
import AppRoutes from '@router/routes';
import Icon from '@ui-kit/Icon/Icon';
import Container from '@ui-kit/Container/Container';
import Text from '@ui-kit/Text/Text';
import styles from './RegisterForm.module.scss';
import { useRegisterMutation } from '@app/features/teacher/teacherApi';
import Spinner from '@ui-kit/Spinner/Spinner.tsx';
import Hint from '@ui-kit/Hint/Hint.tsx';
import useForm from '@ui-kit/_hooks/useForm';

interface RegisterFormProps extends UiComponentProps {}

const RegisterForm: React.FC<RegisterFormProps> = ({ classes }) => {
    const navigate = useNavigate();
    const [register] = useRegisterMutation();

    const location = useLocation();
    const fromLocation = location?.state?.from;

    const [lock, setLock] = useState(false);

    const [passwordVisibility, setPasswordVisibility] = useState<
        'password' | 'text'
    >('password');

    const [hint, setHint] = useState(false);

    const [form, isValid] = useForm({
        login: {
            rules: {
                min: 5,
                max: 50,
                trim: true,
            },
            initial: '',
        },

        password: {
            rules: {
                min: 8,
                max: 30,
                trim: true,
            },
            initial: '',
        },

        repeatPassword: {
            rules: {
                min: 8,
                max: 30,
                trim: true,
            },
            initial: '',
        },

        firstName: {
            rules: {
                noEmpty: true,
                max: 30,
                trim: true,
            },
            initial: '',
        },

        middleName: {
            rules: {
                max: 30,
                trim: true,
            },
            initial: '',
        },

        lastName: {
            rules: {
                max: 30,
                trim: true,
            },
            initial: '',
        },
    });

    const handleSubmit = () => {
        if (!isValid) {
            return;
        }

        setLock(true);

        register({
            payload: {
                name: [
                    form.firstName.value.trim(),
                    form.middleName.value.trim(),
                    form.lastName.value.trim(),
                ]
                    .join(' ')
                    .replace('  ', ' '),
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
                    Новый аккаунт
                </Text>
                <form
                    onSubmit={(e) => e.preventDefault()}
                    className={styles.registerForm}
                >
                    <Container direction={'vertical'}>
                        <Hint
                            state={[hint, setHint]}
                            text="Пользователь не найден"
                            timeoutSec={5}
                        />
                        <Input
                            label={{
                                text: 'Логин',
                                type: 'h',
                                size: 4,
                            }}
                            placeholder="Для входа"
                            icon={<Icon name={'user'} />}
                            type={'text'}
                            onChange={form.login.changeMiddleware()}
                            errors={form.login.errors}
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
                        <Input
                            label={{
                                text: 'Повторите пароль',
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
                            onChange={form.repeatPassword.changeMiddleware()}
                            errors={form.repeatPassword.errors}
                        />
                        <Input
                            label={{
                                text: 'Ваше имя',
                                type: 'h',
                                size: 4,
                            }}
                            placeholder="Обязательное поле"
                            type={'text'}
                            onChange={form.firstName.changeMiddleware()}
                            errors={form.firstName.errors}
                        />
                        <Input
                            label={{
                                text: 'Ваше отчество',
                                type: 'h',
                                size: 4,
                            }}
                            placeholder="Можно оставить пустым"
                            type={'text'}
                            onChange={form.middleName.changeMiddleware()}
                            errors={form.middleName.errors}
                        />
                        <Input
                            label={{
                                text: 'Ваша фамилия',
                                type: 'h',
                                size: 4,
                            }}
                            placeholder="Можно оставить пустым"
                            type={'text'}
                            onChange={form.lastName.changeMiddleware()}
                            errors={form.lastName.errors}
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
                            Зарегистрироваться
                        </Text>
                    </Button>
                </form>
            </Container>
        </>
    );
};

export default RegisterForm;
