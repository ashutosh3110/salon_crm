import React, { useState } from 'react';
import {
    Clock, Calendar, Plus, Users, MapPin,
    Edit2, Trash2, UserPlus, Info, CheckCircle2,
    X, ChevronLeft, ChevronRight, Settings, AlertTriangle
} from 'lucide-react';

const HrShifts = () => {
    const [view, setView] = useState('list'); // 'list' or 'assign'
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState('add'); // 'add' or 'edit'

    const shifts = [
        { id: 1, name: 'Morning Shift', start: '09:00 AM', end: '06:00 PM', duration: '9h', outlet: 'Bandra Main', staffCount: 8, status: 'Active' },
        { id: 2, name: 'Evening Shift', start: '01:00 PM', end: '10:00 PM', duration: '9h', outlet: 'Andheri West', staffCount: 5, status: 'Active' },
        { id: 3, name: 'Full Day', start: '10:00 AM', end: '08:00 PM', duration: '10h', outlet: 'All Outlets', staffCount: 12, status: 'Active' },
        { id: 4, name: 'Weekend Special', start: '11:00 AM', end: '09:00 PM', duration: '10h', outlet: 'Juhu Studio', staffCount: 4, status: 'Inactive' },
    ];

    const weeklySchedule = [
        { day: 'Mon', shifts: ['Morning', 'Full Day'] },
        { day: 'Tue', shifts: ['Morning', 'Evening'] },
        { day: 'Wed', shifts: ['Morning', 'Evening', 'Full Day'] },
        { day: 'Thu', shifts: ['Morning', 'Evening'] },
        { day: 'Fri', shifts: ['Morning', 'Evening', 'Full Day'] },
        { day: 'Sat', shifts: ['Full Day', 'Evening'] },
        { day: 'Sun', shifts: ['Full Day'] },
    ];

    return (
        <div className="shifts-page">
            {/* Header Actions */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <button
                        onClick={() => setView('list')}
                        className={`bb-btn ${view === 'list' ? 'bb-btn-gold' : 'bb-btn-outline'}`}
                        style={{ padding: '8px 15px', fontSize: '0.85rem' }}
                    >
                        Shift Management
                    </button>
                    <button
                        onClick={() => setView('calendar')}
                        className={`bb-btn ${view === 'calendar' ? 'bb-btn-gold' : 'bb-btn-outline'}`}
                        style={{ padding: '8px 15px', fontSize: '0.85rem' }}
                    >
                        Weekly Schedule
                    </button>
                    <button
                        onClick={() => setView('assign')}
                        className={`bb-btn ${view === 'assign' ? 'bb-btn-gold' : 'bb-btn-outline'}`}
                        style={{ padding: '8px 15px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px' }}
                    >
                        <UserPlus size={16} /> Assign Shifts
                    </button>
                </div>
                {view === 'list' && (
                    <button
                        onClick={() => { setModalType('add'); setShowModal(true); }}
                        className="bb-btn bb-btn-gold"
                        style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px' }}
                    >
                        <Plus size={18} /> Add New Shift
                    </button>
                )}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '30px' }}>
                {/* Main Content Area */}
                <div className="main-content">
                    {view === 'list' && (
                        <div className="content-card" style={{ padding: 0 }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                <thead>
                                    <tr style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid var(--admin-border)' }}>
                                        <th style={{ padding: '15px 20px', textAlign: 'left', color: 'var(--admin-text-muted)', fontSize: '0.85rem' }}>Shift Name</th>
                                        <th style={{ padding: '15px 20px', textAlign: 'left', color: 'var(--admin-text-muted)', fontSize: '0.85rem' }}>Timing</th>
                                        <th style={{ padding: '15px 20px', textAlign: 'left', color: 'var(--admin-text-muted)', fontSize: '0.85rem' }}>Outlet</th>
                                        <th style={{ padding: '15px 20px', textAlign: 'left', color: 'var(--admin-text-muted)', fontSize: '0.85rem' }}>Assigned</th>
                                        <th style={{ padding: '15px 20px', textAlign: 'left', color: 'var(--admin-text-muted)', fontSize: '0.85rem' }}>Status</th>
                                        <th style={{ padding: '15px 20px', textAlign: 'right', color: 'var(--admin-text-muted)', fontSize: '0.85rem' }}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {shifts.map((shift) => (
                                        <tr key={shift.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                                            <td style={{ padding: '15px 20px' }}>
                                                <div style={{ fontWeight: '600' }}>{shift.name}</div>
                                                <div style={{ fontSize: '0.75rem', color: 'var(--admin-text-muted)' }}>Duration: {shift.duration}</div>
                                            </td>
                                            <td style={{ padding: '15px 20px' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem' }}>
                                                    <Clock size={14} color="var(--admin-accent)" />
                                                    {shift.start} - {shift.end}
                                                </div>
                                            </td>
                                            <td style={{ padding: '15px 20px', fontSize: '0.85rem' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                                    <MapPin size={14} color="var(--admin-text-muted)" />
                                                    {shift.outlet}
                                                </div>
                                            </td>
                                            <td style={{ padding: '15px 20px' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem' }}>
                                                    <Users size={14} color="var(--admin-text-muted)" />
                                                    {shift.staffCount} Staff
                                                </div>
                                            </td>
                                            <td style={{ padding: '15px 20px' }}>
                                                <span style={{
                                                    padding: '4px 10px', borderRadius: '6px', fontSize: '0.7rem',
                                                    background: shift.status === 'Active' ? 'rgba(74, 222, 128, 0.1)' : 'rgba(255,255,255,0.05)',
                                                    color: shift.status === 'Active' ? '#4ade80' : 'var(--admin-text-muted)',
                                                    border: `1px solid ${shift.status === 'Active' ? 'rgba(74, 222, 128, 0.2)' : 'var(--admin-border)'}`
                                                }}>
                                                    {shift.status}
                                                </span>
                                            </td>
                                            <td style={{ padding: '15px 20px', textAlign: 'right' }}>
                                                <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                                                    <button className="header-icon-btn" title="Edit"><Edit2 size={16} /></button>
                                                    <button className="header-icon-btn" title="Disable"><Trash2 size={16} /></button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {view === 'calendar' && (
                        <div className="content-card">
                            <h3 className="card-title" style={{ marginBottom: '20px' }}>Weekly Planning View</h3>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '10px' }}>
                                {weeklySchedule.map((day, idx) => (
                                    <div key={idx} style={{ background: 'rgba(255,255,255,0.02)', borderRadius: '10px', padding: '15px', border: '1px solid var(--admin-border)' }}>
                                        <div style={{ textAlign: 'center', fontWeight: 'bold', marginBottom: '15px', color: 'var(--admin-accent)' }}>{day.day}</div>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                            {day.shifts.map((s, si) => (
                                                <div key={si} style={{ fontSize: '0.7rem', padding: '6px', background: 'rgba(184, 92, 92, 0.1)', border: '1px solid rgba(184, 92, 92, 0.2)', borderRadius: '4px', textAlign: 'center' }}>
                                                    {s}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {view === 'assign' && (
                        <div className="content-card">
                            <h3 className="card-title" style={{ marginBottom: '25px' }}>Bulk Assign Shifts</h3>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '30px' }}>
                                <div className="form-group">
                                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem' }}>Select Shift</label>
                                    <select style={{ width: '100%', padding: '12px', background: 'var(--admin-bg-sidebar)', border: '1px solid var(--admin-border)', borderRadius: '8px', color: '#fff' }}>
                                        {shifts.map(s => <option key={s.id}>{s.name} ({s.start} - {s.end})</option>)}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem' }}>Date Range (Valid From - To)</label>
                                    <div style={{ display: 'flex', gap: '10px' }}>
                                        <input type="date" style={{ flex: 1, padding: '12px', background: 'var(--admin-bg-sidebar)', border: '1px solid var(--admin-border)', borderRadius: '8px', color: '#fff' }} />
                                        <input type="date" style={{ flex: 1, padding: '12px', background: 'var(--admin-bg-sidebar)', border: '1px solid var(--admin-border)', borderRadius: '8px', color: '#fff' }} />
                                    </div>
                                </div>
                            </div>

                            <div style={{ background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid var(--admin-border)', padding: '20px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                                    <h4 style={{ margin: 0 }}>Select Staff Members</h4>
                                    <div style={{ fontSize: '0.8rem', color: 'var(--admin-text-muted)' }}>Found 24 employees</div>
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px', maxHeight: '300px', overflowY: 'auto', paddingRight: '10px' }}>
                                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(i => (
                                        <label key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', cursor: 'pointer', border: '1px solid transparent' }} className="staff-check">
                                            <input type="checkbox" style={{ width: '16px', height: '16px' }} />
                                            <span style={{ fontSize: '0.85rem' }}>Employee Name {i}</span>
                                        </label>
                                    ))}
                                </div>
                                <div style={{ marginTop: '25px', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                                    <button className="bb-btn bb-btn-outline" onClick={() => setView('list')}>Cancel</button>
                                    <button className="bb-btn bb-btn-gold" style={{ padding: '10px 30px' }}>Assign Shift Now</button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Right Sidebar - Rules & Info */}
                <div className="info-sidebar">
                    <div className="content-card" style={{ background: 'rgba(184, 92, 92, 0.03)', borderColor: 'rgba(184, 92, 92, 0.2)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--admin-accent)', marginBottom: '15px', fontWeight: 'bold' }}>
                            <Settings size={18} /> Shift Rules
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                            <div style={{ borderBottom: '1px solid var(--admin-border)', pb: '10px', paddingBottom: '10px' }}>
                                <div style={{ fontSize: '0.75rem', color: 'var(--admin-text-muted)', marginBottom: '4px' }}>Change Cut-off</div>
                                <div style={{ fontSize: '0.9rem', fontWeight: '600' }}>24 Hours Prior</div>
                            </div>
                            <div style={{ borderBottom: '1px solid var(--admin-border)', pb: '10px', paddingBottom: '10px' }}>
                                <div style={{ fontSize: '0.75rem', color: 'var(--admin-text-muted)', marginBottom: '4px' }}>Late Threshold</div>
                                <div style={{ fontSize: '0.9rem', fontWeight: '600' }}>10 Minutes Grace</div>
                            </div>
                            <div style={{ borderBottom: '1px solid var(--admin-border)', pb: '10px', paddingBottom: '10px' }}>
                                <div style={{ fontSize: '0.75rem', color: 'var(--admin-text-muted)', marginBottom: '4px' }}>Overtime Trigger</div>
                                <div style={{ fontSize: '0.9rem', fontWeight: '600' }}>After 9.5 Hours</div>
                            </div>
                        </div>
                        <div style={{ marginTop: '20px', padding: '12px', background: 'rgba(245, 158, 11, 0.05)', borderRadius: '8px', border: '1px solid rgba(245, 158, 11, 0.2)', display: 'flex', gap: '10px' }}>
                            <AlertTriangle size={16} color="#f59e0b" style={{ flexShrink: 0 }} />
                            <div style={{ fontSize: '0.75rem', color: '#f59e0b' }}>Shift changes after 10 PM for next day are not permitted.</div>
                        </div>
                    </div>

                    <div className="content-card" style={{ marginTop: '20px' }}>
                        <h4 style={{ fontSize: '0.9rem', marginBottom: '15px' }}>Quick Stats</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
                                <span color="var(--admin-text-muted)">Unassigned Staff</span>
                                <span style={{ fontWeight: 'bold' }}>3</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
                                <span color="var(--admin-text-muted)">Shift Conflicts</span>
                                <span style={{ fontWeight: 'bold', color: '#ef4444' }}>0</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Add/Edit Modal Placeholder */}
            {showModal && (
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
                    <div className="content-card" style={{ width: '500px', padding: '30px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
                            <h3 style={{ margin: 0 }}>{modalType === 'add' ? 'Add New Shift' : 'Edit Shift'}</h3>
                            <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}><X size={24} /></button>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                            <div className="form-group">
                                <label style={{ display: 'block', marginBottom: '8px' }}>Shift Name</label>
                                <input type="text" placeholder="e.g. Afternoon Shift" style={{ width: '100%', padding: '12px', background: 'var(--admin-bg-sidebar)', border: '1px solid var(--admin-border)', borderRadius: '8px', color: '#fff' }} />
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                                <div className="form-group">
                                    <label style={{ display: 'block', marginBottom: '8px' }}>Start Time</label>
                                    <input type="time" style={{ width: '100%', padding: '12px', background: 'var(--admin-bg-sidebar)', border: '1px solid var(--admin-border)', borderRadius: '8px', color: '#fff' }} />
                                </div>
                                <div className="form-group">
                                    <label style={{ display: 'block', marginBottom: '8px' }}>End Time</label>
                                    <input type="time" style={{ width: '100%', padding: '12px', background: 'var(--admin-bg-sidebar)', border: '1px solid var(--admin-border)', borderRadius: '8px', color: '#fff' }} />
                                </div>
                            </div>
                            <div className="form-group">
                                <label style={{ display: 'block', marginBottom: '8px' }}>Applicable Outlet</label>
                                <select style={{ width: '100%', padding: '12px', background: 'var(--admin-bg-sidebar)', border: '1px solid var(--admin-border)', borderRadius: '8px', color: '#fff' }}>
                                    <option>Bandra Main</option>
                                    <option>Andheri West</option>
                                    <option>All Outlets</option>
                                </select>
                            </div>
                            <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
                                <button className="bb-btn bb-btn-outline" style={{ flex: 1 }} onClick={() => setShowModal(false)}>Cancel</button>
                                <button className="bb-btn bb-btn-gold" style={{ flex: 1 }}>{modalType === 'add' ? 'Create Shift' : 'Save Changes'}</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <style jsx>{`
                .staff-check:hover {
                    background: rgba(184, 92, 92, 0.1) !important;
                    border-color: rgba(184, 92, 92, 0.3) !important;
                }
                .header-icon-btn {
                    padding: 8px;
                    background: rgba(255,255,255,0.05);
                    border: 1px solid var(--admin-border);
                    border-radius: 6px;
                    color: var(--admin-text-muted);
                    cursor: pointer;
                    transition: all 0.2s;
                }
                .header-icon-btn:hover {
                    color: var(--admin-accent);
                    border-color: var(--admin-accent);
                    background: rgba(184, 92, 92, 0.1);
                }
            `}</style>
        </div>
    );
};

export default HrShifts;
