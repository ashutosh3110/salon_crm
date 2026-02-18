import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { UserCheck, ArrowLeft, Save, Shield, MapPin, Mail, Phone, Lock } from 'lucide-react';
import { getOutlets } from '../../../api/admin';

const StaffForm = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEdit = !!id;

    const [outlets, setOutlets] = useState([]);
    const [loading, setLoading] = useState(false);
    const [fetchingOutlets, setFetchingOutlets] = useState(true);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        role: 'stylist',
        assignedOutlet: '',
        status: 'active',
        commission: '10'
    });

    useEffect(() => {
        const fetchOutlets = async () => {
            try {
                const data = await getOutlets();
                const apiOutlets = data.results || [];
                const localOutlets = JSON.parse(localStorage.getItem('temp_outlets') || '[]');
                const merged = [...apiOutlets];
                localOutlets.forEach(local => {
                    if (!merged.find(api => api._id === local._id)) merged.push(local);
                });
                setOutlets(merged);
                if (merged.length > 0) {
                    setFormData(prev => ({ ...prev, assignedOutlet: merged[0].name }));
                }
            } catch (err) {
                console.error('Error fetching outlets:', err);
            } finally {
                setFetchingOutlets(false);
            }
        };
        fetchOutlets();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Save to localStorage for instant check
            const mockStaff = {
                ...formData,
                _id: isEdit ? id : 'staff_' + Date.now(),
                createdAt: new Date().toISOString()
            };

            const existingMocks = JSON.parse(localStorage.getItem('temp_staff') || '[]');
            if (isEdit) {
                const updatedMocks = existingMocks.map(m => m._id === id ? mockStaff : m);
                localStorage.setItem('temp_staff', JSON.stringify(updatedMocks));
            } else {
                localStorage.setItem('temp_staff', JSON.stringify([...existingMocks, mockStaff]));
            }

            setTimeout(() => {
                setLoading(false);
                navigate('/admin/staff-setup');
            }, 800);
        } catch (err) {
            console.error('Save failed:', err);
            setLoading(false);
        }
    };

    return (
        <div className="staff-form-page">
            <div style={{ marginBottom: '25px', display: 'flex', alignItems: 'center', gap: '15px' }}>
                <button
                    onClick={() => navigate('/admin/staff-setup')}
                    className="header-icon-btn"
                    style={{ background: 'var(--admin-bg-light)' }}
                >
                    <ArrowLeft size={20} />
                </button>
                <h2 className="card-title" style={{ margin: 0 }}>
                    {isEdit ? 'Edit Staff Member' : 'Add New Staff Member'}
                </h2>
            </div>

            <div className="content-card" style={{ maxWidth: '900px' }}>
                <form onSubmit={handleSubmit}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '25px' }}>
                        {/* Section 1: Basic Info */}
                        <div style={{ gridColumn: '1 / -1' }}>
                            <h3 style={{ fontSize: '1rem', color: 'var(--admin-accent)', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <UserCheck size={18} /> Basic Information
                            </h3>
                        </div>

                        <div className="form-group">
                            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--admin-text-main)', fontSize: '0.9rem' }}>Full Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="e.g. Rahul Sharma"
                                required
                                style={{ width: '100%', padding: '12px', background: 'var(--admin-bg-main)', border: '1px solid var(--admin-border)', borderRadius: '8px', color: 'var(--admin-text-main)' }}
                            />
                        </div>

                        <div className="form-group">
                            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--admin-text-main)', fontSize: '0.9rem' }}>Email Address</label>
                            <div style={{ position: 'relative' }}>
                                <Mail size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--admin-text-muted)' }} />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="rahul@example.com"
                                    required
                                    style={{ width: '100%', padding: '12px 12px 12px 40px', background: 'var(--admin-bg-main)', border: '1px solid var(--admin-border)', borderRadius: '8px', color: 'var(--admin-text-main)' }}
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--admin-text-main)', fontSize: '0.9rem' }}>Phone Number</label>
                            <div style={{ position: 'relative' }}>
                                <Phone size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--admin-text-muted)' }} />
                                <input
                                    type="text"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="+91 98765 43210"
                                    required
                                    style={{ width: '100%', padding: '12px 12px 12px 40px', background: 'var(--admin-bg-main)', border: '1px solid var(--admin-border)', borderRadius: '8px', color: 'var(--admin-text-main)' }}
                                />
                            </div>
                        </div>

                        {!isEdit && (
                            <div className="form-group">
                                <label style={{ display: 'block', marginBottom: '8px', color: 'var(--admin-text-main)', fontSize: '0.9rem' }}>Password</label>
                                <div style={{ position: 'relative' }}>
                                    <Lock size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--admin-text-muted)' }} />
                                    <input
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="Min 8 characters"
                                        required
                                        style={{ width: '100%', padding: '12px 12px 12px 40px', background: 'var(--admin-bg-main)', border: '1px solid var(--admin-border)', borderRadius: '8px', color: 'var(--admin-text-main)' }}
                                    />
                                </div>
                            </div>
                        )}

                        {/* Section 2: Role & Outlet */}
                        <div style={{ gridColumn: '1 / -1', marginTop: '10px' }}>
                            <h3 style={{ fontSize: '1rem', color: 'var(--admin-accent)', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <Shield size={18} /> Role & Assignment
                            </h3>
                        </div>

                        <div className="form-group">
                            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--admin-text-main)', fontSize: '0.9rem' }}>Staff Role</label>
                            <select
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                                style={{ width: '100%', padding: '12px', background: 'var(--admin-bg-main)', border: '1px solid var(--admin-border)', borderRadius: '8px', color: 'var(--admin-text-main)' }}
                            >
                                <option value="manager">Manager</option>
                                <option value="stylist">Stylist / Professional</option>
                                <option value="receptionist">Receptionist</option>
                                <option value="accountant">Accountant</option>
                                <option value="inventory_manager">Inventory Manager</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--admin-text-main)', fontSize: '0.9rem' }}>Assign Outlet</label>
                            <div style={{ position: 'relative' }}>
                                <MapPin size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--admin-text-muted)' }} />
                                <select
                                    name="assignedOutlet"
                                    value={formData.assignedOutlet}
                                    onChange={handleChange}
                                    style={{ width: '100%', padding: '12px 12px 12px 40px', background: 'var(--admin-bg-main)', border: '1px solid var(--admin-border)', borderRadius: '8px', color: 'var(--admin-text-main)' }}
                                >
                                    {outlets.length === 0 ? (
                                        <option value="">No Outlets Available</option>
                                    ) : (
                                        outlets.map(o => (
                                            <option key={o._id} value={o.name}>{o.name}</option>
                                        ))
                                    )}
                                </select>
                            </div>
                        </div>

                        <div className="form-group">
                            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--admin-text-main)', fontSize: '0.9rem' }}>Service Commission (%)</label>
                            <input
                                type="number"
                                name="commission"
                                value={formData.commission}
                                onChange={handleChange}
                                placeholder="10"
                                style={{ width: '100%', padding: '12px', background: 'var(--admin-bg-main)', border: '1px solid var(--admin-border)', borderRadius: '8px', color: 'var(--admin-text-main)' }}
                            />
                        </div>

                        <div className="form-group">
                            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--admin-text-main)', fontSize: '0.9rem' }}>Status</label>
                            <select
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                style={{ width: '100%', padding: '12px', background: 'var(--admin-bg-main)', border: '1px solid var(--admin-border)', borderRadius: '8px', color: 'var(--admin-text-main)' }}
                            >
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </select>
                        </div>
                    </div>

                    <div style={{ marginTop: '40px', display: 'flex', gap: '15px', borderTop: '1px solid var(--admin-border)', paddingTop: '25px' }}>
                        <button
                            type="submit"
                            className="bb-btn bb-btn-gold"
                            disabled={loading}
                            style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 30px' }}
                        >
                            <Save size={18} /> {loading ? 'Saving...' : 'Save Staff Member'}
                        </button>
                        <button
                            type="button"
                            onClick={() => navigate('/admin/staff-setup')}
                            className="bb-btn bb-btn-outline"
                            style={{ padding: '12px 30px' }}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default StaffForm;
