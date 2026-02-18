import React, { useState } from 'react';
import { Users, Search, Filter, Plus, Mail, Phone, MapPin, MoreVertical, Edit2, UserX, Shield } from 'lucide-react';

const HrEmployees = () => {
    const [employees, setEmployees] = useState([
        { id: 'EMP001', name: 'Anita Sharma', role: 'Senior Stylist', outlet: 'Bandra Main', email: 'anita@salon.com', phone: '+91 98765 43210', status: 'Active' },
        { id: 'EMP002', name: 'Rajesh Kumar', role: 'Hair Expert', outlet: 'Andheri West', email: 'rajesh@salon.com', phone: '+91 98765 43211', status: 'Active' },
        { id: 'EMP003', name: 'Sonal Verma', role: 'Receptionist', outlet: 'Juhu Studio', email: 'sonal@salon.com', phone: '+91 98765 43212', status: 'Inactive' },
        { id: 'EMP004', name: 'Amit Patel', role: 'Manager', outlet: 'Bandra Main', email: 'amit@salon.com', phone: '+91 98765 43213', status: 'Active' },
    ]);

    const [showOptions, setShowOptions] = useState(null);

    const toggleStatus = (id) => {
        setEmployees(employees.map(emp =>
            emp.id === id ? { ...emp, status: emp.status === 'Active' ? 'Inactive' : 'Active' } : emp
        ));
        setShowOptions(null);
    };

    return (
        <div className="hr-employees">
            <div className="card-header" style={{ marginBottom: '25px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 className="card-title">Employee Directory</h2>
                <div style={{ display: 'flex', gap: '12px' }}>
                    <div style={{ position: 'relative' }}>
                        <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--admin-text-muted)' }} />
                        <input
                            type="text"
                            placeholder="Search employee..."
                            style={{ padding: '10px 10px 10px 40px', background: 'var(--admin-bg-sidebar)', border: '1px solid var(--admin-border)', borderRadius: '8px', color: '#fff', width: '220px' }}
                        />
                    </div>
                    <button className="bb-btn bb-btn-gold" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Plus size={18} /> Add Employee
                    </button>
                </div>
            </div>

            <div className="content-card" style={{ padding: 0, overflow: 'visible' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid var(--admin-border)' }}>
                            <th style={{ padding: '15px 20px', textAlign: 'left', color: 'var(--admin-text-muted)', fontSize: '0.85rem' }}>Employee</th>
                            <th style={{ padding: '15px 20px', textAlign: 'left', color: 'var(--admin-text-muted)', fontSize: '0.85rem' }}>Role & Outlet</th>
                            <th style={{ padding: '15px 20px', textAlign: 'left', color: 'var(--admin-text-muted)', fontSize: '0.85rem' }}>Contact</th>
                            <th style={{ padding: '15px 20px', textAlign: 'left', color: 'var(--admin-text-muted)', fontSize: '0.85rem' }}>Status</th>
                            <th style={{ padding: '15px 20px', textAlign: 'right', color: 'var(--admin-text-muted)', fontSize: '0.85rem' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map((emp) => (
                            <tr key={emp.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                <td style={{ padding: '15px 20px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <div style={{ width: '35px', height: '35px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 'bold' }}>
                                            {emp.name[0]}
                                        </div>
                                        <div>
                                            <div style={{ fontWeight: '600' }}>{emp.name}</div>
                                            <div style={{ fontSize: '0.7rem', color: 'var(--admin-accent)' }}>{emp.id}</div>
                                        </div>
                                    </div>
                                </td>
                                <td style={{ padding: '15px 20px' }}>
                                    <div style={{ fontSize: '0.9rem' }}>{emp.role}</div>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--admin-text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                        <MapPin size={12} /> {emp.outlet}
                                    </div>
                                </td>
                                <td style={{ padding: '15px 20px' }}>
                                    <div style={{ fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px' }}><Mail size={14} color="var(--admin-text-muted)" /> {emp.email}</div>
                                    <div style={{ fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px' }}><Phone size={14} color="var(--admin-text-muted)" /> {emp.phone}</div>
                                </td>
                                <td style={{ padding: '15px 20px' }}>
                                    <span style={{
                                        padding: '4px 10px',
                                        borderRadius: '6px',
                                        fontSize: '0.7rem',
                                        background: emp.status === 'Active' ? 'rgba(74, 222, 128, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                                        color: emp.status === 'Active' ? '#4ade80' : '#ef4444',
                                        border: '1px solid' + (emp.status === 'Active' ? 'rgba(74, 222, 128, 0.2)' : 'rgba(239, 68, 68, 0.2)')
                                    }}>
                                        {emp.status}
                                    </span>
                                </td>
                                <td style={{ padding: '15px 20px', textAlign: 'right', position: 'relative' }}>
                                    <button
                                        className="header-icon-btn"
                                        onClick={() => setShowOptions(showOptions === emp.id ? null : emp.id)}
                                    >
                                        <MoreVertical size={18} />
                                    </button>

                                    {showOptions === emp.id && (
                                        <div style={{ position: 'absolute', right: '20px', top: '50px', background: 'var(--admin-card-bg)', border: '1px solid var(--admin-border)', borderRadius: '8px', zIndex: 10, width: '180px', boxShadow: '0 10px 25px rgba(0,0,0,0.5)', padding: '5px' }}>
                                            <button style={{ width: '100%', padding: '10px', textAlign: 'left', background: 'none', border: 'none', color: '#fff', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                                                <Edit2 size={14} /> Edit Details
                                            </button>
                                            <button style={{ width: '100%', padding: '10px', textAlign: 'left', background: 'none', border: 'none', color: '#fff', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                                                <Shield size={14} /> Change Role
                                            </button>
                                            <button style={{ width: '100%', padding: '10px', textAlign: 'left', background: 'none', border: 'none', color: '#fff', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                                                <MapPin size={14} /> Reassign Outlet
                                            </button>
                                            <div style={{ height: '1px', background: 'var(--admin-border)', margin: '5px 0' }}></div>
                                            <button
                                                onClick={() => toggleStatus(emp.id)}
                                                style={{ width: '100%', padding: '10px', textAlign: 'left', background: 'none', border: 'none', color: emp.status === 'Active' ? '#ef4444' : '#4ade80', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
                                            >
                                                <UserX size={14} /> {emp.status === 'Active' ? 'Deactivate' : 'Activate'}
                                            </button>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default HrEmployees;
