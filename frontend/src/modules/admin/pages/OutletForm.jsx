import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Briefcase, ArrowLeft, Save } from 'lucide-react';
import { createOutlet } from '../../../api/admin';

const OutletForm = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEdit = !!id;

    const [formData, setFormData] = useState({
        name: '',
        address: '',
        phone: '',
        status: 'active',
        isMain: false
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Save to localStorage for instant frontend check as requested
            const mockOutlet = {
                ...formData,
                _id: 'mock_' + Date.now(),
                createdAt: new Date().toISOString()
            };

            const existingMocks = JSON.parse(localStorage.getItem('temp_outlets') || '[]');
            localStorage.setItem('temp_outlets', JSON.stringify([...existingMocks, mockOutlet]));

            // Also try backend for real sync
            try {
                await createOutlet(formData);
            } catch (err) {
                console.warn('Real backend save failed, using local fallback:', err);
            }

            setTimeout(() => {
                setLoading(false);
                navigate('/admin/outlets');
            }, 800);
        } catch (err) {
            console.error('Save failed:', err);
            setLoading(false);
        }
    };

    return (
        <div className="outlet-form-page">
            <div style={{ marginBottom: '25px', display: 'flex', alignItems: 'center', gap: '15px' }}>
                <button
                    onClick={() => navigate('/admin/outlets')}
                    className="header-icon-btn"
                    style={{ background: 'var(--admin-bg-light)' }}
                >
                    <ArrowLeft size={20} />
                </button>
                <h2 className="card-title" style={{ margin: 0 }}>
                    {isEdit ? 'Edit Outlet' : 'Add New Outlet'}
                </h2>
            </div>

            <div className="content-card" style={{ maxWidth: '800px' }}>
                <form onSubmit={handleSubmit}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                        <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--admin-text-main)' }}>Outlet Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="e.g. Downtown Branch"
                                required
                                style={{ width: '100%', padding: '12px', background: 'var(--admin-bg-main)', border: '1px solid var(--admin-border)', borderRadius: '8px', color: 'var(--admin-text-main)' }}
                            />
                        </div>

                        <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--admin-text-main)' }}>Full Address</label>
                            <textarea
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                placeholder="Enter complete address"
                                required
                                style={{ width: '100%', padding: '12px', background: 'var(--admin-bg-main)', border: '1px solid var(--admin-border)', borderRadius: '8px', color: 'var(--admin-text-main)', minHeight: '100px', resize: 'vertical' }}
                            ></textarea>
                        </div>

                        <div className="form-group">
                            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--admin-text-main)' }}>Phone Number</label>
                            <input
                                type="text"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="+1 234 567 890"
                                required
                                style={{ width: '100%', padding: '12px', background: 'var(--admin-bg-main)', border: '1px solid var(--admin-border)', borderRadius: '8px', color: 'var(--admin-text-main)' }}
                            />
                        </div>

                        <div className="form-group">
                            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--admin-text-main)' }}>Status</label>
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

                        <div className="form-group" style={{ gridColumn: '1 / -1', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <input
                                type="checkbox"
                                name="isMain"
                                id="isMain"
                                checked={formData.isMain}
                                onChange={handleChange}
                                style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                            />
                            <label htmlFor="isMain" style={{ color: 'var(--admin-text-main)', cursor: 'pointer' }}>Set as Main Branch</label>
                        </div>
                    </div>

                    <div style={{ marginTop: '30px', display: 'flex', gap: '15px' }}>
                        <button
                            type="submit"
                            className="bb-btn bb-btn-gold"
                            disabled={loading}
                            style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 30px' }}
                        >
                            <Save size={18} /> {loading ? 'Saving...' : 'Save Outlet'}
                        </button>
                        <button
                            type="button"
                            onClick={() => navigate('/admin/outlets')}
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

export default OutletForm;
