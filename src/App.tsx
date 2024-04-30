import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { lazy, Suspense } from 'react';

const LazyAdminDashboard = lazy(() => import('./pages/Admin/AdminDash'));
const LazyAdminInvestors = lazy(() => import('./pages/Admin/AdminInvestors'));
const LazyAdminSalesReport = lazy(() => import('./pages/Admin/AdminSalesReport'));
const LazyAdminSubscriptions = lazy(() => import('./pages/Admin/AdminSubscriptions'));
const LazyAdminStartups = lazy(() => import('./pages/Admin/AdminStartups'));
import RegisterPage from "./pages/investor/Register";
import OTP from "./pages/investor/OtpVerification";
import LandingPage from "./components/landing/landingpage";
import Login from "./pages/investor/Login";
import Step2Register from "./pages/investor/Step2Register";

const App: React.FC = () => {
    return (
        <>
            <BrowserRouter>
                <Suspense fallback={<div>Loading...</div>}>
                    <Routes>
                        <Route path="/" element={<LandingPage />} />
                        {/* <Route path="/admin" element={<LazyAdminDashboard />} />
                        <Route path="admin-dashboard" element={<LazyAdminDashboard />} />
                        <Route path="admin-salesreport" element={<LazyAdminSalesReport />} />
                        <Route path="admin-investors" element={<LazyAdminInvestors />} />
                        <Route path="admin-startups" element={<LazyAdminStartups />} />
                        <Route path="admin-subscriptions" element={<LazyAdminSubscriptions />} />  */}
                        <Route path="register" element={<RegisterPage/>} />
                        <Route path="verify-otp" element={<OTP/>} /> 
                        <Route path="login" element={<Login/>} /> 
                        <Route path="step-2-register" element={<Step2Register/>} /> 
                    </Routes>
                </Suspense>
            </BrowserRouter>
        </>
    );
}


export default App;
