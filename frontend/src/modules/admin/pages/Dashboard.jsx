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
                    value="124"
                    trend="+12% from last week"
                    trendUp={true}
                    icon={Calendar}
                />
                <StatCard
                    title="Today's Sales"
                    value="AED 4,250"
                    trend="+5% from yesterday"
                    trendUp={true}
                    icon={DollarSign}
                />
                <StatCard
                    title="New Customers"
                    value="18"
                    trend="-2% from last week"
                    trendUp={false}
                    icon={Users}
                />
                <StatCard
                    title="Active Staff"
                    value="12"
                    trend="All staff present"
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
                            {[
                                { customer: 'Sarah Johnson', service: 'Hair Coloring', time: 'Today, 2:00 PM', status: 'Confirmed' },
                                { customer: 'Emily Clark', service: 'Manicure', time: 'Today, 3:30 PM', status: 'Pending' },
                                { customer: 'Jessica White', service: 'Facial', time: 'Tomorrow, 10:00 AM', status: 'Confirmed' },
                            ].map((row, idx) => (
                                <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                    <td style={{ padding: '16px 0', color: 'var(--admin-text-main)' }}>{row.customer}</td>
                                    <td style={{ padding: '16px 0' }}>{row.service}</td>
                                    <td style={{ padding: '16px 0' }}>{row.time}</td>
                                    <td style={{ padding: '16px 0' }}>
                                        <span style={{
                                            backgroundColor: row.status === 'Confirmed' ? 'rgba(74, 222, 128, 0.1)' : 'rgba(251, 191, 36, 0.1)',
                                            color: row.status === 'Confirmed' ? '#4ade80' : '#fbbf24',
                                            padding: '4px 8px',
                                            borderRadius: '4px',
                                            fontSize: '0.75rem'
                                        }}>{row.status}</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="content-card">
                    <div className="card-header">
                        <div className="card-title">Top Services</div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {[
                            { name: 'Hair Cut & Styling', sales: 'AED 1,200' },
                            { name: 'Bridal Henna', sales: 'AED 950' },
                            { name: 'Classic Facial', sales: 'AED 800' },
                            { name: 'Gel Manicure', sales: 'AED 450' },
                        ].map((item, idx) => (
                            <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ color: 'var(--admin-text-muted)' }}>{item.name}</span>
                                <span style={{ color: 'var(--admin-text-main)', fontWeight: '600' }}>{item.sales}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
