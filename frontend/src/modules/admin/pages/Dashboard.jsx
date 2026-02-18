import React from 'react';
import { Calendar, DollarSign, Users, Scissors } from 'lucide-react';

const StatCard = ({ title, value, trend, trendUp, icon: Icon }) => (
    <div className="stat-card">
        <div className="stat-header">
            <div className="stat-title">{title}</div>
            {Icon && <Icon size={20} color="var(--admin-accent)" />}
        </div>
        <div className="stat-value">{value}</div>
        <div className={`stat-trend ${trendUp ? 'trend-up' : 'trend-down'}`}>
            {trend}
        </div>
    </div>
);

const AdminDashboard = () => {
    return (
        <div>
            <div className="dashboard-grid">
                <StatCard
                    title="Total Bookings"
                    value="0"
                    trend="No data yet"
                    trendUp={true}
                    icon={Calendar}
                />
                <StatCard
                    title="Today's Sales"
                    value="0.00"
                    trend="No data yet"
                    trendUp={true}
                    icon={DollarSign}
                />
                <StatCard
                    title="New Customers"
                    value="0"
                    trend="No data yet"
                    trendUp={false}
                    icon={Users}
                />
                <StatCard
                    title="Active Staff"
                    value="0"
                    trend="No data yet"
                    trendUp={true}
                    icon={Scissors}
                />
            </div>

            <div className="dashboard-grid" style={{ gridTemplateColumns: '2fr 1fr' }}>
                <div className="content-card">
                    <div className="card-header">
                        <div className="card-title">Recent Appointments</div>
                        <button className="bb-btn bb-btn-outline" style={{ padding: '8px 16px', fontSize: '0.8rem' }}>View All</button>
                    </div>
                    <table style={{ width: '100%', borderCollapse: 'collapse', color: 'var(--admin-text-muted)' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid var(--admin-border)', textAlign: 'left' }}>
                                <th style={{ padding: '12px 0', fontSize: '0.85rem' }}>Customer</th>
                                <th style={{ padding: '12px 0', fontSize: '0.85rem' }}>Service</th>
                                <th style={{ padding: '12px 0', fontSize: '0.85rem' }}>Date/Time</th>
                                <th style={{ padding: '12px 0', fontSize: '0.85rem' }}>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td colSpan="4" style={{ padding: '40px 0', textAlign: 'center', color: 'var(--admin-text-muted)' }}>
                                    No recent appointments found
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="content-card">
                    <div className="card-header">
                        <div className="card-title">Top Services</div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <div style={{ padding: '20px 0', textAlign: 'center', color: 'var(--admin-text-muted)' }}>
                            No service data available
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
