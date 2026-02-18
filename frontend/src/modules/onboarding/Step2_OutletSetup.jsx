import React, { useState } from 'react';
import { createOutlet } from '../../api/onboarding';

const Step2_OutletSetup = ({ onNext }) => {
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        phone: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await createOutlet({
                ...formData,
                workingHours: [
                    { day: 'Monday', isOpen: true, openTime: '09:00', closeTime: '21:00' },
                    { day: 'Tuesday', isOpen: true, openTime: '09:00', closeTime: '21:00' },
                    { day: 'Wednesday', isOpen: true, openTime: '09:00', closeTime: '21:00' },
                    { day: 'Thursday', isOpen: true, openTime: '09:00', closeTime: '21:00' },
                    { day: 'Friday', isOpen: true, openTime: '09:00', closeTime: '21:00' },
                    { day: 'Saturday', isOpen: true, openTime: '09:00', closeTime: '21:00' },
                    { day: 'Sunday', isOpen: false }
                ]
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
            <h2>Setup Your First Outlet</h2>
            <p>Tell us where your branch is located.</p>

            {error && <div className="auth-error">{error}</div>}

            <form onSubmit={handleSubmit} className="onboarding-form">
                <div className="form-group">
                    <label>Outlet Name (e.g. Main Branch)</label>
                    <input
                        type="text"
                        placeholder="Main Branch"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Full Address</label>
                    <textarea
                        rows="3"
                        style={{ background: '#1a1a1a', border: '1px solid var(--color-border)', borderRadius: '8px', color: 'white', padding: '12px' }}
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Outlet Phone</label>
                    <input
                        type="text"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        required
                    />
                </div>
                <button type="submit" className="bb-btn bb-btn-gold onboarding-btn" disabled={loading}>
                    {loading ? 'Creating...' : 'Create Outlet & Next'}
                </button>
            </form>
        </div>
    );
};

export default Step2_OutletSetup;
