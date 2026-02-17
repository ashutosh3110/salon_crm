import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import LandingPage from './LandingPage';
import RequestDemo from './RequestDemo';
import AdminLayout from './modules/admin/AdminLayout';
import AdminDashboard from './modules/admin/pages/Dashboard';

export function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/request-demo" element={<RequestDemo />} />

                {/* Admin Routes */}
                <Route path="/admin" element={<AdminLayout />}>
                    <Route index element={<AdminDashboard />} />
                    <Route path="booking" element={<div>Booking Module</div>} />
                    <Route path="pos" element={<div>POS Module</div>} />
                    <Route path="crm" element={<div>CRM Module</div>} />
                    <Route path="*" element={<div style={{ padding: '30px' }}><h2>Coming Soon</h2><p>This module is currently under development.</p></div>} />
                </Route>
            </Routes>
        </Router>
    );
}
