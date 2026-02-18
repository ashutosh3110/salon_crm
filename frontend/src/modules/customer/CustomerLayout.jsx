import React from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { Home, Calendar, ClipboardList, Tag, User } from 'lucide-react';
import './customer.css';

const CustomerLayout = () => {
    const location = useLocation();

    const tabs = [
        { id: 'home', icon: <Home size={24} />, label: 'Home', path: '/app' },
        { id: 'book', icon: <Calendar size={24} />, label: 'Book', path: '/app/book' },
        { id: 'appointments', icon: <ClipboardList size={24} />, label: 'Activity', path: '/app/appointments' },
        { id: 'offers', icon: <Tag size={24} />, label: 'Offers', path: '/app/offers' },
        { id: 'profile', icon: <User size={24} />, label: 'Profile', path: '/app/profile' },
    ];

    return (
        <div className="customer-mobile-app">
            {/* Main Content Scroll Area */}
            <main style={{ paddingBottom: '20px' }}>
                <Outlet />
            </main>

            {/* Bottom Bottom Navigation */}
            <nav className="customer-bottom-nav">
                {tabs.map((tab) => (
                    <NavLink
                        key={tab.id}
                        to={tab.path}
                        end={tab.path === '/app'}
                        className={({ isActive }) => `nav-tab ${isActive ? 'active' : ''}`}
                    >
                        {tab.icon}
                        <span>{tab.label}</span>
                    </NavLink>
                ))}
            </nav>
        </div>
    );
};

export default CustomerLayout;
