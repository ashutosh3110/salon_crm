import React, { useState, useEffect } from 'react';
import { confirmSalon } from '../../api/onboarding';

const Step1_SalonDetails = ({ onNext, initialData }) => {
    const [formData, setFormData] = useState({
        name: initialData?.name || '',
        phone: initialData?.phone || '',
        currency: 'INR',
        timezone: 'Asia/Kolkata'
    });

    useEffect(() => {
        if (initialData) {
            setFormData(prev => ({
                ...prev,
                name: initialData.name || prev.name,
                phone: initialData.phone || prev.phone
            }));
        }
    }, [initialData]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await confirmSalon({
                name: formData.name,
                phone: formData.phone,
                settings: {
                    currency: formData.currency,
                    timezone: formData.timezone
                }
            });
            onNext();
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="step-content">
            <h2>Confirm Salon Details</h2>
            <p>Make sure your salon information is correct.</p>

            {error && <div className="auth-error">{error}</div>}

            <form onSubmit={handleSubmit} className="onboarding-form">
                <div className="form-group">
                    <label>Salon Name</label>
                    <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Business Phone</label>
                    <input
                        type="text"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        required
                    />
                </div>
                <div className="form-row">
                    <div className="form-group">
                        <label>Currency</label>
                        <select
                            value={formData.currency}
                            onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                        >
                            <option value="INR">INR (₹)</option>
                            <option value="USD">USD ($)</option>
                            <option value="AED">AED (Dh)</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Timezone</label>
                        <select
                            value={formData.timezone}
                            onChange={(e) => setFormData({ ...formData, timezone: e.target.value })}
                        >
                            <option value="Asia/Kolkata">India (IST)</option>
                            <option value="Asia/Dubai">Dubai (GST)</option>
                            <option value="UTC">UTC</option>
                        </select>
                    </div>
                </div>
                <button type="submit" className="bb-btn bb-btn-gold onboarding-btn" disabled={loading}>
                    {loading ? 'Saving...' : 'Confirm & Continue'}
                </button>
            </form>
        </div>
    );
};

export default Step1_SalonDetails;
