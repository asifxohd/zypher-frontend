import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { lazy, Suspense } from 'react';

import Loader from "./components/landing/Loader";

const StartupRoutes = lazy(() => import("./routes/StartupRoutes"));
const InvestorRoutes = lazy(() => import("./routes/InvestorRoutes"));
const AdminRoutes = lazy(() => import("./routes/AdminRoutes"));

const App: React.FC = () => {

    return (
        <>
            <BrowserRouter>
                <Suspense fallback={<Loader/>}>
                    <Routes>
                        <Route path="/*" element={<StartupRoutes/>} />
                        <Route path="/investor/*" element={<InvestorRoutes/>} />
                        <Route path="/admin/*" element={<AdminRoutes/>} />
                    </Routes>
                </Suspense>
            </BrowserRouter>
        </>
    );
}

export default App;

<Routes>
                        {/* <Route path="/" element={<LandingPage />} />
                        <Route path="/admin" element={<LazyAdminDashboard />} />
                        <Route path="admin-dashboard" element={<LazyAdminDashboard />} />
                        <Route path="admin-salesreport" element={<LazyAdminSalesReport />} />
                        <Route path="admin-investors" element={<LazyAdminInvestors />} />
                        <Route path="admin-startups" element={<LazyAdminStartups />} />
                        <Route path="admin-subscriptions" element={<LazyAdminSubscriptions />} />  
                        <Route path="login" element={<Login/>} /> 
                        <Route path="investor-home" element={<InvestorHome/>} />  */}
                    </Routes>