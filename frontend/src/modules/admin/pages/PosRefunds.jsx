import React, { useState } from 'react';
import { RotateCcw, CheckCircle, XCircle, Eye, Search, AlertCircle } from 'lucide-react';

const PosRefunds = () => {
    const [requests, setRequests] = useState([
        { id: 'REF-001', invNo: '#INV-8842', client: 'Anita Sharma', amount: '₹1,250', reason: 'Service not satisfactory', status: 'pending', date: '17 Feb 2026' },
        { id: 'REF-002', invNo: '#INV-8835', client: 'Vikram Singh', amount: '₹450', reason: 'Accidental double payment', status: 'pending', date: '16 Feb 2026' },
        { id: 'REF-003', invNo: '#INV-8820', client: 'Sonal Verma', amount: '₹2,100', reason: 'Booking cancelled by salon', status: 'approved', date: '15 Feb 2026' },
    ]);

    const [selectedRequest, setSelectedRequest] = useState(null);

    const handleAction = (id, newStatus) => {
        setRequests(requests.map(req => req.id === id ? { ...req, status: newStatus } : req));
        setSelectedRequest(null);
    };

    return (
        <div className="pos-refunds">
            <div className="card-header" style={{ marginBottom: '25px' }}>
                <h2 className="card-title">Refund Management</h2>
                <div style={{ position: 'relative' }}>
                    <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--admin-text-muted)' }} />
                    <input
                        type="text"
                        placeholder="Search by ID or Client"
                        style={{ padding: '10px 10px 10px 40px', background: 'var(--admin-bg-sidebar)', border: '1px solid var(--admin-border)', borderRadius: '8px', color: '#fff', width: '250px' }}
                    />
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: selectedRequest ? '1fr 350px' : '1fr', gap: '30px', transition: 'all 0.3s' }}>
                {/* Request List */}
                <div className="content-card" style={{ padding: 0, overflow: 'hidden' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid var(--admin-border)' }}>
                                <th style={{ padding: '15px 20px', textAlign: 'left', color: 'var(--admin-text-muted)', fontSize: '0.85rem' }}>Request ID</th>
                                <th style={{ padding: '15px 20px', textAlign: 'left', color: 'var(--admin-text-muted)', fontSize: '0.85rem' }}>Client & Invoice</th>
                                <th style={{ padding: '15px 20px', textAlign: 'left', color: 'var(--admin-text-muted)', fontSize: '0.85rem' }}>Amount</th>
                                <th style={{ padding: '15px 20px', textAlign: 'left', color: 'var(--admin-text-muted)', fontSize: '0.85rem' }}>Status</th>
                                <th style={{ padding: '15px 20px', textAlign: 'right', color: 'var(--admin-text-muted)', fontSize: '0.85rem' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {requests.map((req) => (
                                <tr key={req.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                    <td style={{ padding: '15px 20px' }}>
                                        <div style={{ fontWeight: '600', color: 'var(--admin-text-main)' }}>{req.id}</div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--admin-text-muted)' }}>{req.date}</div>
                                    </td>
                                    <td style={{ padding: '15px 20px' }}>
                                        <div style={{ color: 'var(--admin-text-main)' }}>{req.client}</div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--admin-accent)' }}>{req.invNo}</div>
                                    </td>
                                    <td style={{ padding: '15px 20px', fontWeight: '700', color: '#ef4444' }}>{req.amount}</td>
                                    <td style={{ padding: '15px 20px' }}>
                                        <span style={{
                                            padding: '4px 10px',
                                            borderRadius: '6px',
                                            fontSize: '0.7rem',
                                            fontWeight: '600',
                                            textTransform: 'uppercase',
                                            background: req.status === 'pending' ? 'rgba(245, 158, 11, 0.1)' : req.status === 'approved' ? 'rgba(74, 222, 128, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                                            color: req.status === 'pending' ? '#f59e0b' : req.status === 'approved' ? '#4ade80' : '#ef4444',
                                        }}>
                                            {req.status}
                                        </span>
                                    </td>
                                    <td style={{ padding: '15px 20px', textAlign: 'right' }}>
                                        <button
                                            className="header-icon-btn"
                                            onClick={() => setSelectedRequest(req)}
                                            style={{ background: selectedRequest?.id === req.id ? 'var(--admin-accent-soft)' : 'transparent' }}
                                        >
                                            <Eye size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Detail View Sidebar */}
                {selectedRequest && (
                    <div className="content-card" style={{ alignSelf: 'start', position: 'sticky', top: '100px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                            <h3 className="card-title" style={{ fontSize: '1rem' }}>Request Details</h3>
                            <button onClick={() => setSelectedRequest(null)} style={{ background: 'none', border: 'none', color: 'var(--admin-text-muted)', cursor: 'pointer' }}><XCircle size={18} /></button>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                            <div style={{ padding: '15px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', border: '1px solid var(--admin-border)' }}>
                                <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--admin-text-muted)', marginBottom: '5px' }}>Refund Reason</label>
                                <p style={{ fontSize: '0.9rem', color: 'var(--admin-text-main)', margin: 0, lineHeight: '1.4' }}>
                                    <AlertCircle size={14} style={{ inlineSize: '14px', marginRight: '5px', verticalAlign: 'middle', color: '#f59e0b' }} />
                                    {selectedRequest.reason}
                                </p>
                            </div>

                            {selectedRequest.status === 'pending' && (
                                <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                                    <button
                                        onClick={() => handleAction(selectedRequest.id, 'approved')}
                                        className="bb-btn bb-btn-gold"
                                        style={{ flex: 1, padding: '10px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                                    >
                                        <CheckCircle size={16} /> Approve
                                    </button>
                                    <button
                                        onClick={() => handleAction(selectedRequest.id, 'rejected')}
                                        className="bb-btn bb-btn-outline"
                                        style={{ flex: 1, padding: '10px', fontSize: '0.85rem', color: '#ef4444', borderColor: 'rgba(239, 68, 68, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                                    >
                                        <XCircle size={16} /> Reject
                                    </button>
                                </div>
                            )}

                            {selectedRequest.status !== 'pending' && (
                                <div style={{
                                    padding: '12px',
                                    textAlign: 'center',
                                    borderRadius: '8px',
                                    background: selectedRequest.status === 'approved' ? 'rgba(74, 222, 128, 0.05)' : 'rgba(239, 68, 68, 0.05)',
                                    color: selectedRequest.status === 'approved' ? '#4ade80' : '#ef4444',
                                    fontWeight: '600',
                                    fontSize: '0.9rem'
                                }}>
                                    This request was {selectedRequest.status}
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PosRefunds;
