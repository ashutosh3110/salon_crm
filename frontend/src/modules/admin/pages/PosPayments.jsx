import React from 'react';
import { CreditCard, Search, Filter, ArrowUpRight, ArrowDownLeft, AlertCircle, CheckCircle2, Clock } from 'lucide-react';

const PosPayments = () => {
    const transactions = [
        { id: 'TXN-9901', client: 'Anita Sharma', amount: '₹1,250', mode: 'UPI', status: 'Success', time: '10:30 AM' },
        { id: 'TXN-9902', client: 'Rajesh Kumar', amount: '₹850', mode: 'Cash', status: 'Success', time: '11:15 AM' },
        { id: 'TXN-9903', client: 'Priya Singh', amount: '₹2,400', mode: 'Card', status: 'Failed', time: '12:00 PM' },
        { id: 'TXN-9904', client: 'Amit Patel', amount: '₹600', mode: 'UPI', status: 'Pending', time: '12:45 PM' },
        { id: 'TXN-9905', client: 'Suresh Raina', amount: '₹1,550', mode: 'Cash', status: 'Success', time: '01:30 PM' },
    ];

    const modeSummary = [
        { mode: 'Cash', total: '₹10,248', count: 12, icon: <ArrowDownLeft size={16} color="#4ade80" /> },
        { mode: 'UPI', total: '₹8,450', count: 18, icon: <CreditCard size={16} color="#a78bfa" /> },
        { mode: 'Card', total: '₹6,152', count: 8, icon: <ArrowUpRight size={16} color="#60a5fa" /> },
    ];

    return (
        <div className="pos-payments">
            {/* Mode-wise Summary */}
            <div className="dashboard-grid" style={{ marginBottom: '30px' }}>
                {modeSummary.map((item, idx) => (
                    <div key={idx} className="stat-card">
                        <div className="stat-header">
                            <span className="stat-title">{item.mode} Summary</span>
                            {item.icon}
                        </div>
                        <div className="stat-value">{item.total}</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--admin-text-muted)', marginTop: '5px' }}>{item.count} Transactions</div>
                    </div>
                ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '30px' }}>
                {/* Transaction List */}
                <div className="content-card">
                    <div className="card-header" style={{ marginBottom: '20px' }}>
                        <h3 className="card-title">Payment Transaction List</h3>
                        <div style={{ position: 'relative' }}>
                            <Search size={16} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--admin-text-muted)' }} />
                            <input
                                type="text"
                                placeholder="Search transactions..."
                                style={{ padding: '8px 10px 8px 35px', background: 'var(--admin-bg-sidebar)', border: '1px solid var(--admin-border)', borderRadius: '6px', color: '#fff', fontSize: '0.85rem' }}
                            />
                        </div>
                    </div>
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                            <thead>
                                <tr style={{ borderBottom: '1px solid var(--admin-border)', color: 'var(--admin-text-muted)' }}>
                                    <th style={{ padding: '12px 10px', textAlign: 'left' }}>TXN ID</th>
                                    <th style={{ padding: '12px 10px', textAlign: 'left' }}>Client</th>
                                    <th style={{ padding: '12px 10px', textAlign: 'left' }}>Mode</th>
                                    <th style={{ padding: '12px 10px', textAlign: 'left' }}>Amount</th>
                                    <th style={{ padding: '12px 10px', textAlign: 'right' }}>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {transactions.map((txn, idx) => (
                                    <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                                        <td style={{ padding: '12px 10px' }}>{txn.id}</td>
                                        <td style={{ padding: '12px 10px' }}>{txn.client}</td>
                                        <td style={{ padding: '12px 10px' }}>
                                            <span style={{ fontSize: '0.75rem', padding: '2px 8px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px' }}>{txn.mode}</span>
                                        </td>
                                        <td style={{ padding: '12px 10px', fontWeight: 'bold' }}>{txn.amount}</td>
                                        <td style={{ padding: '12px 10px', textAlign: 'right' }}>
                                            <span style={{
                                                fontSize: '0.75rem',
                                                color: txn.status === 'Success' ? '#4ade80' : txn.status === 'Failed' ? '#ef4444' : '#f59e0b',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'flex-end',
                                                gap: '4px'
                                            }}>
                                                {txn.status === 'Success' ? <CheckCircle2 size={12} /> : txn.status === 'Failed' ? <AlertCircle size={12} /> : <Clock size={12} />}
                                                {txn.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Failed/Pending Section */}
                <div className="content-card">
                    <h3 className="card-title" style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <AlertCircle size={18} color="#ef4444" /> Issues & Pending
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        {transactions.filter(t => t.status !== 'Success').map((txn, idx) => (
                            <div key={idx} style={{ padding: '15px', background: 'rgba(239, 68, 68, 0.05)', border: '1px solid rgba(239, 68, 68, 0.1)', borderRadius: '10px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                    <span style={{ fontWeight: '600', fontSize: '0.9rem' }}>{txn.client}</span>
                                    <span style={{ fontWeight: '700', color: '#ef4444' }}>{txn.amount}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--admin-text-muted)' }}>
                                    <span>{txn.id} • {txn.mode}</span>
                                    <span style={{ color: txn.status === 'Failed' ? '#ef4444' : '#f59e0b' }}>{txn.status}</span>
                                </div>
                                <div style={{ marginTop: '10px', display: 'flex', gap: '8px' }}>
                                    <button style={{ flex: 1, padding: '5px', borderRadius: '4px', border: '1px solid var(--admin-border)', background: 'transparent', color: '#fff', fontSize: '0.7rem' }}>Retry</button>
                                    <button style={{ flex: 1, padding: '5px', borderRadius: '4px', border: 'none', background: 'var(--admin-accent)', color: '#fff', fontSize: '0.7rem' }}>Details</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PosPayments;
