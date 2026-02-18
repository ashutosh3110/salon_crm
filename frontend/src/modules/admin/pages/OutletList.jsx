import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getOutlets } from '../../../api/admin';
import { Briefcase, MapPin, Phone, MoreVertical, Settings, Edit2 } from 'lucide-react';

const OutletList = () => {
    const navigate = useNavigate();
    const [outlets, setOutlets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [activeDropdown, setActiveDropdown] = useState(null);

    useEffect(() => {
        const fetchOutlets = async () => {
            try {
                let apiResults = [];
                try {
                    const data = await getOutlets();
                    apiResults = data.results || [];
                } catch (apiErr) {
                    console.warn('API fetch failed, showing local only:', apiErr);
                }

                // Get temporary outlets from localStorage
                const localOutlets = JSON.parse(localStorage.getItem('temp_outlets') || '[]');

                // Merge and remove duplicates (prefer API data if exists with same ID)
                const merged = [...apiResults];
                localOutlets.forEach(local => {
                    if (!merged.find(api => api._id === local._id)) {
                        merged.push(local);
                    }
                });

                setOutlets(merged);
            } catch (err) {
                console.error('Fetch outlets error:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchOutlets();
    }, []);

    if (loading) return <div className="admin-wrapper" style={{ padding: '30px' }}>Loading outlets...</div>;
    if (error) return (
        <div className="admin-wrapper" style={{ padding: '30px' }}>
            <div className="auth-error" style={{ marginBottom: '20px' }}>{error}</div>
            <button className="bb-btn bb-btn-gold" onClick={() => window.location.reload()}>Retry</button>
        </div>
    );

    const outletsList = Array.isArray(outlets) ? outlets : [];

    return (
        <div className="outlets-page">
            <div className="card-header" style={{ marginBottom: '25px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 className="card-title">My Outlets</h2>
                <button
                    className="bb-btn bb-btn-gold"
                    style={{ padding: '10px 20px', fontSize: '0.9rem' }}
                    onClick={() => navigate('/admin/outlets/add')}
                >
                    + Add New Outlet
                </button>
            </div>

            <div className="dashboard-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))' }}>
                {outletsList.length === 0 ? (
                    <div className="content-card" style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '50px' }}>
                        <Briefcase size={40} color="var(--admin-accent)" style={{ marginBottom: '15px' }} />
                        <p>No outlets found. Please add your first outlet.</p>
                    </div>
                ) : (
                    outletsList.map((outlet) => (
                        <div key={outlet._id} className="content-card" style={{ position: 'relative' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
                                <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                                    <div style={{ padding: '10px', background: 'var(--admin-accent-soft)', borderRadius: '12px' }}>
                                        <Briefcase size={22} color="var(--admin-accent)" />
                                    </div>
                                    <div>
                                        <h3 style={{ margin: 0, fontSize: '1.2rem', color: 'var(--admin-text-main)' }}>{outlet.name}</h3>
                                        {outlet.isMain && <span style={{ fontSize: '0.7rem', background: 'rgba(184, 92, 92, 0.2)', color: 'var(--admin-accent)', padding: '2px 8px', borderRadius: '10px', fontWeight: '600' }}>MAIN BRANCH</span>}
                                    </div>
                                </div>
                                <div style={{ position: 'relative' }}>
                                    <button
                                        className="header-icon-btn"
                                        onClick={() => setActiveDropdown(activeDropdown === outlet._id ? null : outlet._id)}
                                    >
                                        <MoreVertical size={18} />
                                    </button>

                                    {activeDropdown === outlet._id && (
                                        <div style={{
                                            position: 'absolute',
                                            right: 0,
                                            top: '100%',
                                            background: '#1a1a1a',
                                            border: '1px solid var(--admin-border)',
                                            borderRadius: '8px',
                                            boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
                                            zIndex: 10,
                                            width: '160px',
                                            overflow: 'hidden'
                                        }}>
                                            <button
                                                className="dropdown-item"
                                                style={{ width: '100%', padding: '10px 15px', border: 'none', background: 'none', textAlign: 'left', color: 'var(--admin-text-main)', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
                                                onClick={() => navigate(`/admin/outlets/edit/${outlet._id}`)}
                                            >
                                                <Edit2 size={14} /> Edit
                                            </button>
                                            <button
                                                className="dropdown-item"
                                                style={{ width: '100%', padding: '10px 15px', border: 'none', background: 'none', textAlign: 'left', color: 'var(--admin-text-main)', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
                                                onClick={() => navigate(`/admin/outlets/settings/${outlet._id}`)}
                                            >
                                                <Settings size={14} /> Settings
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', color: 'var(--admin-text-muted)', fontSize: '0.9rem' }}>
                                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                    <MapPin size={16} />
                                    <span>{outlet.address}</span>
                                </div>
                                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                    <Phone size={16} />
                                    <span>{outlet.phone}</span>
                                </div>
                                <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span style={{
                                        padding: '4px 12px',
                                        borderRadius: '20px',
                                        fontSize: '0.8rem',
                                        background: outlet.status === 'active' ? 'rgba(74, 222, 128, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                                        color: outlet.status === 'active' ? '#4ade80' : '#ef4444'
                                    }}>
                                        {outlet.status.toUpperCase()}
                                    </span>
                                    <button
                                        className="bb-btn bb-btn-outline"
                                        style={{ padding: '6px 15px', fontSize: '0.8rem' }}
                                        onClick={() => navigate(`/admin/outlets/settings/${outlet._id}`)}
                                    >
                                        Manage
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default OutletList;
