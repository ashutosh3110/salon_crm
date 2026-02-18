import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import './admin.css';
import { Bell, Search, User } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const AdminLayout = () => {
    const location = useLocation();

    const getPageTitle = () => {
        const path = location.pathname;
        if (path === '/admin') return 'Dashboard';
        if (path.startsWith('/admin/outlets/settings')) return 'Outlet Settings';
        if (path.startsWith('/admin/outlets/add')) return 'Add New Outlet';
        if (path.startsWith('/admin/outlets/edit')) return 'Edit Outlet';
        if (path.startsWith('/admin/outlets')) return 'Outlet Management';
        if (path.startsWith('/admin/staff-setup/add')) return 'Add New Staff';
        if (path.startsWith('/admin/staff-setup/edit')) return 'Edit Staff Member';
        if (path.startsWith('/admin/staff-setup')) return 'Staff Management';
        if (path === '/admin/pos/dashboard') return 'POS Dashboard';
        if (path === '/admin/pos/payments') return 'POS Payments';
        if (path === '/admin/pos/invoices') return 'POS Invoices';
        if (path === '/admin/pos/refunds') return 'POS Refunds';
        if (path === '/admin/pos/settings') return 'POS Settings';
        if (path.startsWith('/admin/pos')) return 'POS Management';
        if (path === '/admin/hr/dashboard') return 'HR Dashboard';
        if (path === '/admin/hr/employees') return 'Employee Management';
        if (path === '/admin/hr/attendance') return 'Attendance Tracking';
        if (path === '/admin/hr/shifts') return 'Shift Management';
        if (path === '/admin/hr/commissions') return 'Staff Commissions';
        if (path === '/admin/hr/payroll') return 'Payroll Management';
        if (path === '/admin/hr/performance') return 'Performance Analytics';
        if (path.startsWith('/admin/hr')) return 'HR Management';
        return 'Salon Admin';
    };

    return (
        <div className="admin-layout">
            <Sidebar />

            <main className="admin-main">
                <header className="admin-header">
                    <div className="header-left">
                        <h2>{getPageTitle()}</h2>
                    </div>

                    <div className="header-right">
                        <button className="header-icon-btn">
                            <Search size={20} />
                        </button>
                        <button className="header-icon-btn">
                            <Bell size={20} />
                        </button>
                        <div className="user-profile header-icon-btn">
                            <User size={20} />
                        </div>
                    </div>
                </header>

                <div className="admin-wrapper">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
