import React, { useState } from 'react';
import { FileText, Download, Printer, Eye, Search, Filter, Calendar } from 'lucide-react';

const PosInvoices = () => {
    // Mock data for display
    const mockInvoices = [
        { id: '#INV-8842', date: '17 Feb 2026', client: 'Anita Sharma', outlet: 'Andheri West', amount: '₹1,250', mode: 'UPI', status: 'Paid' },
        { id: '#INV-8841', date: '17 Feb 2026', client: 'Rajesh Kumar', outlet: 'Bandra Main', amount: '₹850', mode: 'Cash', status: 'Paid' },
        { id: '#INV-8840', date: '16 Feb 2026', client: 'Priya Singh', outlet: 'Juhu Studio', amount: '₹2,400', mode: 'Card', status: 'Paid' },
        { id: '#INV-8839', date: '16 Feb 2026', client: 'Amit Patel', outlet: 'Andheri West', amount: '₹600', mode: 'UPI', status: 'Paid' },
        { id: '#INV-8838', date: '16 Feb 2026', client: 'Suresh Raina', outlet: 'Powai Branch', amount: '₹1,550', mode: 'Cash', status: 'Paid' },
    ];

    return (
        <div className="pos-invoices">
            <div className="card-header" style={{ marginBottom: '25px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 className="card-title">All Invoices</h2>
                <div style={{ display: 'flex', gap: '12px' }}>
                    <div style={{ position: 'relative' }}>
                        <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--admin-text-muted)' }} />
                        <input
                            type="text"
                            placeholder="Invoice No. or Client"
                            style={{
                                padding: '10px 10px 10px 40px',
                                background: 'var(--admin-bg-sidebar)',
                                border: '1px solid var(--admin-border)',
                                borderRadius: '8px',
                                color: '#fff',
                                width: '220px',
                                fontSize: '0.9rem'
                            }}
                        />
                    </div>
                    <button className="bb-btn bb-btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem' }}>
                        <Calendar size={16} /> Date Range
                    </button>
                </div>
            </div>

            <div className="content-card" style={{ padding: 0, overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid var(--admin-border)' }}>
                            <th style={{ padding: '15px 20px', textAlign: 'left', color: 'var(--admin-text-muted)', fontSize: '0.85rem' }}>Invoice Number</th>
                            <th style={{ padding: '15px 20px', textAlign: 'left', color: 'var(--admin-text-muted)', fontSize: '0.85rem' }}>Date</th>
                            <th style={{ padding: '15px 20px', textAlign: 'left', color: 'var(--admin-text-muted)', fontSize: '0.85rem' }}>Outlet</th>
                            <th style={{ padding: '15px 20px', textAlign: 'left', color: 'var(--admin-text-muted)', fontSize: '0.85rem' }}>Amount</th>
                            <th style={{ padding: '15px 20px', textAlign: 'left', color: 'var(--admin-text-muted)', fontSize: '0.85rem' }}>Payment Mode</th>
                            <th style={{ padding: '15px 20px', textAlign: 'right', color: 'var(--admin-text-muted)', fontSize: '0.85rem' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mockInvoices.map((inv, idx) => (
                            <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', transition: 'background 0.2s' }} className="hover-row">
                                <td style={{ padding: '15px 20px' }}>
                                    <div style={{ fontWeight: '600', color: 'var(--admin-accent)' }}>{inv.id}</div>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--admin-text-muted)' }}>{inv.client}</div>
                                </td>
                                <td style={{ padding: '15px 20px', color: 'var(--admin-text-main)', fontSize: '0.9rem' }}>{inv.date}</td>
                                <td style={{ padding: '15px 20px', color: 'var(--admin-text-muted)', fontSize: '0.9rem' }}>{inv.outlet}</td>
                                <td style={{ padding: '15px 20px', color: '#4ade80', fontWeight: '700' }}>{inv.amount}</td>
                                <td style={{ padding: '15px 20px' }}>
                                    <span style={{
                                        padding: '4px 10px',
                                        borderRadius: '6px',
                                        fontSize: '0.75rem',
                                        background: 'rgba(255,255,255,0.05)',
                                        color: 'var(--admin-text-main)',
                                        border: '1px solid var(--admin-border)'
                                    }}>
                                        {inv.mode}
                                    </span>
                                </td>
                                <td style={{ padding: '15px 20px', textAlign: 'right' }}>
                                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                                        <button className="header-icon-btn" title="View"><Eye size={16} /></button>
                                        <button className="header-icon-btn" title="Print"><Printer size={16} /></button>
                                        <button className="header-icon-btn" title="Download"><Download size={16} /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <style jsx>{`
                .hover-row:hover {
                    background: rgba(255,255,255,0.02);
                }
            `}</style>
        </div>
    );
};

export default PosInvoices;
