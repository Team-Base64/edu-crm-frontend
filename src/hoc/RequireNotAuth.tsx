import { Navigate, Outlet, useLocation } from 'react-router-dom';
import AppRoutes from '@router/routes';
import { useAppSelector } from '@app/hooks/baseHooks';

const RequireNotAuth = (): JSX.Element => {
    const location = useLocation();
    const fromLocation = location?.state?.from;

    const { me } = useAppSelector((state) => state.teacherState);


    if (me) {
        return (
            <Navigate
                to={fromLocation ? fromLocation.pathname : AppRoutes.classes}
                replace
            />
        );
    }

    return <Outlet />;
};

export default RequireNotAuth;
