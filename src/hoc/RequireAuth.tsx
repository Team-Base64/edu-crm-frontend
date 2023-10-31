import { Navigate, useLocation } from "react-router-dom";

interface Props {
    children: JSX.Element;
}

const RequireAuth = ({ children }: Props): JSX.Element => {
    const location = useLocation();
    
    // TODO
    const auth = true;

    if (!auth) {
        return (
            <Navigate to='/login' state={{ from: location }} />
        );
    }

    return children;
}

export default RequireAuth;