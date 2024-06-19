import { Routes, Route } from "react-router-dom";
import AdminLogin from "../pages/Admin/adminLogin";
import AdminDashboard from "../pages/Admin/AdminDash";
import AdminInvestors from "../pages/Admin/AdminInvestors";
import AdminSalesReport from "../pages/Admin/AdminSalesReport";
import AdminStartups from "../pages/Admin/AdminStartups";
import AdminSubscriptions from "../pages/Admin/AdminSubscriptions";
import AdminPrivateRoute from "./AdminPrivateRoutes";

const AdminRoutes: React.FC = ()=> {
    return (
        <>
            <Routes>
                <Route path="/login" element={<AdminLogin/>} />
                <Route path="*" element={<AdminPrivateRoute/>}>
                    <Route path="" element={<AdminDashboard/>} />
                    <Route path="investors" element={<AdminInvestors/>} />
                    <Route path="sales-report" element={<AdminSalesReport/>} />
                    <Route path="startups" element={<AdminStartups/>} />
                    <Route path="subscriptions" element={<AdminSubscriptions/>} />
                </Route>
            </Routes>
        </>
    );
}
export default AdminRoutes