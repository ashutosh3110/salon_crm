import React from 'react';
import { Users, UserCheck, Wallet, Star, TrendingUp, MapPin } from 'lucide-react';

const HrDashboard = () => {
    const stats = [
        { title: 'Total Staff', value: '24', icon: <Users size={20} />, color: '#60a5fa', detail: 'Across 4 outlets' },
        { title: 'Present Today', value: '21', icon: <UserCheck size={20} />, color: '#4ade80', detail: '3 on leave' },
        { title: 'Monthly Payroll', value: '₹4.2L', icon: <Wallet size={20} />, color: '#f59e0b', detail: 'For Feb 2026' },
        { title: 'Avg Performance', value: '4.8', icon: <Star size={20} />, color: '#a78bfa', detail: 'Top rated team' },
    ];

    const topStaff = [
        { name: 'Anita Sharma', role: 'Senior Stylist', outlet: 'Bandra Main', rating: 4.9, sales: '₹85,000' },
        { name: 'Rajesh Kumar', role: 'Hair Expert', outlet: 'Andheri West', rating: 4.8, sales: '₹72,400' },
        { name: 'Sonal Verma', role: 'Skin Specialist', outlet: 'Juhu Studio', rating: 4.7, sales: '₹68,900' },
    ];

    return (
        <div className="hr-dashboard">
            <div className="dashboard-grid">
                {stats.map((stat, index) => (
                    <div key={index} className="stat-card">
                        <div className="stat-header">
                            <div className="stat-icon" style={{
                                padding: '10px',
                                background: `${stat.color}15`,
                                color: stat.color,
                                borderRadius: '10px'
                            }}>
                                {stat.icon}
                            </div>
                        </div>
                        <span className="stat-title">{stat.title}</span>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px' }}>
                            <span className="stat-value">{stat.value}</span>
                        </div>
                        <span style={{ fontSize: '0.75rem', color: 'var(--admin-text-muted)', marginTop: '5px' }}>{stat.detail}</span>
                    </div>
                ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '30px', marginTop: '30px' }}>
                {/* Top Performing Staff */}
                <div className="content-card">
                    <div className="card-header">
                        <h3 className="card-title">Top Performing Staff (This Month)</h3>
                        <TrendingUp size={18} color="var(--admin-accent)" />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        {topStaff.map((staff, idx) => (
                            <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '15px', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid var(--admin-border)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--admin-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                                        {staff.name[0]}
                                    </div>
                                    <div>
                                        <div style={{ fontWeight: '600' }}>{staff.name}</div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--admin-text-muted)' }}>{staff.role} • {staff.outlet}</div>
                                    </div>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <div style={{ fontWeight: '700', color: '#4ade80' }}>{staff.sales}</div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem', color: '#f59e0b', justifyContent: 'flex-end' }}>
                                        <Star size={12} fill="#f59e0b" /> {staff.rating}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Attendance Quick View */}
                <div className="content-card">
                    <h3 className="card-title" style={{ marginBottom: '20px' }}>Outlet Attendance</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        {['Bandra Main', 'Andheri West', 'Juhu Studio', 'Powai Branch'].map((outlet, idx) => (
                            <div key={idx}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '8px' }}>
                                    <span>{outlet}</span>
                                    <span style={{ color: 'var(--admin-text-muted)' }}>{85 + idx * 3}% Present</span>
                                </div>
                                <div style={{ height: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', overflow: 'hidden' }}>
                                    <div style={{ width: `${85 + idx * 3}%`, height: '100%', background: 'var(--admin-accent)' }}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HrDashboard;
