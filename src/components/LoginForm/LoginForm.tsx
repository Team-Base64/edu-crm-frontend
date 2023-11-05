import React, { useEffect, useState } from 'react';
import { UiComponentProps } from '@ui-kit/interfaces';
import Input from '@ui-kit/Input/Input';
import Button from '@ui-kit/Button/Button';
import { useLoginMutation } from '@app/features/teacher/teacherApi';
import { useLocation, useNavigate } from 'react-router-dom';
import Spinner from '@ui-kit/Spinner/Spinner';
import AppRoutes from '@router/routes';
interface LoginFormProps extends UiComponentProps {}
const LoginForm: React.FC<LoginFormProps> = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const navigate = useNavigate();

    const [login, { isLoading, isError, error, isSuccess }] =
        useLoginMutation();
    const location = useLocation();
    const fromLocation = location?.state?.from;
    const handleSubmit = () => {
        login({ payload: { username: username, password: password } });
    };

    useEffect(() => {
        if (isSuccess) {
            console.log('login succ');

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
            <form>
                <Input
                    label={'Имя пользователя'}
                    placeholder={'DEV Любое'}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <Input
                    label={'Пароль'}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={'DEV пароль 123'}
                />
                <Button
                    onClick={handleSubmit}
                    disabled={isLoading}
                >
                    {isLoading && <Spinner />}
                    Войти
                </Button>
            </form>
        </>
    );
};

export default LoginForm;
