import React, { useState } from 'react';
import {
    Wallet, Landmark, RefreshCw, Lock,
    ShieldCheck, AlertTriangle, Save, History,
    Calendar, User, CalendarDays, Search, Filter,
    Plus, MoreHorizontal, Clock, CheckCircle2,
    ChevronLeft, ChevronRight, Users, Settings,
    Printer, Download, Grid, List as ListIcon,
    UserPlus, Scissors, Sparkles, ChevronDown
} from 'lucide-react';

const BookingManagement = () => {
    // Tab Management
    const [activeTab, setActiveTab] = useState('appointments');
    const [viewMode, setViewMode] = useState('scheduler'); // scheduler vs list
    const [showViewDropdown, setShowViewDropdown] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [isLocked, setIsLocked] = useState(false);

    // Mock Data for Staff
    const staffMembers = [
        { id: 1, name: 'Jill', role: 'Senior Stylist', color: '#6366f1' },
        { id: 2, name: 'Sansa', role: 'Hair Expert', color: '#0ea5e9' },
        { id: 3, name: 'Bob', role: 'Massagist', color: '#3b82f6' },
        { id: 4, name: 'Elias', role: 'Beautician', color: '#f59e0b' },
        { id: 5, name: 'Hasib', role: 'Nail Artist', color: '#ef4444' },
        { id: 6, name: 'Pierre', role: 'Barber', color: '#8b5cf6' },
        { id: 7, name: 'George', role: 'Master Barber', color: '#10b981' },
        { id: 8, name: 'Harold', role: 'Consultant', color: '#84cc16' },
    ];

    // Mock Data for Appointments
    const appointments = [
        { id: 101, staffId: 1, time: '10:00 AM', duration: 60, client: 'Alice Smith', service: 'Hair Coloring', status: 'Booked' },
        { id: 102, staffId: 1, time: '11:30 AM', duration: 45, client: 'Emma Brown', service: 'Haircut', status: 'Waiting' },
        { id: 103, staffId: 2, time: '10:00 AM', duration: 90, client: 'Olivia J.', service: 'Full Spa', status: 'Booked' },
        { id: 104, staffId: 3, time: '12:00 PM', duration: 60, client: 'John Doe', service: 'Head Massage', status: 'Waiting' },
        { id: 105, staffId: 4, time: '10:30 AM', duration: 45, client: 'Sophia W.', service: 'Facial', status: 'Booked' },
        { id: 106, staffId: 4, time: '11:30 AM', duration: 30, client: 'Mia K.', service: 'Eyebrows', status: 'Booked' },
        { id: 107, staffId: 6, time: '10:00 AM', duration: 45, client: 'Ryan G.', service: 'Beard Trim', status: 'Booked' },
        { id: 108, staffId: 6, time: '11:30 AM', duration: 75, client: 'Chris P.', service: 'Complete Grooming', status: 'Waiting' },
        { id: 109, staffId: 7, time: '10:30 AM', duration: 90, client: 'Mark R.', service: 'Hair Treatment', status: 'Booked' },
        { id: 110, staffId: 8, time: '10:00 AM', duration: 60, client: 'Tom H.', service: 'Consultation', status: 'Booked' },
    ];

    const timeSlots = [
        '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
        '12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM',
        '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM', '05:00 PM', '05:30 PM',
        '06:00 PM', '06:30 PM', '07:00 PM', '07:30 PM', '08:00 PM'
    ];

    // Status Colors based on Wedding/Salon Theme
    // Booked -> Gold Glow
    // Waiting -> Silver/White Outline
    const getStatusColor = (status) => {
        switch (status) {
            case 'Booked': return { bg: 'var(--admin-accent)', text: '#000', border: 'var(--admin-accent)', glow: '0 4px 15px rgba(255, 215, 0, 0.3)' };
            case 'Waiting': return { bg: 'rgba(255,255,255,0.05)', text: '#fff', border: 'rgba(255,255,255,0.2)', glow: 'none' };
            default: return { bg: 'gray', text: '#fff', border: 'gray', glow: 'none' };
        }
    };

    // Reconciliation State (Existing)
    const [actualCash, setActualCash] = useState('');
    const [actualBank, setActualBank] = useState('');
    const [remarks, setRemarks] = useState('');

    const systemData = {
        openingCash: 5000,
        cashSales: 12500,
        cashExpenses: 2850,
        openingBank: 125000,
        onlineSales: 45000,
        bankExpenses: 15400,
    };

    const systemCashBalance = systemData.openingCash + systemData.cashSales - systemData.cashExpenses;
    const systemBankBalance = systemData.openingBank + systemData.onlineSales - systemData.bankExpenses;

    const cashDiff = actualCash !== '' ? Number(actualCash) - systemCashBalance : 0;
    const bankDiff = actualBank !== '' ? Number(actualBank) - systemBankBalance : 0;

    return (
        <div className="booking-management-page">
            {/* Header Section */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <div>
                    <h2 className="page-title" style={{ margin: 0 }}>Booking Management</h2>
                    <p style={{ fontSize: '0.85rem', color: 'var(--admin-text-muted)' }}>Scheduler, Calendar, and Daily Closing.</p>
                </div>

                <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                    {/* Main Tab Toggle */}
                    <div style={{ display: 'flex', background: 'var(--admin-bg-sidebar)', padding: '4px', borderRadius: '10px', border: '1px solid var(--admin-border)' }}>
                        <button
                            onClick={() => setActiveTab('appointments')}
                            style={{
                                padding: '8px 16px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: '0.85rem',
                                background: activeTab === 'appointments' ? 'var(--admin-accent)' : 'transparent',
                                color: activeTab === 'appointments' ? '#000' : 'var(--admin-text-muted)',
                                fontWeight: '600', transition: 'all 0.3s ease'
                            }}
                        >
                            <CalendarDays size={16} style={{ marginRight: '6px', verticalAlign: 'text-bottom' }} /> Appointments
                        </button>
                        <button
                            onClick={() => setActiveTab('reconciliation')}
                            style={{
                                padding: '8px 16px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: '0.85rem',
                                background: activeTab === 'reconciliation' ? 'var(--admin-accent)' : 'transparent',
                                color: activeTab === 'reconciliation' ? '#000' : 'var(--admin-text-muted)',
                                fontWeight: '600', transition: 'all 0.3s ease'
                            }}
                        >
                            <ShieldCheck size={16} style={{ marginRight: '6px', verticalAlign: 'text-bottom' }} /> Daily Hisaab (Cash Tally)
                        </button>
                    </div>

                    <button className="bb-btn bb-btn-gold" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Plus size={18} /> New Appointment
                    </button>
                </div>
            </div>

            {activeTab === 'appointments' ? (
                <div className="scheduler-layout" style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '20px' }}>
                    {/* Left Sidebar (Like Image) */}
                    <div className="scheduler-sidebar">
                        {/* Mini Calendar Placeholder */}
                        <div className="content-card" style={{ padding: '15px', marginBottom: '20px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                                <span style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>June 2024</span>
                                <div style={{ display: 'flex', gap: '5px' }}>
                                    <ChevronLeft size={16} style={{ cursor: 'pointer' }} />
                                    <ChevronRight size={16} style={{ cursor: 'pointer' }} />
                                </div>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '5px', textAlign: 'center', fontSize: '0.75rem' }}>
                                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => <div key={d} style={{ color: 'var(--admin-text-muted)', fontWeight: 'bold' }}>{d}</div>)}
                                {[...Array(30)].map((_, i) => (
                                    <div key={i} style={{
                                        padding: '5px', borderRadius: '4px', cursor: 'pointer',
                                        background: i + 1 === 19 ? 'var(--admin-accent)' : 'transparent',
                                        color: i + 1 === 19 ? '#000' : '#fff'
                                    }}>
                                        {i + 1}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Staff / Professional Filter */}
                        <div className="content-card" style={{ padding: '15px' }}>
                            <h4 style={{ fontSize: '0.85rem', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <Users size={16} color="var(--admin-accent)" /> Professionals
                            </h4>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                {staffMembers.map(staff => (
                                    <div key={staff.id} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.85rem' }}>
                                        <div style={{ width: '12px', height: '12px', borderRadius: '3px', background: staff.color }}></div>
                                        <input type="checkbox" defaultChecked style={{ accentColor: staff.color }} />
                                        <span>{staff.name}</span>
                                    </div>
                                ))}
                            </div>
                            <button className="bb-btn bb-btn-outline" style={{ marginTop: '15px', width: '100%', fontSize: '0.75rem', padding: '6px' }}>
                                + Add / Edit Staff
                            </button>
                        </div>
                    </div>

                    {/* Main Scheduler Grid */}
                    <div className="scheduler-main content-card" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                        {/* Scheduler Toolbar */}
                        <div style={{ padding: '15px 20px', borderBottom: '1px solid var(--admin-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.02)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                <div style={{ display: 'flex', gap: '5px' }}>
                                    <button className="icon-btn-sm"><ChevronLeft size={16} /></button>
                                    <button className="bb-btn bb-btn-outline" style={{ padding: '4px 12px', fontSize: '0.8rem' }}>Today</button>
                                    <button className="icon-btn-sm"><ChevronRight size={16} /></button>
                                </div>
                                <span style={{ fontWeight: 'bold', fontSize: '1.1rem', marginRight: '10px' }}>June 16 - July 13, 2024</span>
                                <div style={{ position: 'relative' }}>
                                    <div
                                        onClick={() => setShowViewDropdown(!showViewDropdown)}
                                        style={{ display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem', color: 'var(--admin-text-main)' }}
                                    >
                                        <span style={{ textTransform: 'capitalize' }}>{viewMode} View</span>
                                        <ChevronDown size={16} />
                                    </div>

                                    {showViewDropdown && (
                                        <div style={{
                                            position: 'absolute', top: '120%', left: 0, background: 'var(--admin-bg-sidebar)',
                                            border: '1px solid var(--admin-border)', borderRadius: '8px', padding: '8px', zIndex: 100,
                                            minWidth: '150px', boxShadow: '0 10px 25px rgba(0,0,0,0.5)'
                                        }}>
                                            {['Monthly', 'Weekly', 'Daily'].map((mode) => (
                                                <div
                                                    key={mode}
                                                    onClick={() => { setViewMode(mode.toLowerCase()); setShowViewDropdown(false); }}
                                                    style={{
                                                        padding: '10px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.85rem',
                                                        background: viewMode === mode.toLowerCase() ? 'var(--admin-accent)' : 'transparent',
                                                        color: viewMode === mode.toLowerCase() ? '#000' : 'var(--admin-text-main)',
                                                        fontWeight: viewMode === mode.toLowerCase() ? 'bold' : 'normal',
                                                        marginBottom: '4px'
                                                    }}
                                                    className="dropdown-item-hover"
                                                >
                                                    {mode} View
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div style={{ display: 'flex', background: 'var(--admin-bg-sidebar)', padding: '2px', borderRadius: '6px', border: '1px solid var(--admin-border)' }}>
                                {['Scheduler', 'Day', '5 Days', 'Week', 'Month'].map(m => (
                                    <button
                                        key={m}
                                        onClick={() => setViewMode(m.toLowerCase())}
                                        style={{
                                            padding: '4px 10px', fontSize: '0.75rem', border: 'none', borderRadius: '4px', cursor: 'pointer',
                                            background: viewMode === m.toLowerCase() ? 'rgba(255,255,255,0.1)' : 'transparent',
                                            color: viewMode === m.toLowerCase() ? 'var(--admin-accent)' : 'var(--admin-text-muted)'
                                        }}
                                    >
                                        {m}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Grid Body */}
                        <div style={{ overflow: 'auto', flex: 1, position: 'relative' }}>
                            <table style={{ minWidth: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
                                <thead>
                                    <tr style={{ background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid var(--admin-border)' }}>
                                        <th style={{ width: '80px', padding: '12px', textAlign: 'center', color: 'var(--admin-text-muted)', fontSize: '0.75rem', borderRight: '1px solid var(--admin-border)' }}>Time</th>
                                        {staffMembers.map(staff => (
                                            <th key={staff.id} style={{ padding: '12px', borderRight: '1px solid var(--admin-border)', textAlign: 'center' }}>
                                                <div style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>{staff.name}</div>
                                                <div style={{ fontSize: '0.7rem', color: 'var(--admin-text-muted)', fontWeight: 'normal' }}>{staff.role}</div>
                                                <div style={{ height: '3px', width: '40px', background: staff.color, margin: '6px auto 0' }}></div>
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {timeSlots.map((time, idx) => (
                                        <tr key={idx} style={{ borderBottom: '1px solid var(--admin-border)' }}>
                                            <td style={{ padding: '10px', textAlign: 'center', fontSize: '0.75rem', color: 'var(--admin-text-muted)', borderRight: '1px solid var(--admin-border)', background: 'rgba(255,255,255,0.01)' }}>
                                                {time}
                                            </td>
                                            {staffMembers.map(staff => {
                                                // Find if an appointment exists for this staff at this time
                                                const appt = appointments.find(a => a.staffId === staff.id && a.time === time);
                                                const statusStyle = appt ? getStatusColor(appt.status) : null;

                                                return (
                                                    <td key={staff.id} style={{ padding: '4px', borderRight: '1px solid var(--admin-border)', position: 'relative', height: '60px', width: '150px' }}>
                                                        {appt && (
                                                            <div style={{
                                                                background: statusStyle.bg,
                                                                color: statusStyle.text,
                                                                border: `1px solid ${statusStyle.border}`,
                                                                borderRadius: '6px',
                                                                padding: '6px 8px',
                                                                fontSize: '0.75rem',
                                                                height: '100%',
                                                                boxShadow: statusStyle.glow,
                                                                display: 'flex',
                                                                flexDirection: 'column',
                                                                justifyContent: 'center',
                                                                cursor: 'pointer',
                                                                transition: 'transform 0.2s ease'
                                                            }}
                                                                className="appt-card-hover"
                                                            >
                                                                <div style={{ fontWeight: 'bold', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{appt.client}</div>
                                                                <div style={{ opacity: 0.8, fontSize: '0.7rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{appt.service}</div>
                                                                {appt.status === 'Waiting' && (
                                                                    <div style={{ position: 'absolute', top: '4px', right: '4px' }}>
                                                                        <Clock size={10} />
                                                                    </div>
                                                                )}
                                                            </div>
                                                        )}
                                                    </td>
                                                );
                                            })}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            ) : (
                // Reconciliation View (Existing)
                <div className="reconciliation-view fade-in">
                    {/* 1. Summary Cards */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '30px' }}>
                        <div className="stat-card" style={{ padding: '20px' }}>
                            <div style={{ color: 'var(--admin-text-muted)', fontSize: '0.75rem', marginBottom: '8px' }}>Cash as per Computer</div>
                            <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>₹{systemCashBalance.toLocaleString()}</div>
                            <div style={{ fontSize: '0.65rem', color: '#4ade80', marginTop: '5px' }}>Auto-calculated</div>
                        </div>
                        <div className="stat-card" style={{ padding: '20px' }}>
                            <div style={{ color: 'var(--admin-text-muted)', fontSize: '0.75rem', marginBottom: '8px' }}>Bank Balance (System)</div>
                            <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>₹{systemBankBalance.toLocaleString()}</div>
                            <div style={{ fontSize: '0.65rem', color: '#60a5fa', marginTop: '5px' }}>Online & Cards</div>
                        </div>
                        <div className="stat-card" style={{ padding: '20px' }}>
                            <div style={{ color: 'var(--admin-text-muted)', fontSize: '0.75rem', marginBottom: '8px' }}>Today's Cash Sales</div>
                            <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>₹{systemData.cashSales.toLocaleString()}</div>
                        </div>
                        <div className="stat-card" style={{ padding: '20px' }}>
                            <div style={{ color: 'var(--admin-text-muted)', fontSize: '0.75rem', marginBottom: '8px' }}>Today's Online Sales</div>
                            <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>₹{systemData.onlineSales.toLocaleString()}</div>
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '25px', marginBottom: '30px' }}>
                        <div className="content-card" style={{ padding: '20px' }}>
                            <h4 style={{ margin: '0 0 15px 0', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <Wallet size={16} color="var(--admin-accent)" /> Cash Summary
                            </h4>
                            <div style={{ fontSize: '0.85rem', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span style={{ color: 'var(--admin-text-muted)' }}>Opening Cash</span>
                                    <span>₹{systemData.openingCash.toLocaleString()}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#4ade80' }}>
                                    <span>Cash Sales (POS)</span>
                                    <span>+ ₹{systemData.cashSales.toLocaleString()}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#f87171' }}>
                                    <span>Cash Expenses</span>
                                    <span>- ₹{systemData.cashExpenses.toLocaleString()}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '5px', paddingTop: '10px', borderTop: '1px dashed var(--admin-border)', fontWeight: 'bold' }}>
                                    <span>Expected Cash in Hand</span>
                                    <span>₹{systemCashBalance.toLocaleString()}</span>
                                </div>
                            </div>
                        </div>

                        <div className="content-card" style={{ padding: '20px' }}>
                            <h4 style={{ margin: '0 0 15px 0', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <Landmark size={16} color="#60a5fa" /> Bank Summary
                            </h4>
                            <div style={{ fontSize: '0.85rem', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span style={{ color: 'var(--admin-text-muted)' }}>Opening Bank Balance</span>
                                    <span>₹{systemData.openingBank.toLocaleString()}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#4ade80' }}>
                                    <span>Online Payments</span>
                                    <span>+ ₹{systemData.onlineSales.toLocaleString()}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#f87171' }}>
                                    <span>Bank Expenses</span>
                                    <span>- ₹{systemData.bankExpenses.toLocaleString()}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '5px', paddingTop: '10px', borderTop: '1px dashed var(--admin-border)', fontWeight: 'bold' }}>
                                    <span>System Bank Balance</span>
                                    <span>₹{systemBankBalance.toLocaleString()}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="content-card" style={{ padding: '25px', position: 'relative' }}>
                        {isLocked && (
                            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.5)', borderRadius: '12px', zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <div style={{ background: 'var(--admin-bg-sidebar)', padding: '15px 25px', borderRadius: '10px', border: '1px solid var(--admin-border)', textAlign: 'center' }}>
                                    <Lock size={24} color="#4ade80" />
                                    <div style={{ fontSize: '0.9rem', marginTop: '8px' }}>Reconciliation locked for today</div>
                                </div>
                            </div>
                        )}
                        <h4 style={{ margin: '0 0 25px 0', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <ShieldCheck size={20} color="var(--admin-accent)" /> Tally your Cash (Hisaab Milana)
                        </h4>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
                            <div>
                                <label style={{ fontSize: '0.8rem', color: 'var(--admin-text-muted)', marginBottom: '5px', display: 'block' }}>Physical Cash in hand</label>
                                <input
                                    type="number" className="admin-input" style={{ width: '100%', fontSize: '1.1rem', fontWeight: 'bold' }} placeholder="Gallah mein kitna cash hai?"
                                    value={actualCash} onChange={(e) => setActualCash(e.target.value)}
                                    disabled={isLocked}
                                />
                                {actualCash !== '' && <div style={{ fontSize: '0.8rem', color: cashDiff >= 0 ? '#4ade80' : '#f87171', marginTop: '5px' }}>Difference (Farak): {cashDiff.toLocaleString()}</div>}
                            </div>
                            <div>
                                <label style={{ fontSize: '0.8rem', color: 'var(--admin-text-muted)', marginBottom: '5px', display: 'block' }}>Money in Bank (Online/Cards)</label>
                                <input
                                    type="number" className="admin-input" style={{ width: '100%', fontSize: '1.1rem', fontWeight: 'bold' }} placeholder="Bank mein kitna balance hai?"
                                    value={actualBank} onChange={(e) => setActualBank(e.target.value)}
                                    disabled={isLocked}
                                />
                                {actualBank !== '' && <div style={{ fontSize: '0.8rem', color: bankDiff >= 0 ? '#4ade80' : '#f87171', marginTop: '5px' }}>Difference (Farak): {bankDiff.toLocaleString()}</div>}
                            </div>
                        </div>
                        <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                            <button className="bb-btn bb-btn-gold" style={{ padding: '10px 25px' }} onClick={() => setIsLocked(true)} disabled={isLocked}>
                                <Save size={16} style={{ marginRight: '8px' }} /> Save & Lock Day
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BookingManagement;
