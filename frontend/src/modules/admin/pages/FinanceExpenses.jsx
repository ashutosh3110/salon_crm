import React, { useState } from 'react';
import {
    Plus, Search, Filter, Download, MoreVertical,
    Wallet, TrendingDown, ArrowDownRight, Tag,
    Calendar, MapPin, X, Receipt, DollarSign
} from 'lucide-react';

const FinanceExpenses = () => {
    const [showModal, setShowModal] = useState(false);

    const expenses = [
        { id: 1, date: '2026-02-18', category: 'Cleaning Supplies', amount: 450, outlet: 'Main Branch - Andheri', mode: 'Cash' },
        { id: 2, date: '2026-02-18', category: 'Tea & Snacks', amount: 120, outlet: 'Main Branch - Andheri', mode: 'Cash' },
        { id: 3, date: '2026-02-17', category: 'Internet Bill', amount: 1500, outlet: 'Bandra Center', mode: 'Bank' },
        { id: 4, date: '2026-02-17', category: 'Stationery', amount: 350, outlet: 'Main Branch - Andheri', mode: 'Cash' },
        { id: 5, date: '2026-02-16', category: 'Electricity', amount: 8500, outlet: 'Bandra Center', mode: 'Bank' },
    ];

    const categories = ['Cleaning Supplies', 'Tea & Snacks', 'Electricity', 'Stationery', 'Rent', 'Repairs', 'Marketing', 'Other'];
    const outlets = ['Main Branch - Andheri', 'Bandra Center', 'Juhu Studio'];

    return (
        <div className="finance-expenses-page">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
                <div>
                    <h2 className="page-title" style={{ margin: 0 }}>Business Expenses (Petty Cash)</h2>
                    <p style={{ fontSize: '0.85rem', color: 'var(--admin-text-muted)' }}>Manage daily cash outflows and operational expenditures.</p>
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                    <button className="bb-btn bb-btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Download size={18} /> Daily Report
                    </button>
                    <button className="bb-btn bb-btn-gold" onClick={() => setShowModal(true)} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Plus size={18} /> Record Expense
                    </button>
                </div>
            </div>

            {/* Expense Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '25px' }}>
                <div className="stat-card" style={{ padding: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: '#f87171', marginBottom: '10px' }}>
                        <TrendingDown size={20} />
                        <span style={{ fontSize: '0.75rem', fontWeight: 'bold' }}>-15% Today</span>
                    </div>
                    <div style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>₹2,420</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--admin-text-muted)' }}>Today's Total Outflow</div>
                </div>
                <div className="stat-card" style={{ padding: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--admin-accent)', marginBottom: '10px' }}>
                        <Wallet size={20} />
                    </div>
                    <div style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>₹42,850</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--admin-text-muted)' }}>Available Petty Cash</div>
                </div>
                <div className="stat-card" style={{ padding: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: '#60a5fa', marginBottom: '10px' }}>
                        <Tag size={20} />
                    </div>
                    <div style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>Cleaning</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--admin-text-muted)' }}>Highest Expense Category</div>
                </div>
            </div>

            {/* Expense Table */}
            <div className="content-card" style={{ padding: 0 }}>
                <div style={{ padding: '20px', borderBottom: '1px solid var(--admin-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{ fontSize: '1rem', margin: 0 }}>Transaction History</h3>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <div style={{ position: 'relative' }}>
                            <Search size={16} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--admin-text-muted)' }} />
                            <input type="text" placeholder="Search expenses..." className="admin-input" style={{ paddingLeft: '35px', fontSize: '0.8rem', width: '200px' }} />
                        </div>
                        <button className="bb-btn bb-btn-outline" style={{ padding: '8px 12px' }}><Filter size={16} /></button>
                    </div>
                </div>
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid var(--admin-border)' }}>
                                <th style={{ padding: '15px', textAlign: 'left', color: 'var(--admin-text-muted)', fontSize: '0.8rem' }}>Date</th>
                                <th style={{ padding: '15px', textAlign: 'left', color: 'var(--admin-text-muted)', fontSize: '0.8rem' }}>Category</th>
                                <th style={{ padding: '15px', textAlign: 'left', color: 'var(--admin-text-muted)', fontSize: '0.8rem' }}>Outlet</th>
                                <th style={{ padding: '15px', textAlign: 'center', color: 'var(--admin-text-muted)', fontSize: '0.8rem' }}>Mode</th>
                                <th style={{ padding: '15px', textAlign: 'right', color: 'var(--admin-text-muted)', fontSize: '0.8rem' }}>Amount</th>
                                <th style={{ padding: '15px', textAlign: 'right', color: 'var(--admin-text-muted)', fontSize: '0.8rem' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {expenses.map((exp) => (
                                <tr key={exp.id} style={{ borderBottom: '1px solid var(--admin-border)' }}>
                                    <td style={{ padding: '15px', fontSize: '0.9rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <Calendar size={14} color="var(--admin-text-muted)" />
                                            {exp.date}
                                        </div>
                                    </td>
                                    <td style={{ padding: '15px' }}>
                                        <span style={{ padding: '4px 8px', borderRadius: '4px', background: 'rgba(255,255,255,0.05)', fontSize: '0.8rem' }}>
                                            {exp.category}
                                        </span>
                                    </td>
                                    <td style={{ padding: '15px', fontSize: '0.85rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                            <MapPin size={14} color="var(--admin-text-muted)" />
                                            {exp.outlet}
                                        </div>
                                    </td>
                                    <td style={{ padding: '15px', textAlign: 'center' }}>
                                        <span style={{ fontSize: '0.75rem', opacity: 0.8 }}>{exp.mode}</span>
                                    </td>
                                    <td style={{ padding: '15px', textAlign: 'right', fontWeight: 'bold', color: '#f87171' }}>
                                        - ₹{exp.amount.toLocaleString()}
                                    </td>
                                    <td style={{ padding: '15px', textAlign: 'right' }}>
                                        <button className="icon-btn" style={{ background: 'none', border: 'none', color: 'var(--admin-text-muted)', cursor: 'pointer' }}>
                                            <MoreVertical size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Add Expense Modal */}
            {showModal && (
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
                    <div className="content-card" style={{ width: '480px', padding: '30px', position: 'relative' }}>
                        <button onClick={() => setShowModal(false)} style={{ position: 'absolute', right: '20px', top: '20px', background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}>
                            <X size={20} />
                        </button>
                        <h3 style={{ marginBottom: '25px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <TrendingDown size={22} color="#f87171" /> Record New Expense
                        </h3>
                        <form style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                                <div className="form-group">
                                    <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '6px', color: 'var(--admin-text-muted)' }}>Date</label>
                                    <input type="date" className="admin-input" style={{ width: '100%' }} defaultValue={new Date().toISOString().split('T')[0]} />
                                </div>
                                <div className="form-group">
                                    <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '6px', color: 'var(--admin-text-muted)' }}>Amount</label>
                                    <div style={{ position: 'relative' }}>
                                        <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', fontWeight: 'bold' }}>₹</span>
                                        <input type="number" className="admin-input" style={{ width: '100%', paddingLeft: '25px' }} placeholder="0" />
                                    </div>
                                </div>
                            </div>

                            <div className="form-group">
                                <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '6px', color: 'var(--admin-text-muted)' }}>Category</label>
                                <select className="admin-input" style={{ width: '100%' }}>
                                    <option>Select Category</option>
                                    {categories.map(c => <option key={c}>{c}</option>)}
                                </select>
                            </div>

                            <div className="form-group">
                                <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '6px', color: 'var(--admin-text-muted)' }}>Outlet</label>
                                <select className="admin-input" style={{ width: '100%' }}>
                                    <option>Select Outlet</option>
                                    {outlets.map(o => <option key={o}>{o}</option>)}
                                </select>
                            </div>

                            <div className="form-group">
                                <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '6px', color: 'var(--admin-text-muted)' }}>Payment Mode</label>
                                <div style={{ display: 'flex', gap: '10px' }}>
                                    <label style={{ flex: 1, padding: '10px', border: '1px solid var(--admin-border)', borderRadius: '8px', cursor: 'pointer', textAlign: 'center', fontSize: '0.85rem' }}>
                                        <input type="radio" name="mode" value="Cash" defaultChecked style={{ marginRight: '8px' }} /> Cash
                                    </label>
                                    <label style={{ flex: 1, padding: '10px', border: '1px solid var(--admin-border)', borderRadius: '8px', cursor: 'pointer', textAlign: 'center', fontSize: '0.85rem' }}>
                                        <input type="radio" name="mode" value="Bank" style={{ marginRight: '8px' }} /> Bank Transfer
                                    </label>
                                </div>
                            </div>

                            <button type="button" className="bb-btn bb-btn-gold" style={{ marginTop: '10px', width: '100%' }}>
                                Save Transaction
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FinanceExpenses;
