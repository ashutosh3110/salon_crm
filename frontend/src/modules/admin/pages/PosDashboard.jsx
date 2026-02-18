import React from 'react';
import { TrendingUp, ShoppingBag, CreditCard, DollarSign, Wallet, MapPin, ArrowRight } from 'lucide-react';

const PosDashboard = () => {
    const stats = [
        { title: 'Today\'s Total Sales', value: '₹24,850', trend: '+15%', icon: <DollarSign size={20} />, color: '#4ade80' },
        { title: 'Total Bills Generated', value: '38', trend: '+12%', icon: <ShoppingBag size={20} />, color: '#60a5fa' },
        { title: 'Average Bill Value', value: '₹654', trend: '+2%', icon: <TrendingUp size={20} />, color: '#f59e0b' },
        { title: 'Active Terminals', value: '4', trend: 'Stable', icon: <MapPin size={20} />, color: '#a78bfa' },
    ];

    const outletSummary = [
        { name: 'Andheri West Branch', sales: '₹8,450', bills: 12, performance: 'High' },
        { name: 'Bandra Main Outlet', sales: '₹10,200', bills: 15, performance: 'Peak' },
        { name: 'Juhu Studio', sales: '₹4,100', bills: 7, performance: 'Stable' },
        { name: 'Powai Branch', sales: '₹2,100', bills: 4, performance: 'Low' },
    ];

    return (
        <div className="pos-dashboard">
            {/* Top Stats */}
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
                            <span className="stat-trend trend-up">{stat.trend}</span>
                        </div>
                        <span className="stat-title">{stat.title}</span>
                        <span className="stat-value">{stat.value}</span>
                    </div>
                ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginTop: '30px' }}>
                {/* Cash vs Online Breakup */}
                <div className="content-card">
                    <h3 className="card-title" style={{ marginBottom: '25px' }}>Cash vs Online Breakup</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div style={{ position: 'relative', height: '12px', background: 'rgba(255,255,255,0.05)', borderRadius: '10px', overflow: 'hidden', display: 'flex' }}>
                            <div style={{ width: '65%', background: 'var(--admin-accent)', height: '100%' }}></div>
                            <div style={{ width: '35%', background: '#4ade80', height: '100%' }}></div>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                            <div style={{ padding: '15px', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid var(--admin-border)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--admin-text-muted)', fontSize: '0.85rem', marginBottom: '8px' }}>
                                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--admin-accent)' }}></div>
                                    Online / Digital
                                </div>
                                <div style={{ fontSize: '1.2rem', fontWeight: '700' }}>₹16,152 <span style={{ fontSize: '0.8rem', color: '#4ade80' }}>(65%)</span></div>
                            </div>
                            <div style={{ padding: '15px', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid var(--admin-border)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--admin-text-muted)', fontSize: '0.85rem', marginBottom: '8px' }}>
                                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#4ade80' }}></div>
                                    Cash Payment
                                </div>
                                <div style={{ fontSize: '1.2rem', fontWeight: '700' }}>₹8,698 <span style={{ fontSize: '0.8rem', color: '#4ade80' }}>(35%)</span></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Outlet-wise Summary */}
                <div className="content-card">
                    <div className="card-header">
                        <h3 className="card-title">Outlet-wise POS Summary</h3>
                        <MapPin size={18} color="var(--admin-accent)" />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        {outletSummary.map((outlet, idx) => (
                            <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 15px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', border: '1px solid var(--admin-border)' }}>
                                <div>
                                    <div style={{ fontWeight: '600', fontSize: '0.9rem' }}>{outlet.name}</div>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--admin-text-muted)' }}>{outlet.bills} Bills generated today</div>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <div style={{ fontWeight: '700', color: '#4ade80' }}>{outlet.sales}</div>
                                    <span style={{
                                        fontSize: '0.65rem',
                                        padding: '2px 6px',
                                        borderRadius: '4px',
                                        background: outlet.performance === 'Peak' ? 'rgba(74, 222, 128, 0.1)' : 'rgba(255,255,255,0.05)',
                                        color: outlet.performance === 'Peak' ? '#4ade80' : 'var(--admin-text-muted)'
                                    }}>
                                        {outlet.performance}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PosDashboard;
