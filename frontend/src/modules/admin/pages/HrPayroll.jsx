import React, { useState } from 'react';
import {
    Wallet, Calendar, MapPin, Briefcase, Filter,
    Download, CheckCircle, Lock, Eye, Play,
    AlertCircle, FileText, ChevronRight, X, TrendingUp
} from 'lucide-react';

const HrPayroll = () => {
    const [selectedMonth, setSelectedMonth] = useState('February 2026');
    const [selectedRecord, setSelectedRecord] = useState(null);
    const [payrollStatus, setPayrollStatus] = useState('Draft'); // Draft, Approved, Paid, Locked

    const stats = [
        { title: 'Total Employees', value: '24', icon: <UsersIcon />, color: '#60a5fa' },
        { title: 'Gross Payroll', value: '₹5,45,000', icon: <TrendingUp size={20} />, color: '#4ade80' },
        { title: 'Total Deductions', value: '₹22,400', icon: <AlertCircle size={20} />, color: '#f87171' },
        { title: 'Net Payable', value: '₹5,22,600', icon: <Wallet size={20} />, color: '#f59e0b' },
    ];

    const payrollData = [
        {
            id: 1, name: 'Anita Sharma', role: 'Senior Stylist', outlet: 'Bandra Main',
            base: 35000, present: 24, absent: 2, commission: 8500, deductions: 1200,
            net: 42300, status: 'Draft'
        },
        {
            id: 2, name: 'Rajesh Kumar', role: 'Hair Expert', outlet: 'Andheri West',
            base: 28000, present: 26, absent: 0, commission: 7200, deductions: 0,
            net: 35200, status: 'Approved'
        },
        {
            id: 3, name: 'Sonal Verma', role: 'Receptionist', outlet: 'Juhu Studio',
            base: 18000, present: 25, absent: 1, commission: 900, deductions: 500,
            net: 18400, status: 'Draft'
        }
    ];

    return (
        <div className="payroll-page">
            {/* Top Filters */}
            <div className="content-card" style={{ marginBottom: '25px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '15px', alignItems: 'flex-end' }}>
                    <div className="form-group">
                        <label style={{ fontSize: '0.8rem', color: 'var(--admin-text-muted)', marginBottom: '8px', display: 'block' }}>Month</label>
                        <select className="admin-input" style={{ width: '100%', padding: '10px', background: 'var(--admin-bg-sidebar)', border: '1px solid var(--admin-border)', color: '#fff', borderRadius: '8px' }}>
                            <option>February 2026</option>
                            <option>January 2026</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label style={{ fontSize: '0.8rem', color: 'var(--admin-text-muted)', marginBottom: '8px', display: 'block' }}>Outlet</label>
                        <select className="admin-input" style={{ width: '100%', padding: '10px', background: 'var(--admin-bg-sidebar)', border: '1px solid var(--admin-border)', color: '#fff', borderRadius: '8px' }}>
                            <option>All Outlets</option>
                            <option>Bandra Main</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label style={{ fontSize: '0.8rem', color: 'var(--admin-text-muted)', marginBottom: '8px', display: 'block' }}>Status</label>
                        <select className="admin-input" style={{ width: '100%', padding: '10px', background: 'var(--admin-bg-sidebar)', border: '1px solid var(--admin-border)', color: '#fff', borderRadius: '8px' }}>
                            <option>All Status</option>
                            <option>Draft</option>
                            <option>Approved</option>
                            <option>Paid</option>
                        </select>
                    </div>
                    <div>
                        <button className="bb-btn bb-btn-gold" style={{ width: '100%', padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                            <Play size={16} /> Generate Payroll
                        </button>
                    </div>
                </div>
            </div>

            {/* Summary Cards */}
            <div className="dashboard-grid" style={{ marginBottom: '30px' }}>
                {stats.map((stat, idx) => (
                    <div key={idx} className="stat-card">
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                            <div style={{ color: stat.color }}>{stat.icon}</div>
                            <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{stat.value}</span>
                        </div>
                        <div style={{ fontSize: '0.85rem', color: 'var(--admin-text-muted)' }}>{stat.title}</div>
                    </div>
                ))}
            </div>

            {/* Main Table */}
            <div className="content-card" style={{ padding: 0, overflow: 'visible' }}>
                <div style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--admin-border)' }}>
                    <h3 className="card-title">Salary Registry - {selectedMonth}</h3>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <button className="bb-btn bb-btn-outline" style={{ fontSize: '0.8rem' }}><Lock size={14} /> Lock All</button>
                        <button className="bb-btn bb-btn-outline" style={{ fontSize: '0.8rem' }}><CheckCircle size={14} /> Approve All</button>
                    </div>
                </div>
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid var(--admin-border)' }}>
                                <th style={{ padding: '15px 20px', textAlign: 'left', color: 'var(--admin-text-muted)', fontSize: '0.8rem' }}>Employee</th>
                                <th style={{ padding: '15px 20px', textAlign: 'left', color: 'var(--admin-text-muted)', fontSize: '0.8rem' }}>Base Salary</th>
                                <th style={{ padding: '15px 20px', textAlign: 'left', color: 'var(--admin-text-muted)', fontSize: '0.8rem' }}>Attendance</th>
                                <th style={{ padding: '15px 20px', textAlign: 'left', color: 'var(--admin-text-muted)', fontSize: '0.8rem' }}>Commission</th>
                                <th style={{ padding: '15px 20px', textAlign: 'left', color: 'var(--admin-text-muted)', fontSize: '0.8rem' }}>Net Pay</th>
                                <th style={{ padding: '15px 20px', textAlign: 'left', color: 'var(--admin-text-muted)', fontSize: '0.8rem' }}>Status</th>
                                <th style={{ padding: '15px 20px', textAlign: 'right', color: 'var(--admin-text-muted)', fontSize: '0.8rem' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {payrollData.map((row) => (
                                <tr key={row.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                                    <td style={{ padding: '15px 20px' }}>
                                        <div style={{ fontWeight: '600' }}>{row.name}</div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--admin-text-muted)' }}>{row.role} • {row.outlet}</div>
                                    </td>
                                    <td style={{ padding: '15px 20px' }}>₹{row.base.toLocaleString()}</td>
                                    <td style={{ padding: '15px 20px' }}>
                                        <div style={{ fontSize: '0.85rem' }}><span style={{ color: '#4ade80' }}>P: {row.present}</span> | <span style={{ color: '#f87171' }}>A: {row.absent}</span></div>
                                    </td>
                                    <td style={{ padding: '15px 20px', color: '#4ade80' }}>+ ₹{row.commission.toLocaleString()}</td>
                                    <td style={{ padding: '15px 20px', fontWeight: 'bold' }}>₹{row.net.toLocaleString()}</td>
                                    <td style={{ padding: '15px 20px' }}>
                                        <span style={{
                                            padding: '4px 8px', borderRadius: '4px', fontSize: '0.7rem',
                                            background: row.status === 'Approved' ? 'rgba(74, 222, 128, 0.1)' : 'rgba(255,255,255,0.05)',
                                            color: row.status === 'Approved' ? '#4ade80' : 'var(--admin-text-muted)',
                                            border: `1px solid ${row.status === 'Approved' ? 'rgba(74, 222, 128, 0.2)' : 'var(--admin-border)'}`
                                        }}>
                                            {row.status}
                                        </span>
                                    </td>
                                    <td style={{ padding: '15px 20px', textAlign: 'right' }}>
                                        <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                                            <button className="header-icon-btn" onClick={() => setSelectedRecord(row)}><Eye size={16} /></button>
                                            <button className="header-icon-btn"><CheckCircle size={16} color="#4ade80" /></button>
                                            <button className="header-icon-btn"><Lock size={16} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Payslip Modal */}
            {selectedRecord && (
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
                    <div className="content-card" style={{ width: '500px', padding: 0 }}>
                        <div style={{ padding: '20px', borderBottom: '1px solid var(--admin-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h3 style={{ margin: 0 }}>Salary Breakdown</h3>
                            <button onClick={() => setSelectedRecord(null)} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}><X size={20} /></button>
                        </div>
                        <div style={{ padding: '30px' }}>
                            <div style={{ textAlign: 'center', marginBottom: '25px' }}>
                                <div style={{ fontSize: '1.2rem', fontWeight: '700' }}>{selectedRecord.name}</div>
                                <div style={{ color: 'var(--admin-accent)', fontSize: '0.9rem' }}>{selectedRecord.role} • Feb 2026</div>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                                    <span style={{ color: 'var(--admin-text-muted)' }}>Base Salary</span>
                                    <span>₹{selectedRecord.base.toLocaleString()}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                                    <span style={{ color: 'var(--admin-text-muted)' }}>Attendance Adjustment</span>
                                    <span style={{ color: '#f87171' }}>- ₹1,500</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                                    <span style={{ color: 'var(--admin-text-muted)' }}>Service Commission</span>
                                    <span style={{ color: '#4ade80' }}>+ ₹6,500</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                                    <span style={{ color: 'var(--admin-text-muted)' }}>Product Commission</span>
                                    <span style={{ color: '#4ade80' }}>+ ₹2,000</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                                    <span style={{ color: 'var(--admin-text-muted)' }}>Attendance Bonus</span>
                                    <span style={{ color: '#4ade80' }}>+ ₹300</span>
                                </div>
                                <div style={{ height: '1px', background: 'var(--admin-border)', margin: '10px 0' }}></div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.1rem', fontWeight: 'bold' }}>
                                    <span>Net Payable</span>
                                    <span style={{ color: 'var(--admin-accent)' }}>₹{selectedRecord.net.toLocaleString()}</span>
                                </div>
                            </div>

                            <div style={{ marginTop: '30px', display: 'flex', gap: '10px' }}>
                                <button className="bb-btn bb-btn-gold" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                                    <Download size={16} /> Download PDF
                                </button>
                                <button className="bb-btn bb-btn-outline" style={{ flex: 1 }}>Mark as Paid</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const UsersIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
);

export default HrPayroll;
