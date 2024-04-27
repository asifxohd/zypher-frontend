import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { lazy, Suspense } from 'react';

const LazyAdminDashboard = lazy(() => import('./pages/Admin/AdminDash'));
const LazyAdminInvestors = lazy(() => import('./pages/Admin/AdminInvestors'));
const LazyAdminSalesReport = lazy(() => import('./pages/Admin/AdminSalesReport'));
const LazyAdminSubscriptions = lazy(() => import('./pages/Admin/AdminSubscriptions'));
const LazyAdminStartups = lazy(() => import('./pages/Admin/AdminStartups'));

const App: React.FC = () => {
    return (
        <>
            <BrowserRouter>
                <Suspense fallback={<div>Loading...</div>}>
                    <Routes>
                        <Route path="/" element={<LazyAdminDashboard />} />
                        <Route path="admin-dashboard" element={<LazyAdminDashboard />} />
                        <Route path="admin-salesreport" element={<LazyAdminSalesReport />} />
                        <Route path="admin-investors" element={<LazyAdminInvestors />} />
                        <Route path="admin-startups" element={<LazyAdminStartups />} />
                        <Route path="admin-subscriptions" element={<LazyAdminSubscriptions />} />
                    </Routes>
                </Suspense>
            </BrowserRouter>
        </>
    );
}


export default App;
