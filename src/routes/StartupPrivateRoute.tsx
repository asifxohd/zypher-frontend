import { Navigate, Outlet } from "react-router-dom";

const StartupPrivateRoute = () => {
    const decodedTokenString = localStorage.getItem('decodedToken');

    if (decodedTokenString !== null) {
        const decodedToken = JSON.parse(decodedTokenString);

        if (decodedToken && decodedToken.role === 'startup') {
            return <Outlet />;
        } else {
            return <Navigate to="/login" replace />;
        }
    } else {
        return <Navigate to="/login" replace />;
    }
}

export default StartupPrivateRoute;
