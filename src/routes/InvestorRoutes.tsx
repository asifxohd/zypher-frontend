import { Routes, Route } from "react-router-dom";
import InvestorHome from "../pages/investor/InvestorLanding";
import Step2Register from "../pages/investor/Step2Register";
import InvestorPrivateRoute from "./InvestorPriveteRoute";
import UserProfile from "../pages/investor/Profile";
const InvestorRoutes: React.FC = ()=> {
    return (
        <>
            <Routes>
                <Route path="step-2-register" element={<Step2Register/>} /> 
                <Route path="*" element={<InvestorHome/>} >
                    <Route path="" element={<InvestorPrivateRoute/>} />
                    <Route path="profile" element={<UserProfile/>} />
                </Route>

            </Routes>
        </>
    );
}
export default InvestorRoutes