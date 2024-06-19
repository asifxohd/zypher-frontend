import { Navigate, Outlet } from "react-router-dom";

const InvestorPrivateRoute = () => {
    const decodedTokenString = localStorage.getItem('decodedToken');

    if (decodedTokenString !== null) {
        const decodedToken = JSON.parse(decodedTokenString);

        if (decodedToken && decodedToken.role === 'investor') {
            return <Outlet />;
        } else {
            return <Navigate to="/login" replace />;
        }
    } else {
        return <Navigate to="/login" replace />;
    }
}

export default InvestorPrivateRoute;
