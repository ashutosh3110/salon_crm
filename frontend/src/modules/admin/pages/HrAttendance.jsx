import React, { useState } from 'react';
import {
    Calendar, MapPin, Briefcase, Search, Users,
    UserCheck, UserMinus, Clock, AlertCircle,
    Edit2, CheckCircle, Info, X, History, Lock
} from 'lucide-react';

const HrAttendance = () => {
    const [selectedDate, setSelectedDate] = useState('2026-02-17');
    const [selectedOutlet, setSelectedOutlet] = useState('All');
    const [loading, setLoading] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState(null);
    const [isLocked, setIsLocked] = useState(false); // Attendance locked state

    const stats = [
        { title: 'Total Staff', value: '24', icon: <Users size={20} />, color: '#60a5fa' },
        { title: 'Present', value: '18', icon: <UserCheck size={20} />, color: '#4ade80' },
        { title: 'Absent', value: '2', icon: <UserMinus size={20} />, color: '#ef4444' },
        { title: 'Late', value: '3', icon: <Clock size={20} />, color: '#f59e0b' },
        { title: 'Half-day', value: '1', icon: <AlertCircle size={20} />, color: '#a78bfa' },
    ];

    const attendanceData = [
        {
            id: 1, name: 'Anita Sharma', role: 'Senior Stylist', outlet: 'Bandra Main', shift: '10 AM - 7 PM',
            checkIn: '09:55 AM', checkOut: '07:05 PM', hours: '9.1h', status: 'Present', markedBy: 'System',
            history: [{ time: '09:55 AM', action: 'Punch In' }, { time: '07:05 PM', action: 'Punch Out' }],
            remarks: 'Early check-in'
        },
        {
            id: 2, name: 'Rajesh Kumar', role: 'Hair Expert', outlet: 'Andheri West', shift: '10 AM - 7 PM',
            checkIn: '10:15 AM', checkOut: '---', hours: '---', status: 'Late', markedBy: 'Admin',
            history: [{ time: '10:15 AM', action: 'Punch In (Admin override)' }],
            remarks: 'Reached late due to traffic'
        },
        {
            id: 3, name: 'Sonal Verma', role: 'Receptionist', outlet: 'Juhu Studio', shift: '9 AM - 6 PM',
            checkIn: '---', checkOut: '---', hours: '---', status: 'Absent', markedBy: 'HR',
            history: [],
            remarks: 'Medical leave'
        },
        {
            id: 4, name: 'Amit Patel', role: 'Manager', outlet: 'Bandra Main', shift: '10 AM - 7 PM',
            checkIn: '10:02 AM', checkOut: '02:30 PM', hours: '4.5h', status: 'Half-day', markedBy: 'System',
            history: [{ time: '10:02 AM', action: 'Punch In' }, { time: '02:30 PM', action: 'Punch Out' }],
            remarks: 'Emergency at home'
        }
    ];

    const getStatusColor = (status) => {
        switch (status) {
            case 'Present': return '#4ade80';
            case 'Absent': return '#ef4444';
            case 'Late': return '#f59e0b';
            case 'Half-day': return '#a78bfa';
            default: return 'var(--admin-text-muted)';
        }
    };

    return (
        <div className="attendance-page" style={{ position: 'relative' }}>
            {/* Locked Bar */}
            {isLocked && (
                <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', padding: '10px 20px', borderRadius: '8px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px', color: '#ef4444' }}>
                    <Lock size={18} />
                    <span style={{ fontSize: '0.9rem', fontWeight: '500' }}>Attendance for this period is locked (Payroll Processed)</span>
                </div>
            )}

            {/* Top Section - Filters */}
            <div className="content-card" style={{ marginBottom: '25px', padding: '20px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
                    <div className="form-group">
                        <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: 'var(--admin-text-muted)', marginBottom: '8px' }}>
                            <Calendar size={14} /> Select Date
                        </label>
                        <input
                            type="date"
                            className="admin-input"
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                            style={{ width: '100%', padding: '10px', background: 'var(--admin-bg-sidebar)', border: '1px solid var(--admin-border)', color: '#fff', borderRadius: '8px' }}
                        />
                    </div>
                    <div className="form-group">
                        <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: 'var(--admin-text-muted)', marginBottom: '8px' }}>
                            <MapPin size={14} /> Outlet
                        </label>
                        <select style={{ width: '100%', padding: '10px', background: 'var(--admin-bg-sidebar)', border: '1px solid var(--admin-border)', color: '#fff', borderRadius: '8px' }}>
                            <option>All Outlets</option>
                            <option>Bandra Main</option>
                            <option>Andheri West</option>
                            <option>Juhu Studio</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: 'var(--admin-text-muted)', marginBottom: '8px' }}>
                            <Briefcase size={14} /> Role
                        </label>
                        <select style={{ width: '100%', padding: '10px', background: 'var(--admin-bg-sidebar)', border: '1px solid var(--admin-border)', color: '#fff', borderRadius: '8px' }}>
                            <option>All Roles</option>
                            <option>Stylist</option>
                            <option>Manager</option>
                            <option>Receptionist</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: 'var(--admin-text-muted)', marginBottom: '8px' }}>
                            <Search size={14} /> Search Employee
                        </label>
                        <input
                            type="text"
                            placeholder="Type name..."
                            style={{ width: '100%', padding: '10px', background: 'var(--admin-bg-sidebar)', border: '1px solid var(--admin-border)', color: '#fff', borderRadius: '8px' }}
                        />
                    </div>
                </div>
            </div>

            {/* Summary Cards */}
            <div className="dashboard-grid" style={{ marginBottom: '25px' }}>
                {stats.map((stat, index) => (
                    <div key={index} className="stat-card" style={{ padding: '20px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ padding: '10px', background: `${stat.color}15`, color: stat.color, borderRadius: '10px' }}>
                                {stat.icon}
                            </div>
                            <span style={{ fontSize: '1.5rem', fontWeight: '700', color: '#fff' }}>{stat.value}</span>
                        </div>
                        <span style={{ fontSize: '0.85rem', color: 'var(--admin-text-muted)', marginTop: '10px', display: 'block' }}>{stat.title}</span>
                    </div>
                ))}
            </div>

            {/* Table Section */}
            <div className="content-card" style={{ padding: 0, overflow: 'visible' }}>
                <div style={{ padding: '20px', borderBottom: '1px solid var(--admin-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 className="card-title">Detailed Attendance Log</h3>
                    <button className="bb-btn bb-btn-outline" style={{ fontSize: '0.8rem' }}>Export PDF</button>
                </div>

                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid var(--admin-border)' }}>
                                <th style={{ padding: '15px', textAlign: 'left', color: 'var(--admin-text-muted)', fontSize: '0.8rem' }}>Employee</th>
                                <th style={{ padding: '15px', textAlign: 'left', color: 'var(--admin-text-muted)', fontSize: '0.8rem' }}>Shift</th>
                                <th style={{ padding: '15px', textAlign: 'left', color: 'var(--admin-text-muted)', fontSize: '0.8rem' }}>In/Out</th>
                                <th style={{ padding: '15px', textAlign: 'left', color: 'var(--admin-text-muted)', fontSize: '0.8rem' }}>Worked</th>
                                <th style={{ padding: '15px', textAlign: 'left', color: 'var(--admin-text-muted)', fontSize: '0.8rem' }}>Status</th>
                                <th style={{ padding: '15px', textAlign: 'left', color: 'var(--admin-text-muted)', fontSize: '0.8rem' }}>Marked By</th>
                                <th style={{ padding: '15px', textAlign: 'right', color: 'var(--admin-text-muted)', fontSize: '0.8rem' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr><td colSpan="7" style={{ padding: '50px', textAlign: 'center', color: 'var(--admin-text-muted)' }}>Loading records...</td></tr>
                            ) : attendanceData.length === 0 ? (
                                <tr><td colSpan="7" style={{ padding: '50px', textAlign: 'center', color: 'var(--admin-text-muted)' }}>No attendance data found for this date.</td></tr>
                            ) : (
                                attendanceData.map((row) => (
                                    <tr
                                        key={row.id}
                                        onClick={() => setSelectedRecord(row)}
                                        style={{ borderBottom: '1px solid rgba(255,255,255,0.03)', cursor: 'pointer', transition: 'background 0.2s' }}
                                        className="hover-row"
                                    >
                                        <td style={{ padding: '15px' }}>
                                            <div style={{ fontWeight: '600', color: '#fff', fontSize: '0.9rem' }}>{row.name}</div>
                                            <div style={{ fontSize: '0.75rem', color: 'var(--admin-text-muted)' }}>{row.role} • {row.outlet}</div>
                                        </td>
                                        <td style={{ padding: '15px', fontSize: '0.85rem' }}>{row.shift}</td>
                                        <td style={{ padding: '15px', fontSize: '0.85rem' }}>
                                            <div style={{ color: '#4ade80' }}>In: {row.checkIn}</div>
                                            <div style={{ color: '#f87171' }}>Out: {row.checkOut}</div>
                                        </td>
                                        <td style={{ padding: '15px', fontWeight: '600' }}>{row.hours}</td>
                                        <td style={{ padding: '15px' }}>
                                            <span style={{
                                                padding: '4px 8px', borderRadius: '4px', fontSize: '0.75rem',
                                                background: `${getStatusColor(row.status)}15`, color: getStatusColor(row.status), border: `1px solid ${getStatusColor(row.status)}30`
                                            }}>
                                                {row.status}
                                            </span>
                                        </td>
                                        <td style={{ padding: '15px', fontSize: '0.85rem', color: 'var(--admin-text-muted)' }}>
                                            {row.markedBy}
                                        </td>
                                        <td style={{ padding: '15px', textAlign: 'right' }}>
                                            <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                                                <button className="header-icon-btn" title="Approve" onClick={(e) => { e.stopPropagation(); }}><CheckCircle size={16} color="#4ade80" /></button>
                                                <button className="header-icon-btn" title="Edit" onClick={(e) => { e.stopPropagation(); }}><Edit2 size={16} /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Record Detail Side Modal */}
            {selectedRecord && (
                <div style={{
                    position: 'fixed', top: 0, right: 0, height: '100vh', width: '400px',
                    background: 'var(--admin-bg-sidebar)', borderLeft: '1px solid var(--admin-border)',
                    zIndex: 1000, padding: '30px', boxShadow: '-10px 0 30px rgba(0,0,0,0.5)',
                    display: 'flex', flexDirection: 'column', gap: '25px', color: '#fff'
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h3 style={{ margin: 0, fontSize: '1.2rem' }}>Attendance Detail</h3>
                        <button onClick={() => setSelectedRecord(null)} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}>
                            <X size={24} />
                        </button>
                    </div>

                    <div style={{ padding: '15px', borderRadius: '12px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--admin-border)' }}>
                        <div style={{ fontWeight: '700', fontSize: '1.1rem', marginBottom: '4px' }}>{selectedRecord.name}</div>
                        <div style={{ color: 'var(--admin-accent)', fontSize: '0.85rem' }}>{selectedRecord.role}</div>
                    </div>

                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: 'var(--admin-text-muted)', marginBottom: '15px' }}>
                            <History size={16} /> Punch History
                        </div>
                        <div style={{ borderLeft: '2px solid var(--admin-accent)', marginLeft: '10px', paddingLeft: '15px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                            {selectedRecord.history.map((log, i) => (
                                <div key={i} style={{ position: 'relative' }}>
                                    <div style={{ width: '10px', height: '10px', background: 'var(--admin-accent)', borderRadius: '50%', position: 'absolute', left: '-21px', top: '5px' }}></div>
                                    <div style={{ fontSize: '0.85rem', fontWeight: '600' }}>{log.action}</div>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--admin-text-muted)' }}>{log.time} • Marked by {selectedRecord.markedBy}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div style={{ height: '1px', background: 'var(--admin-border)' }}></div>

                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: 'var(--admin-text-muted)', marginBottom: '10px' }}>
                            <Info size={16} /> Remark & Notes
                        </div>
                        <div style={{ padding: '12px', borderRadius: '8px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--admin-border)', fontSize: '0.9rem', color: '#e2e2e2' }}>
                            {selectedRecord.remarks}
                        </div>
                    </div>

                    <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <button className="bb-btn bb-btn-gold" style={{ width: '100%', padding: '12px' }}>Edit Record</button>
                        <button className="bb-btn bb-btn-outline" style={{ width: '100%', padding: '12px', color: '#f87171' }}>Mark as Absent</button>
                    </div>
                </div>
            )}

            <style jsx>{`
                .hover-row:hover {
                    background: rgba(255,255,255,0.02);
                }
                .admin-input:focus {
                    outline: none;
                    border-color: var(--admin-accent) !important;
                }
            `}</style>
        </div>
    );
};

export default HrAttendance;
