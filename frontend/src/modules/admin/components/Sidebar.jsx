import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    Calendar,
    CreditCard,
    Users,
    ShoppingBag,
    Truck,
    Briefcase,
    FileText,
    Settings,
    LogOut,
    ChevronDown,
    ChevronRight,
    UserCheck,
    Percent,
    TrendingUp,
    Clock
} from 'lucide-react';

const Sidebar = () => {
    const location = useLocation();

    const menuGroups = [
        {
            title: 'Main',
            items: [
                { title: 'Dashboard', path: '/admin', icon: <LayoutDashboard size={20} /> },
            ]
        },
        {
            title: 'Operations',
            items: [
                { title: 'Booking', path: '/admin/booking', icon: <Calendar size={20} /> },
                { title: 'POS', path: '/admin/pos', icon: <CreditCard size={20} /> },
                { title: 'CRM', path: '/admin/crm', icon: <Users size={20} /> },
            ]
        },
        {
            title: 'Business Setup',
            items: [
                { title: 'Outlets', path: '/admin/outlets', icon: <Briefcase size={20} /> },
                { title: 'Staff', path: '/admin/staff-setup', icon: <UserCheck size={20} /> },
            ]
        },
        {
            title: 'Inventory',
            items: [
                { title: 'Products', path: '/admin/products', icon: <ShoppingBag size={20} /> },
                { title: 'Suppliers', path: '/admin/suppliers', icon: <Truck size={20} /> },
            ]
        },
        {
            title: 'Finance',
            items: [
                { title: 'Financial Dashboard', path: '/admin/finance', icon: <TrendingUp size={20} /> },
                { title: 'Expenses', path: '/admin/expenses', icon: <Percent size={20} /> },
            ]
        },
        {
            title: 'HR',
            items: [
                { title: 'Employees', path: '/admin/employees', icon: <Users size={20} /> },
                { title: 'Attendance', path: '/admin/attendance', icon: <Clock size={20} /> },
            ]
        },
        {
            title: 'Management',
            items: [
                { title: 'Reports', path: '/admin/reports', icon: <FileText size={20} /> },
                { title: 'Settings', path: '/admin/settings', icon: <Settings size={20} /> },
            ]
        }
    ];

    return (
        <aside className="admin-sidebar">
            <div className="sidebar-header">
                <NavLink to="/" className="sidebar-brand">
                    <img src="/logo/wapixologo1 (1).png" alt="Logo" style={{ height: '32px' }} />
                    <span>Salon Panel</span>
                </NavLink>
            </div>

            <nav className="sidebar-nav">
                {menuGroups.map((group, index) => (
                    <div key={index} className="nav-group">
                        <div className="nav-group-title">{group.title}</div>
                        {group.items.map((item, idx) => (
                            <NavLink
                                key={idx}
                                to={item.path}
                                className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                                end={item.path === '/admin'} // Exact match primarily for dashboard root
                            >
                                {item.icon}
                                <span>{item.title}</span>
                            </NavLink>
                        ))}
                    </div>
                ))}

                <div className="nav-group">
                    <div className="nav-group-title">Account</div>
                    <a href="#" className="nav-item">
                        <LogOut size={20} />
                        <span>Logout</span>
                    </a>
                </div>
            </nav>
        </aside>
    );
};

export default Sidebar;
