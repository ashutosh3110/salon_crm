import React, { useState } from 'react';
import {
    Percent, Settings, Users, TrendingUp,
    Save, Edit2, Search, Filter, ArrowUpRight,
    ChevronRight, Wallet, Info
} from 'lucide-react';

const HrCommissions = () => {
    const [view, setView] = useState('rules'); // 'rules' or 'staff'

    // Mock Data for Commission Rules
    const [rules, setRules] = useState([
        { id: 1, type: 'Service', role: 'Senior Stylist', commission: '15', criteria: 'On every service' },
        { id: 2, type: 'Service', role: 'Junior Stylist', commission: '10', criteria: 'On every service' },
        { id: 3, type: 'Product', role: 'All Staff', commission: '5', criteria: 'On retail sales' },
        { id: 4, type: 'Membership', role: 'Receptionist', commission: '2', criteria: 'On membership sale' },
    ]);

    // Mock Data for Staff Commissions
    const staffCommissions = [
        { name: 'Anita Sharma', role: 'Senior Stylist', totalSales: '₹85,000', earning: '₹12,750', payoutStatus: 'Pending' },
        { name: 'Rajesh Kumar', role: 'Hair Expert', totalSales: '₹72,400', earning: '₹7,240', payoutStatus: 'Paid' },
        { name: 'Sonal Verma', role: 'Receptionist', totalSales: '₹45,000', earning: '₹900', payoutStatus: 'Pending' },
        { name: 'Amit Patel', role: 'Manager', totalSales: '₹1,20,000', earning: '₹0', payoutStatus: 'N/A' },
    ];

    const handlePercentChange = (id, value) => {
        setRules(rules.map(rule => rule.id === id ? { ...rule, commission: value } : rule));
    };

    return (
        <div className="commissions-page">
            {/* Header Tabs */}
            <div style={{ display: 'flex', gap: '15px', marginBottom: '30px' }}>
                <button
                    onClick={() => setView('rules')}
                    className={`bb-btn ${view === 'rules' ? 'bb-btn-gold' : 'bb-btn-outline'}`}
                    style={{ padding: '10px 20px', display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                    <Settings size={18} /> Commission Rules
                </button>
                <button
                    onClick={() => setView('staff')}
                    className={`bb-btn ${view === 'staff' ? 'bb-btn-gold' : 'bb-btn-outline'}`}
                    style={{ padding: '10px 20px', display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                    <Users size={18} /> Staff Earnings View
                </button>
            </div>

            {view === 'rules' ? (
                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(600px, 1.5fr) 1fr', gap: '30px' }}>
                    {/* Rule Set Table */}
                    <div className="content-card" style={{ padding: 0 }}>
                        <div style={{ padding: '20px', borderBottom: '1px solid var(--admin-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h3 className="card-title">Commission Hierarchy</h3>
                            <button className="bb-btn bb-btn-gold" style={{ fontSize: '0.8rem', padding: '8px 15px' }}>+ Add New Rule</button>
                        </div>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid var(--admin-border)' }}>
                                    <th style={{ padding: '15px 20px', textAlign: 'left', color: 'var(--admin-text-muted)', fontSize: '0.85rem' }}>Category</th>
                                    <th style={{ padding: '15px 20px', textAlign: 'left', color: 'var(--admin-text-muted)', fontSize: '0.85rem' }}>Staff Role</th>
                                    <th style={{ padding: '15px 20px', textAlign: 'left', color: 'var(--admin-text-muted)', fontSize: '0.85rem' }}>Comm. %</th>
                                    <th style={{ padding: '15px 20px', textAlign: 'right', color: 'var(--admin-text-muted)', fontSize: '0.85rem' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {rules.map((rule) => (
                                    <tr key={rule.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                                        <td style={{ padding: '15px 20px' }}>
                                            <div style={{ fontWeight: '600' }}>{rule.type}</div>
                                            <div style={{ fontSize: '0.75rem', color: 'var(--admin-text-muted)' }}>{rule.criteria}</div>
                                        </td>
                                        <td style={{ padding: '15px 20px', fontSize: '0.9rem' }}>{rule.role}</td>
                                        <td style={{ padding: '15px 20px' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                <input
                                                    type="number"
                                                    value={rule.commission}
                                                    onChange={(e) => handlePercentChange(rule.id, e.target.value)}
                                                    style={{ width: '60px', padding: '5px', background: 'var(--admin-bg-sidebar)', border: '1px solid var(--admin-border)', borderRadius: '4px', color: '#fff', textAlign: 'center' }}
                                                />
                                                <span style={{ color: 'var(--admin-accent)' }}>%</span>
                                            </div>
                                        </td>
                                        <td style={{ padding: '15px 20px', textAlign: 'right' }}>
                                            <button className="header-icon-btn"><Edit2 size={16} /></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div style={{ padding: '20px', textAlign: 'right' }}>
                            <button className="bb-btn bb-btn-gold" style={{ padding: '10px 25px' }}>
                                <Save size={18} style={{ marginRight: '8px' }} /> Update All Changes
                            </button>
                        </div>
                    </div>

                    {/* Quick Info & Tips */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div className="content-card" style={{ background: 'rgba(184, 92, 92, 0.03)', borderColor: 'rgba(184, 92, 92, 0.2)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--admin-accent)', marginBottom: '15px', fontWeight: 'bold' }}>
                                <Info size={18} /> How it works
                            </div>
                            <ul style={{ paddingLeft: '18px', fontSize: '0.85rem', color: 'var(--admin-text-muted)', lineHeight: '1.6' }}>
                                <li>Service commission is calculated on net service value.</li>
                                <li>Product commission is based on retail price post-discounts.</li>
                                <li>Role-wise rules override global defaults.</li>
                                <li>Changes will be applied from the next billing cycle.</li>
                            </ul>
                        </div>
                        <div className="content-card">
                            <h4 style={{ marginBottom: '15px', fontSize: '0.95rem' }}>Global Overlay %</h4>
                            <div className="form-group">
                                <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--admin-text-muted)', marginBottom: '8px' }}>Max Staff Earning Cap</label>
                                <input type="number" placeholder="40" style={{ width: '100%', padding: '10px', background: 'var(--admin-bg-sidebar)', border: '1px solid var(--admin-border)', borderRadius: '8px', color: '#fff' }} />
                                <p style={{ fontSize: '0.7rem', color: 'var(--admin-text-muted)', marginTop: '8px' }}>Limit the total commission a staff can earn across all categories.</p>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="staff-commission-view">
                    <div className="content-card" style={{ padding: 0 }}>
                        <div style={{ padding: '20px', borderBottom: '1px solid var(--admin-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h3 className="card-title">Staff Earning History (Feb 2026)</h3>
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <div style={{ position: 'relative' }}>
                                    <Search size={16} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--admin-text-muted)' }} />
                                    <input type="text" placeholder="Search staff..." style={{ padding: '8px 10px 8px 35px', background: 'var(--admin-bg-sidebar)', border: '1px solid var(--admin-border)', borderRadius: '6px', color: '#fff', fontSize: '0.85rem' }} />
                                </div>
                                <button className="bb-btn bb-btn-outline" style={{ fontSize: '0.8rem' }}><Filter size={16} /></button>
                            </div>
                        </div>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid var(--admin-border)' }}>
                                    <th style={{ padding: '15px 20px', textAlign: 'left', color: 'var(--admin-text-muted)', fontSize: '0.85rem' }}>Staff Name</th>
                                    <th style={{ padding: '15px 20px', textAlign: 'left', color: 'var(--admin-text-muted)', fontSize: '0.85rem' }}>Contribution</th>
                                    <th style={{ padding: '15px 20px', textAlign: 'left', color: 'var(--admin-text-muted)', fontSize: '0.85rem' }}>Earned Comm.</th>
                                    <th style={{ padding: '15px 20px', textAlign: 'left', color: 'var(--admin-text-muted)', fontSize: '0.85rem' }}>Status</th>
                                    <th style={{ padding: '15px 20px', textAlign: 'right', color: 'var(--admin-text-muted)', fontSize: '0.85rem' }}>Details</th>
                                </tr>
                            </thead>
                            <tbody>
                                {staffCommissions.map((staff, idx) => (
                                    <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                                        <td style={{ padding: '15px 20px' }}>
                                            <div style={{ fontWeight: '600' }}>{staff.name}</div>
                                            <div style={{ fontSize: '0.75rem', color: 'var(--admin-text-muted)' }}>{staff.role}</div>
                                        </td>
                                        <td style={{ padding: '15px 20px' }}>
                                            <div style={{ fontSize: '0.9rem', color: 'var(--admin-text-main)' }}>Total Sales: {staff.totalSales}</div>
                                        </td>
                                        <td style={{ padding: '15px 20px' }}>
                                            <div style={{ fontWeight: '700', color: '#4ade80', display: 'flex', alignItems: 'center', gap: '5px' }}>
                                                {staff.earning} <ArrowUpRight size={14} />
                                            </div>
                                        </td>
                                        <td style={{ padding: '15px 20px' }}>
                                            <span style={{
                                                padding: '4px 8px', borderRadius: '4px', fontSize: '0.75rem',
                                                background: staff.payoutStatus === 'Paid' ? 'rgba(74, 222, 128, 0.1)' : staff.payoutStatus === 'Pending' ? 'rgba(245, 158, 11, 0.1)' : 'rgba(255,255,255,0.05)',
                                                color: staff.payoutStatus === 'Paid' ? '#4ade80' : staff.payoutStatus === 'Pending' ? '#f59e0b' : 'var(--admin-text-muted)',
                                            }}>
                                                {staff.payoutStatus}
                                            </span>
                                        </td>
                                        <td style={{ padding: '15px 20px', textAlign: 'right' }}>
                                            <button className="header-icon-btn"><ChevronRight size={18} /></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default HrCommissions;
