import React, {useEffect, useRef, useState} from 'react';
import {UiComponentProps} from '@ui-kit/interfaces';
import Input from '@ui-kit/Input/Input';
import Button from '@ui-kit/Button/Button';
import {useLoginMutation} from '@app/features/teacher/teacherApi';
import {useLocation, useNavigate} from 'react-router-dom';
import Spinner from '@ui-kit/Spinner/Spinner';
import AppRoutes from '@router/routes';
import Icon from '@ui-kit/Icon/Icon';
import Container from "@ui-kit/Container/Container";
import Text from "@ui-kit/Text/Text";

interface LoginFormProps extends UiComponentProps {
}

const LoginForm: React.FC<LoginFormProps> = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const [login, {isLoading, isError, error, isSuccess}] =
        useLoginMutation();

    const [passwordVisibility, setPasswordVisibily] = useState<
        'password' | 'text'
    >('password');

    useEffect(() => {
        if (!passwordRef.current) return;
        passwordRef.current.type = passwordVisibility;
    }, [passwordVisibility]);

    const fromLocation = location?.state?.from;
    const handleSubmit = () => {
        login({payload: {username: username, password: password}});
    };

    useEffect(() => {
        if (isSuccess) {
            navigate(fromLocation ? fromLocation.pathname : AppRoutes.classes, {
                replace: true,
            });
        }
        if (isError) {
            console.log(error);
        }
    }, [isLoading]);

    return (
        <>
            <Container direction={'vertical'} layout={'defaultBase'} gap={'l'}>
                <Text type={'h'} size={3} weight={'bold'}>
                    Пожалуйста, войдите
                </Text>
                <form>
                    <Container direction={'vertical'}>
                        <Input
                            inputRef={usernameRef}
                            label={'Имя пользователя'}
                            placeholder={'DEV Любое'}
                            icon={<Icon name={'user'}/>}
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
                        />
                        <Input
                            inputRef={passwordRef}
                            label={'Пароль'}
                            placeholder={'DEV пароль 123'}
                            icon={<Icon name={'lock'}/>}
                            button={
                                <Icon
                                    name={
                                        passwordVisibility === 'text'
                                            ? 'eye'
                                            : 'eyeCrossed'
                                    }
                                    onClick={() => {
                                        if (!passwordRef.current) return;

                                        setPasswordVisibily((prevState) =>
                                            prevState === 'password'
                                                ? 'text'
                                                : 'password',
                                        );
                                    }}
                                />
                            }
                            type={'text'}
                        />
                    </Container>

                </form>
                <Button
                    onClick={handleSubmit}
                    disabled={isLoading}
                >
                    {isLoading && <Spinner/>}
                    Войти
                </Button>
            </Container>
        </>
    );
};

export default LoginForm;
