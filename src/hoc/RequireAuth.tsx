import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAppSelector } from '@app/hooks/baseHooks';
import routes from '@router/routes';

const RequireAuth = (): JSX.Element => {
    const location = useLocation();

    const { me } = useAppSelector((state) => state.teacherState);
    if (!me) {
        return (
            <Navigate
                to={routes.login}
                state={{ from: location }}
            />
        );
    }

    return <Outlet />;
};

export default RequireAuth;
