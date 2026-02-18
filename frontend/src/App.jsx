import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import LandingPage from './LandingPage';
import RequestDemo from './RequestDemo';
import AdminLayout from './modules/admin/AdminLayout';
import AdminDashboard from './modules/admin/pages/Dashboard';
import CrmManagement from './modules/admin/pages/CrmManagement';
import Register from './modules/auth/Register';
import Login from './modules/auth/Login';
import Onboarding from './modules/onboarding/Onboarding';
import OutletList from './modules/admin/pages/OutletList';
import OutletForm from './modules/admin/pages/OutletForm';
import OutletSettings from './modules/admin/pages/OutletSettings';
import StaffList from './modules/admin/pages/StaffList';
import StaffForm from './modules/admin/pages/StaffForm';
import PosDashboard from './modules/admin/pages/PosDashboard';
import PosPayments from './modules/admin/pages/PosPayments';
import PosInvoices from './modules/admin/pages/PosInvoices';
import PosRefunds from './modules/admin/pages/PosRefunds';
import PosSettings from './modules/admin/pages/PosSettings';
import HrDashboard from './modules/admin/pages/HrDashboard';
import HrEmployees from './modules/admin/pages/HrEmployees';
import HrAttendance from './modules/admin/pages/HrAttendance';
import HrShifts from './modules/admin/pages/HrShifts';
import HrCommissions from './modules/admin/pages/HrCommissions';
import HrPayroll from './modules/admin/pages/HrPayroll';
import HrPerformance from './modules/admin/pages/HrPerformance';
import BookingManagement from './modules/admin/pages/BookingManagement';
import FinanceDashboard from './modules/admin/pages/FinanceDashboard';
import FinanceSuppliers from './modules/admin/pages/FinanceSuppliers';
import FinanceSupplierInvoices from './modules/admin/pages/FinanceSupplierInvoices';
import FinanceExpenses from './modules/admin/pages/FinanceExpenses';
import FinanceCashBank from './modules/admin/pages/FinanceCashBank';
import FinanceEodReport from './modules/admin/pages/FinanceEodReport';

export function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/onboarding" element={<Onboarding />} />
                <Route path="/request-demo" element={<RequestDemo />} />

                {/* Admin Routes */}
                <Route path="/admin" element={<AdminLayout />}>
                    <Route index element={<AdminDashboard />} />
                    <Route path="booking" element={<BookingManagement />} />
                    <Route path="pos">
                        <Route index element={<PosDashboard />} />
                        <Route path="dashboard" element={<PosDashboard />} />
                        <Route path="payments" element={<PosPayments />} />
                        <Route path="invoices" element={<PosInvoices />} />
                        <Route path="refunds" element={<PosRefunds />} />
                        <Route path="settings" element={<PosSettings />} />
                    </Route>
                    <Route path="crm" element={<CrmManagement />} />
                    <Route path="outlets">
                        <Route index element={<OutletList />} />
                        <Route path="add" element={<OutletForm />} />
                        <Route path="edit/:id" element={<OutletForm />} />
                        <Route path="settings/:id" element={<OutletSettings />} />
                    </Route>
                    <Route path="staff-setup">
                        <Route index element={<StaffList />} />
                        <Route path="add" element={<StaffForm />} />
                        <Route path="edit/:id" element={<StaffForm />} />
                    </Route>
                    <Route path="hr">
                        <Route index element={<HrDashboard />} />
                        <Route path="dashboard" element={<HrDashboard />} />
                        <Route path="employees" element={<HrEmployees />} />
                        <Route path="attendance" element={<HrAttendance />} />
                        <Route path="shifts" element={<HrShifts />} />
                        <Route path="commissions" element={<HrCommissions />} />
                        <Route path="payroll" element={<HrPayroll />} />
                        <Route path="performance" element={<HrPerformance />} />
                    </Route>
                    <Route path="finance">
                        <Route index element={<FinanceDashboard />} />
                        <Route path="dashboard" element={<FinanceDashboard />} />
                        <Route path="suppliers" element={<FinanceSuppliers />} />
                        <Route path="supplier-invoices" element={<FinanceSupplierInvoices />} />
                        <Route path="expenses" element={<FinanceExpenses />} />
                        <Route path="cash-bank" element={<FinanceCashBank />} />
                        <Route path="eod-report" element={<FinanceEodReport />} />
                    </Route>
                    <Route path="*" element={<div style={{ padding: '30px' }}><h2>Coming Soon</h2><p>This module is currently under development.</p></div>} />
                </Route>
            </Routes>
        </Router>
    );
}
