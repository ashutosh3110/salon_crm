import React, { useState, useEffect } from 'react';
import {
    Wallet, Landmark, ArrowUpRight, ArrowDownRight,
    RefreshCw, ShieldCheck, AlertTriangle, Lock,
    ChevronRight, Save, History, Calendar, User
} from 'lucide-react';

const FinanceCashBank = () => {
    // UI State
    const [isLocked, setIsLocked] = useState(false);
    const [lastReconciled, setLastReconciled] = useState("Today, 10:30 AM");

    // System Data (Read-only values, usually from backend)
    const systemValues = {
        openingCash: 5000,
        cashSales: 12500,
        cashExpenses: 2850,
        openingBank: 125000,
        onlineSales: 45000,
        bankExpenses: 15400,
    };

    // Calculated System Balances
    const systemCashBalance = systemValues.openingCash + systemValues.cashSales - systemValues.cashExpenses;
    const systemBankBalance = systemValues.openingBank + systemValues.onlineSales - systemValues.bankExpenses;

    // Reconciliation Input State
    const [actualCash, setActualCash] = useState('');
    const [actualBank, setActualBank] = useState('');
    const [remarks, setRemarks] = useState('');

    // Differences
    const cashDiff = actualCash !== '' ? Number(actualCash) - systemCashBalance : 0;
    const bankDiff = actualBank !== '' ? Number(actualBank) - systemBankBalance : 0;

    const handleSave = () => {
        // Logic for saving reconciliation
        setIsLocked(true);
        alert("Reconciliation saved and locked for today!");
    };

    return (
        <div className="finance-cash-bank-page">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
                <div>
                    <h2 className="page-title" style={{ margin: 0 }}>Cash & Bank Reconciliation</h2>
                    <p style={{ fontSize: '0.85rem', color: 'var(--admin-text-muted)' }}>Validate system balances with actual physical cash and bank statements.</p>
                </div>
                <div style={{ display: 'flex', gap: '15px' }}>
                    <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <span style={{ fontSize: '0.7rem', color: 'var(--admin-text-muted)' }}>Status</span>
                        <span style={{ fontSize: '0.85rem', fontWeight: 'bold', color: isLocked ? '#4ade80' : '#f59e0b', display: 'flex', alignItems: 'center', gap: '4px' }}>
                            {isLocked ? <><Lock size={14} /> Day Locked</> : <><RefreshCw size={14} className="spin" /> Awaiting Reconciliation</>}
                        </span>
                    </div>
                </div>
            </div>

            {/* 1. Summary Cards (Auto-calculated) */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '30px' }}>
                <div className="stat-card" style={{ padding: '20px', borderLeft: '4px solid #4ade80' }}>
                    <div style={{ color: 'var(--admin-text-muted)', fontSize: '0.8rem', marginBottom: '8px' }}>Cash in Hand (System)</div>
                    <div style={{ fontSize: '1.6rem', fontWeight: 'bold' }}>₹{systemCashBalance.toLocaleString()}</div>
                    <div style={{ fontSize: '0.7rem', color: '#4ade80', marginTop: '5px' }}>Auto-calculated</div>
                </div>
                <div className="stat-card" style={{ padding: '20px', borderLeft: '4px solid #60a5fa' }}>
                    <div style={{ color: 'var(--admin-text-muted)', fontSize: '0.8rem', marginBottom: '8px' }}>Bank Balance (System)</div>
                    <div style={{ fontSize: '1.6rem', fontWeight: 'bold' }}>₹{systemBankBalance.toLocaleString()}</div>
                    <div style={{ fontSize: '0.7rem', color: '#60a5fa', marginTop: '5px' }}>Online + UPI</div>
                </div>
                <div className="stat-card" style={{ padding: '20px' }}>
                    <div style={{ color: 'var(--admin-text-muted)', fontSize: '0.8rem', marginBottom: '8px' }}>Today's Cash Sales</div>
                    <div style={{ fontSize: '1.6rem', fontWeight: 'bold' }}>₹{systemValues.cashSales.toLocaleString()}</div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--admin-text-muted)', marginTop: '5px' }}>From POS Invoices</div>
                </div>
                <div className="stat-card" style={{ padding: '20px' }}>
                    <div style={{ color: 'var(--admin-text-muted)', fontSize: '0.8rem', marginBottom: '8px' }}>Today's Online Sales</div>
                    <div style={{ fontSize: '1.6rem', fontWeight: 'bold' }}>₹{systemValues.onlineSales.toLocaleString()}</div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--admin-text-muted)', marginTop: '5px' }}>Card / GPay / PhonePe</div>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '25px', marginBottom: '30px' }}>
                {/* 2. Cash Summary (Detail Box) */}
                <div className="content-card" style={{ padding: '25px' }}>
                    <h3 style={{ fontSize: '1rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <Wallet size={18} color="var(--admin-accent)" /> Detailed Cash Summary
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '12px', borderBottom: '1px dashed var(--admin-border)' }}>
                            <span style={{ color: 'var(--admin-text-muted)' }}>Opening Cash Balance</span>
                            <span style={{ fontWeight: '600' }}>₹{systemValues.openingCash.toLocaleString()}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '12px', borderBottom: '1px dashed var(--admin-border)' }}>
                            <span style={{ color: 'var(--admin-text-muted)' }}>Cash Sales (POS)</span>
                            <span style={{ fontWeight: '600', color: '#4ade80' }}>+ ₹{systemValues.cashSales.toLocaleString()}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '12px', borderBottom: '1px dashed var(--admin-border)' }}>
                            <span style={{ color: 'var(--admin-text-muted)' }}>Cash Expenses (Petty Cash)</span>
                            <span style={{ fontWeight: '600', color: '#f87171' }}>- ₹{systemValues.cashExpenses.toLocaleString()}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '5px' }}>
                            <span style={{ fontWeight: 'bold' }}>System Cash Balance</span>
                            <span style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>₹{systemCashBalance.toLocaleString()}</span>
                        </div>
                    </div>
                </div>

                {/* 3. Bank Summary (Detail Box) */}
                <div className="content-card" style={{ padding: '25px' }}>
                    <h3 style={{ fontSize: '1rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <Landmark size={18} color="#60a5fa" /> Detailed Bank Summary
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '12px', borderBottom: '1px dashed var(--admin-border)' }}>
                            <span style={{ color: 'var(--admin-text-muted)' }}>Opening Bank Balance</span>
                            <span style={{ fontWeight: '600' }}>₹{systemValues.openingBank.toLocaleString()}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '12px', borderBottom: '1px dashed var(--admin-border)' }}>
                            <span style={{ color: 'var(--admin-text-muted)' }}>Online Payments (UPI/Card)</span>
                            <span style={{ fontWeight: '600', color: '#4ade80' }}>+ ₹{systemValues.onlineSales.toLocaleString()}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '12px', borderBottom: '1px dashed var(--admin-border)' }}>
                            <span style={{ color: 'var(--admin-text-muted)' }}>Bank Expenses (Supplier/Bills)</span>
                            <span style={{ fontWeight: '600', color: '#f87171' }}>- ₹{systemValues.bankExpenses.toLocaleString()}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '5px' }}>
                            <span style={{ fontWeight: 'bold' }}>System Bank Balance</span>
                            <span style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>₹{systemBankBalance.toLocaleString()}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* 4. Reconciliation Section (Admin Only Interaction) */}
            <div className={`content-card ${isLocked ? 'locked-section' : ''}`} style={{ padding: '30px', position: 'relative' }}>
                {isLocked && (
                    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.4)', borderRadius: '12px', zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <div style={{ background: 'var(--admin-bg-sidebar)', padding: '15px 30px', borderRadius: '12px', border: '1px solid var(--admin-border)', textAlign: 'center' }}>
                            <Lock size={32} color="#4ade80" style={{ marginBottom: '10px' }} />
                            <h4 style={{ margin: 0 }}>Reconciliation Locked</h4>
                            <p style={{ margin: '5px 0 0 0', fontSize: '0.85rem', color: 'var(--admin-text-muted)' }}>Data for today has been finalized.</p>
                        </div>
                    </div>
                )}

                <h3 style={{ fontSize: '1.2rem', marginBottom: '25px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <ShieldCheck size={22} color="var(--admin-accent)" /> Daily Reconciliation (Input Area)
                </h3>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
                    {/* Cash Recon */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div className="form-group">
                            <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '8px', color: 'var(--admin-text-muted)' }}>System Cash Balance (Read-only)</label>
                            <input type="text" className="admin-input" style={{ width: '100%', background: 'rgba(255,255,255,0.03)', borderStyle: 'dashed' }} value={`₹ ${systemCashBalance.toLocaleString()}`} readOnly />
                        </div>
                        <div className="form-group">
                            <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '8px', fontWeight: '600' }}>Actual Cash Counted (Physical Input)</label>
                            <div style={{ position: 'relative' }}>
                                <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', fontWeight: 'bold' }}>₹</span>
                                <input
                                    type="number"
                                    className="admin-input"
                                    style={{ width: '100%', paddingLeft: '25px', borderColor: cashDiff !== 0 ? (cashDiff > 0 ? '#4ade80' : '#f87171') : 'var(--admin-border)' }}
                                    placeholder="Enter physical cash amount"
                                    value={actualCash}
                                    onChange={(e) => setActualCash(e.target.value)}
                                    disabled={isLocked}
                                />
                            </div>
                        </div>
                        {actualCash !== '' && (
                            <div style={{
                                padding: '12px',
                                borderRadius: '8px',
                                background: cashDiff === 0 ? 'rgba(74, 222, 128, 0.05)' : (cashDiff > 0 ? 'rgba(74, 222, 128, 0.1)' : 'rgba(248, 113, 113, 0.1)'),
                                border: `1px solid ${cashDiff === 0 ? 'transparent' : (cashDiff > 0 ? '#4ade80' : '#f87171')}`,
                                display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                            }}>
                                <span style={{ fontSize: '0.85rem' }}>Cash Difference:</span>
                                <span style={{ fontWeight: 'bold', color: cashDiff >= 0 ? '#4ade80' : '#f87171' }}>
                                    {cashDiff === 0 ? 'Matched ✓' : (cashDiff > 0 ? `+ ₹${cashDiff.toLocaleString()} (Surplus)` : `- ₹${Math.abs(cashDiff).toLocaleString()} (Shortage)`)}
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Bank Recon */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div className="form-group">
                            <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '8px', color: 'var(--admin-text-muted)' }}>System Bank Balance (Read-only)</label>
                            <input type="text" className="admin-input" style={{ width: '100%', background: 'rgba(255,255,255,0.03)', borderStyle: 'dashed' }} value={`₹ ${systemBankBalance.toLocaleString()}`} readOnly />
                        </div>
                        <div className="form-group">
                            <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '8px', fontWeight: '600' }}>Actual Bank Balance (Statement Input)</label>
                            <div style={{ position: 'relative' }}>
                                <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', fontWeight: 'bold' }}>₹</span>
                                <input
                                    type="number"
                                    className="admin-input"
                                    style={{ width: '100%', paddingLeft: '25px', borderColor: bankDiff !== 0 ? (bankDiff > 0 ? '#4ade80' : '#f87171') : 'var(--admin-border)' }}
                                    placeholder="Enter actual bank balance"
                                    value={actualBank}
                                    onChange={(e) => setActualBank(e.target.value)}
                                    disabled={isLocked}
                                />
                            </div>
                        </div>
                        {actualBank !== '' && (
                            <div style={{
                                padding: '12px',
                                borderRadius: '8px',
                                background: bankDiff === 0 ? 'rgba(74, 222, 128, 0.05)' : (bankDiff > 0 ? 'rgba(74, 222, 128, 0.1)' : 'rgba(248, 113, 113, 0.1)'),
                                border: `1px solid ${bankDiff === 0 ? 'transparent' : (bankDiff > 0 ? '#4ade80' : '#f87171')}`,
                                display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                            }}>
                                <span style={{ fontSize: '0.85rem' }}>Bank Difference:</span>
                                <span style={{ fontWeight: 'bold', color: bankDiff >= 0 ? '#4ade80' : '#f87171' }}>
                                    {bankDiff === 0 ? 'Matched ✓' : (bankDiff > 0 ? `+ ₹${bankDiff.toLocaleString()} (Surplus)` : `- ₹${Math.abs(bankDiff).toLocaleString()} (Shortage)`)}
                                </span>
                            </div>
                        )}
                    </div>
                </div>

                {/* 5. Remarks & Approval */}
                <div style={{ marginTop: '30px', paddingTop: '30px', borderTop: '1px solid var(--admin-border)' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '30px' }}>
                        <div className="form-group">
                            <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '8px', color: 'var(--admin-text-muted)' }}>Remarks / Reason for Difference</label>
                            <textarea
                                className="admin-input"
                                style={{ width: '100%', height: '80px', resize: 'none' }}
                                placeholder="If there is a difference, please provide a justification..."
                                value={remarks}
                                onChange={(e) => setRemarks(e.target.value)}
                                disabled={isLocked}
                            ></textarea>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', background: 'rgba(255,255,255,0.02)', padding: '20px', borderRadius: '12px', border: '1px solid var(--admin-border)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.85rem' }}>
                                <User size={16} color="var(--admin-accent)" />
                                <span style={{ color: 'var(--admin-text-muted)' }}>Approved By:</span>
                                <span style={{ fontWeight: '600' }}>Admin (Super User)</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.85rem' }}>
                                <Calendar size={16} color="var(--admin-accent)" />
                                <span style={{ color: 'var(--admin-text-muted)' }}>Date:</span>
                                <span style={{ fontWeight: '600' }}>{new Date().toLocaleDateString()}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 6. Actions */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '15px', marginTop: '30px' }}>
                    <button className="bb-btn bb-btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '8px' }} disabled={isLocked}>
                        <History size={18} /> View History
                    </button>
                    <button
                        className="bb-btn bb-btn-gold"
                        style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 30px' }}
                        onClick={handleSave}
                        disabled={isLocked || (actualCash === '' && actualBank === '')}
                    >
                        <Save size={18} /> Save Reconciliation & Lock Day
                    </button>
                </div>
            </div>

            {/* Error States or Warning Messages */}
            {(cashDiff !== 0 || bankDiff !== 0) && !isLocked && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'rgba(245, 158, 11, 0.1)', border: '1px solid rgba(245, 158, 11, 0.2)', padding: '15px', borderRadius: '12px', marginTop: '20px' }}>
                    <AlertTriangle color="#f59e0b" size={20} />
                    <p style={{ margin: 0, fontSize: '0.9rem', color: '#f59e0b' }}>
                        <strong>Balance Mismatch!</strong> Please double-check your physical cash and bank statement. If the difference is valid, mention the reason in the remarks.
                    </p>
                </div>
            )}
        </div>
    );
};

export default FinanceCashBank;
