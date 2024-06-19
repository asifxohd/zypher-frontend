import { Routes, Route } from "react-router-dom";
import LandingPage from "../components/landing/landingpage";
import Login from "../pages/investor/Login";
import RegisterPage from "../pages/investor/Register";
import OTP from "../pages/investor/OtpVerification";
import StartupLanding from "../pages/startups/StartupLanding";
import StartupPrivateRoute from "./StartupPrivateRoute";
import StartupProfile from "../pages/startups/StartupProfile";

const StartupRoutes: React.FC = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/verify-otp" element={<OTP />} />
                <Route path="*" element={<StartupPrivateRoute />} >
                    <Route path="startup-home" element={<StartupLanding />} >
                        <Route path="profile" element={<StartupProfile />} />

                    </Route>
                </Route>
            </Routes>
        </>
    );
}
export default StartupRoutes