import React, { useState } from 'react';
import {
    Plus, Search, Filter, Download, MoreVertical,
    CheckCircle, Clock, AlertCircle, X, Receipt,
    Calendar, DollarSign, User, FileText, Check
} from 'lucide-react';

const FinanceSupplierInvoices = () => {
    const [showModal, setShowModal] = useState(false);
    const [activeTab, setActiveTab] = useState('all');
    const [currentInvoice, setCurrentInvoice] = useState({ supplier: '', amount: '', dueDate: '', status: 'Pending' });

    const invoices = [
        { id: 'INV-001', supplier: 'L\'Oréal Professional', amount: 25000, dueDate: '2026-02-25', status: 'Pending' },
        { id: 'INV-002', supplier: 'Schwarzkopf India', amount: 12400, dueDate: '2026-02-15', status: 'Overdue' },
        { id: 'INV-003', supplier: 'Wellness Essentials', amount: 8500, dueDate: '2026-02-20', status: 'Paid' },
        { id: 'INV-004', supplier: 'Dyson Commercial', amount: 45000, dueDate: '2026-03-01', status: 'Partial' },
    ];

    const getStatusStyle = (status) => {
        switch (status) {
            case 'Paid': return { bg: 'rgba(74, 222, 128, 0.1)', color: '#4ade80', border: 'rgba(74, 222, 128, 0.2)' };
            case 'Pending': return { bg: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b', border: 'rgba(245, 158, 11, 0.2)' };
            case 'Overdue': return { bg: 'rgba(248, 113, 113, 0.1)', color: '#f87171', border: 'rgba(248, 113, 113, 0.2)' };
            case 'Partial': return { bg: 'rgba(96, 165, 250, 0.1)', color: '#60a5fa', border: 'rgba(96, 165, 250, 0.2)' };
            default: return { bg: 'gray', color: 'white' };
        }
    };

    return (
        <div className="supplier-invoices-page">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
                <div>
                    <h2 className="page-title" style={{ margin: 0 }}>Supplier Invoices</h2>
                    <p style={{ fontSize: '0.85rem', color: 'var(--admin-text-muted)' }}>Track bills, track due dates, and manage supplier payments.</p>
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                    <button className="bb-btn bb-btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Download size={18} /> Export List
                    </button>
                    <button className="bb-btn bb-btn-gold" onClick={() => setShowModal(true)} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Plus size={18} /> New Invoice
                    </button>
                </div>
            </div>

            {/* Invoices Summary Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '25px' }}>
                <div className="stat-card" style={{ padding: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: '#f59e0b', marginBottom: '10px' }}>
                        <Clock size={20} />
                        <span style={{ fontSize: '0.75rem', padding: '2px 8px', borderRadius: '10px', background: 'rgba(245, 158, 11, 0.1)' }}>Pending</span>
                    </div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>₹37,400</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--admin-text-muted)' }}>Awaiting Payment</div>
                </div>
                <div className="stat-card" style={{ padding: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: '#f87171', marginBottom: '10px' }}>
                        <AlertCircle size={20} />
                        <span style={{ fontSize: '0.75rem', padding: '2px 8px', borderRadius: '10px', background: 'rgba(248, 113, 113, 0.1)' }}>Overdue</span>
                    </div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>₹12,400</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--admin-text-muted)' }}>Immediate Action</div>
                </div>
                <div className="stat-card" style={{ padding: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: '#4ade80', marginBottom: '10px' }}>
                        <CheckCircle size={20} />
                        <span style={{ fontSize: '0.75rem', padding: '2px 8px', borderRadius: '10px', background: 'rgba(74, 222, 128, 0.1)' }}>Paid</span>
                    </div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>₹4,50,000</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--admin-text-muted)' }}>This Month</div>
                </div>
                <div className="stat-card" style={{ padding: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--admin-accent)', marginBottom: '10px' }}>
                        <Receipt size={20} />
                        <span style={{ fontSize: '0.75rem', padding: '2px 8px', borderRadius: '10px', background: 'rgba(255, 215, 0, 0.1)' }}>Total</span>
                    </div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>₹4,99,800</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--admin-text-muted)' }}>Gross Invoiced</div>
                </div>
            </div>

            {/* Invoices Table */}
            <div className="content-card" style={{ padding: 0 }}>
                <div style={{ padding: '20px', borderBottom: '1px solid var(--admin-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', gap: '20px' }}>
                        <span onClick={() => setActiveTab('all')} style={{ cursor: 'pointer', fontSize: '0.9rem', fontWeight: activeTab === 'all' ? 'bold' : 'normal', color: activeTab === 'all' ? 'var(--admin-accent)' : 'var(--admin-text-muted)' }}>All Invoices</span>
                        <span onClick={() => setActiveTab('pending')} style={{ cursor: 'pointer', fontSize: '0.9rem', fontWeight: activeTab === 'pending' ? 'bold' : 'normal', color: activeTab === 'pending' ? 'var(--admin-accent)' : 'var(--admin-text-muted)' }}>Awaiting Payment</span>
                        <span onClick={() => setActiveTab('overdue')} style={{ cursor: 'pointer', fontSize: '0.9rem', fontWeight: activeTab === 'overdue' ? 'bold' : 'normal', color: activeTab === 'overdue' ? 'var(--admin-accent)' : 'var(--admin-text-muted)' }}>Overdue</span>
                    </div>
                    <div style={{ position: 'relative' }}>
                        <Search size={16} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--admin-text-muted)' }} />
                        <input type="text" placeholder="Search supplier..." className="admin-input" style={{ paddingLeft: '35px', fontSize: '0.85rem', width: '250px' }} />
                    </div>
                </div>
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid var(--admin-border)' }}>
                                <th style={{ padding: '15px', textAlign: 'left', color: 'var(--admin-text-muted)', fontSize: '0.8rem' }}>Invoice ID</th>
                                <th style={{ padding: '15px', textAlign: 'left', color: 'var(--admin-text-muted)', fontSize: '0.8rem' }}>Supplier Name</th>
                                <th style={{ padding: '15px', textAlign: 'right', color: 'var(--admin-text-muted)', fontSize: '0.8rem' }}>Amount</th>
                                <th style={{ padding: '15px', textAlign: 'center', color: 'var(--admin-text-muted)', fontSize: '0.8rem' }}>Due Date</th>
                                <th style={{ padding: '15px', textAlign: 'center', color: 'var(--admin-text-muted)', fontSize: '0.8rem' }}>Status</th>
                                <th style={{ padding: '15px', textAlign: 'right', color: 'var(--admin-text-muted)', fontSize: '0.8rem' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {invoices.map((inv) => {
                                const st = getStatusStyle(inv.status);
                                return (
                                    <tr key={inv.id} style={{ borderBottom: '1px solid var(--admin-border)' }}>
                                        <td style={{ padding: '15px', fontSize: '0.9rem', fontWeight: '500' }}>{inv.id}</td>
                                        <td style={{ padding: '15px', fontSize: '0.9rem' }}>{inv.supplier}</td>
                                        <td style={{ padding: '15px', textAlign: 'right', fontWeight: 'bold' }}>₹{inv.amount.toLocaleString()}</td>
                                        <td style={{ padding: '15px', textAlign: 'center', fontSize: '0.9rem' }}>{inv.dueDate}</td>
                                        <td style={{ padding: '15px', textAlign: 'center' }}>
                                            <span style={{
                                                padding: '4px 10px', borderRadius: '12px', fontSize: '0.7rem', fontWeight: '600',
                                                background: st.bg, color: st.color, border: `1px solid ${st.border}`
                                            }}>
                                                {inv.status}
                                            </span>
                                        </td>
                                        <td style={{ padding: '15px', textAlign: 'right' }}>
                                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                                                {inv.status !== 'Paid' && (
                                                    <button className="bb-btn bb-btn-outline" style={{ fontSize: '0.7rem', padding: '4px 10px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                        <Check size={14} /> Pay
                                                    </button>
                                                )}
                                                <button className="icon-btn" style={{ background: 'none', border: 'none', color: 'var(--admin-text-muted)', cursor: 'pointer' }}>
                                                    <MoreVertical size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Add Invoice Modal */}
            {showModal && (
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
                    <div className="content-card" style={{ width: '500px', padding: '30px', position: 'relative' }}>
                        <button onClick={() => setShowModal(false)} style={{ position: 'absolute', right: '20px', top: '20px', background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}>
                            <X size={20} />
                        </button>
                        <h3 style={{ marginBottom: '25px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <Receipt size={22} color="var(--admin-accent)" /> Add Supplier Invoice
                        </h3>
                        <form style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <div className="form-group">
                                <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '8px', color: 'var(--admin-text-muted)' }}>Select Supplier</label>
                                <select className="admin-input" style={{ width: '100%' }}>
                                    <option>Search/Select Supplier</option>
                                    <option>L'Oréal Professional</option>
                                    <option>Schwarzkopf India</option>
                                </select>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                                <div className="form-group">
                                    <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '8px', color: 'var(--admin-text-muted)' }}>Amount</label>
                                    <div style={{ position: 'relative' }}>
                                        <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', fontWeight: 'bold' }}>₹</span>
                                        <input type="number" className="admin-input" style={{ width: '100%', paddingLeft: '25px' }} placeholder="0.00" />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '8px', color: 'var(--admin-text-muted)' }}>Due Date</label>
                                    <input type="date" className="admin-input" style={{ width: '100%' }} />
                                </div>
                            </div>
                            <div className="form-group">
                                <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '8px', color: 'var(--admin-text-muted)' }}>Notes / Remark</label>
                                <textarea className="admin-input" style={{ width: '100%', height: '80px', resize: 'none' }} placeholder="Invoice reference number or notes..."></textarea>
                            </div>
                            <div style={{ display: 'flex', gap: '12px', marginTop: '10px' }}>
                                <button type="button" className="bb-btn bb-btn-outline" onClick={() => setShowModal(false)} style={{ flex: 1 }}>Discard</button>
                                <button type="button" className="bb-btn bb-btn-gold" style={{ flex: 1 }}>Save Invoice</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FinanceSupplierInvoices;
