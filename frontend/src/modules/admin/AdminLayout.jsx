import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import './admin.css';
import { Bell, Search, User } from 'lucide-react';

const AdminLayout = () => {
    return (
        <div className="admin-layout">
            <Sidebar />

            <main className="admin-main">
                <header className="admin-header">
                    <div className="header-left">
                        <h2>Dashboard</h2>
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
