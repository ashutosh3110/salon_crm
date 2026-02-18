import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUsers } from '../../../api/admin';
import { UserCheck, Mail, Phone, MoreVertical, Edit2, Shield, MapPin } from 'lucide-react';

const StaffList = () => {
    const navigate = useNavigate();
    const [staff, setStaff] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [activeDropdown, setActiveDropdown] = useState(null);

    useEffect(() => {
        const fetchStaff = async () => {
            try {
                let apiResults = [];
                try {
                    const data = await getUsers();
                    apiResults = data.results || [];
                } catch (apiErr) {
                    console.warn('API fetch failed, showing local only:', apiErr);
                }

                // Get temporary staff from localStorage
                const localStaff = JSON.parse(localStorage.getItem('temp_staff') || '[]');

                // Merge and remove duplicates
                const merged = [...apiResults];
                localStaff.forEach(local => {
                    if (!merged.find(api => api._id === local._id)) {
                        merged.push(local);
                    }
                });

                setStaff(merged);
            } catch (err) {
                console.error('Fetch staff error:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchStaff();
    }, []);

    if (loading) return <div className="admin-wrapper" style={{ padding: '30px' }}>Loading staff members...</div>;
    if (error) return (
        <div className="admin-wrapper" style={{ padding: '30px' }}>
            <div className="auth-error" style={{ marginBottom: '20px' }}>{error}</div>
            <button className="bb-btn bb-btn-gold" onClick={() => window.location.reload()}>Retry</button>
        </div>
    );

    const staffList = Array.isArray(staff) ? staff : [];

    return (
        <div className="staff-page">
            <div className="card-header" style={{ marginBottom: '25px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 className="card-title">Staff Members</h2>
                <button
                    className="bb-btn bb-btn-gold"
                    style={{ padding: '10px 20px', fontSize: '0.9rem' }}
                    onClick={() => navigate('/admin/staff-setup/add')}
                >
                    + Add New Staff
                </button>
            </div>

            <div className="content-card" style={{ padding: 0, overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid var(--admin-border)' }}>
                            <th style={{ padding: '15px 20px', textAlign: 'left', color: 'var(--admin-text-muted)', fontSize: '0.85rem' }}>Staff Member</th>
                            <th style={{ padding: '15px 20px', textAlign: 'left', color: 'var(--admin-text-muted)', fontSize: '0.85rem' }}>Role & Outlet</th>
                            <th style={{ padding: '15px 20px', textAlign: 'left', color: 'var(--admin-text-muted)', fontSize: '0.85rem' }}>Contact</th>
                            <th style={{ padding: '15px 20px', textAlign: 'left', color: 'var(--admin-text-muted)', fontSize: '0.85rem' }}>Status</th>
                            <th style={{ padding: '15px 20px', textAlign: 'right', color: 'var(--admin-text-muted)', fontSize: '0.85rem' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {staffList.length === 0 ? (
                            <tr>
                                <td colSpan="5" style={{ padding: '40px 0', textAlign: 'center', color: 'var(--admin-text-muted)' }}>No staff members found.</td>
                            </tr>
                        ) : (
                            staffList.map((member) => (
                                <tr key={member._id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                    <td style={{ padding: '15px 20px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                            <div style={{ width: '40px', height: '40px', background: 'var(--admin-accent-soft)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--admin-accent)', fontWeight: 'bold' }}>
                                                {member.name.charAt(0).toUpperCase()}
                                            </div>
                                            <div>
                                                <div style={{ color: 'var(--admin-text-main)', fontWeight: '500' }}>{member.name}</div>
                                                <div style={{ fontSize: '0.75rem', color: 'var(--admin-text-muted)' }}>ID: {member._id.slice(-6)}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td style={{ padding: '15px 20px' }}>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'var(--admin-text-main)', fontSize: '0.9rem' }}>
                                                <Shield size={14} color="var(--admin-accent)" />
                                                {member.role.charAt(0).toUpperCase() + member.role.slice(1)}
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'var(--admin-text-muted)', fontSize: '0.8rem' }}>
                                                <MapPin size={14} />
                                                {member.assignedOutlet || 'Multiple Outlets'}
                                            </div>
                                        </div>
                                    </td>
                                    <td style={{ padding: '15px 20px' }}>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '0.85rem' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--admin-text-muted)' }}>
                                                <Mail size={14} /> {member.email}
                                            </div>
                                            {member.phone && (
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--admin-text-muted)' }}>
                                                    <Phone size={14} /> {member.phone}
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                    <td style={{ padding: '15px 20px' }}>
                                        <span style={{
                                            padding: '4px 10px',
                                            borderRadius: '6px',
                                            fontSize: '0.75rem',
                                            background: member.status === 'active' ? 'rgba(74, 222, 128, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                                            color: member.status === 'active' ? '#4ade80' : '#ef4444',
                                            fontWeight: '600'
                                        }}>
                                            {member.status ? member.status.toUpperCase() : 'ACTIVE'}
                                        </span>
                                    </td>
                                    <td style={{ padding: '15px 20px', textAlign: 'right' }}>
                                        <div style={{ position: 'relative', display: 'inline-block' }}>
                                            <button
                                                className="header-icon-btn"
                                                onClick={() => setActiveDropdown(activeDropdown === member._id ? null : member._id)}
                                            >
                                                <MoreVertical size={18} />
                                            </button>

                                            {activeDropdown === member._id && (
                                                <div style={{
                                                    position: 'absolute',
                                                    right: 0,
                                                    top: '100%',
                                                    background: '#1a1a1a',
                                                    border: '1px solid var(--admin-border)',
                                                    borderRadius: '8px',
                                                    boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
                                                    zIndex: 10,
                                                    width: '140px',
                                                    overflow: 'hidden'
                                                }}>
                                                    <button
                                                        className="dropdown-item"
                                                        style={{ width: '100%', padding: '10px 15px', border: 'none', background: 'none', textAlign: 'left', color: 'var(--admin-text-main)', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
                                                        onClick={() => navigate(`/admin/staff-setup/edit/${member._id}`)}
                                                    >
                                                        <Edit2 size={14} /> Edit Staff
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default StaffList;
