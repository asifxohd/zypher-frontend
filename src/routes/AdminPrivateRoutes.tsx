import { Navigate, Outlet } from "react-router-dom";

const AdminPrivateRoute = () => {
    const decodedTokenString = localStorage.getItem('decodedToken');

    if (decodedTokenString !== null) {
        const decodedToken = JSON.parse(decodedTokenString);

        if (decodedToken && decodedToken.role === 'admin') {
            return <Outlet />;
        } else {
            return <Navigate to="/admin/login" replace />;
        }
    } else {
        return <Navigate to="/admin/login" replace />;
    }
}

export default AdminPrivateRoute;
