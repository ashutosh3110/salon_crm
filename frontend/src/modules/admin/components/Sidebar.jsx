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
    RotateCcw,
    Receipt,
    Clock,
    Shield,
    Wallet,
    BarChart3,
    CalendarDays,
    Sun,
    Moon
} from 'lucide-react';
import { useTheme } from '../../../context/ThemeContext';

const Sidebar = () => {
    const { themeMode, toggleThemeMode } = useTheme();
    const location = useLocation();
    const [expandedItem, setExpandedItem] = React.useState('POS'); // Default POS expanded if on its routes

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
                {
                    title: 'POS',
                    path: '/admin/pos',
                    icon: <CreditCard size={20} />,
                    subItems: [
                        { title: 'POS Dashboard', path: '/admin/pos/dashboard', icon: <LayoutDashboard size={16} /> },
                        { title: 'Payments', path: '/admin/pos/payments', icon: <CreditCard size={16} /> },
                        { title: 'Invoices', path: '/admin/pos/invoices', icon: <Receipt size={16} /> },
                        { title: 'Refunds', path: '/admin/pos/refunds', icon: <RotateCcw size={16} /> },
                        { title: 'POS Setting', path: '/admin/pos/settings', icon: <Settings size={16} /> },
                    ]
                },
                { title: 'CRM', path: '/admin/crm', icon: <Users size={20} /> },
            ]
        },
        {
            title: 'Business Setup',
            items: [
                { title: 'Outlet Management', path: '/admin/outlets', icon: <Briefcase size={20} /> },
                { title: 'Staff Management', path: '/admin/staff-setup', icon: <UserCheck size={20} /> },
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
            title: 'HR Management',
            items: [
                {
                    title: 'HR',
                    path: '/admin/hr',
                    icon: <Users size={20} />,
                    subItems: [
                        { title: 'HR Dashboard', path: '/admin/hr/dashboard', icon: <LayoutDashboard size={16} /> },
                        { title: 'Employees', path: '/admin/hr/employees', icon: <Users size={16} /> },
                        { title: 'Attendance', path: '/admin/hr/attendance', icon: <Clock size={16} /> },
                        { title: 'Shifts', path: '/admin/hr/shifts', icon: <CalendarDays size={16} /> },
                        { title: 'Commissions', path: '/admin/hr/commissions', icon: <Percent size={16} /> },
                        { title: 'Payroll', path: '/admin/hr/payroll', icon: <Wallet size={16} /> },
                        { title: 'Performance', path: '/admin/hr/performance', icon: <BarChart3 size={16} /> },
                    ]
                },
            ]
        },
        {
            title: 'Finance Management',
            items: [
                {
                    title: 'Finance',
                    path: '/admin/finance',
                    icon: <TrendingUp size={20} />,
                    subItems: [
                        { title: 'Finance Dashboard', path: '/admin/finance/dashboard', icon: <LayoutDashboard size={16} /> },
                        { title: 'Supplier', path: '/admin/finance/suppliers', icon: <Truck size={16} /> },
                        { title: 'Supplier Invoices', path: '/admin/finance/supplier-invoices', icon: <Receipt size={16} /> },
                        { title: 'Expenses', path: '/admin/finance/expenses', icon: <Wallet size={16} /> },
                        { title: 'Cash and Bank', path: '/admin/finance/cash-bank', icon: <CreditCard size={16} /> },
                        { title: 'End of day report', path: '/admin/finance/eod-report', icon: <FileText size={16} /> },
                    ]
                },
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

    const toggleExpand = (title) => {
        setExpandedItem(expandedItem === title ? null : title);
    };

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
                        {group.items.map((item, idx) => {
                            const hasSubItems = item.subItems && item.subItems.length > 0;
                            const isExpanded = expandedItem === item.title;

                            return (
                                <div key={idx}>
                                    {hasSubItems ? (
                                        <>
                                            <div
                                                className={`nav-item ${location.pathname.startsWith(item.path) ? 'active' : ''}`}
                                                onClick={() => toggleExpand(item.title)}
                                                style={{ cursor: 'pointer', justifyContent: 'space-between' }}
                                            >
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                                    {item.icon}
                                                    <span>{item.title}</span>
                                                </div>
                                                {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                                            </div>

                                            {isExpanded && (
                                                <div className="sub-nav">
                                                    {item.subItems.map((sub, sIdx) => (
                                                        <NavLink
                                                            key={sIdx}
                                                            to={sub.path}
                                                            className={({ isActive }) => `sub-nav-item ${isActive ? 'active' : ''}`}
                                                        >
                                                            {sub.icon}
                                                            <span>{sub.title}</span>
                                                        </NavLink>
                                                    ))}
                                                </div>
                                            )}
                                        </>
                                    ) : (
                                        <NavLink
                                            to={item.path}
                                            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                                            end={item.path === '/admin'}
                                        >
                                            {item.icon}
                                            <span>{item.title}</span>
                                        </NavLink>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                ))}

                <div className="nav-group">
                    <div className="nav-group-title">Appearance</div>
                    <div className="nav-item" onClick={toggleThemeMode} style={{ cursor: 'pointer' }}>
                        {themeMode === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                        <span>{themeMode === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
                    </div>
                </div>

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
