import React, { useState } from 'react';
import { addStaff } from '../../api/onboarding';

const Step3_StaffAdd = ({ onNext }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'stylist'
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await addStaff(formData);
            onNext();
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="step-content">
            <h2>Add Your First Team Member</h2>
            <p>Invite a stylist or manager to your salon.</p>

            {error && <div className="auth-error">{error}</div>}

            <form onSubmit={handleSubmit} className="onboarding-form">
                <div className="form-group">
                    <label>Staff Full Name</label>
                    <input
                        type="text"
                        placeholder="Jane Smith"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Staff Email</label>
                    <input
                        type="email"
                        placeholder="jane@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Login Password</label>
                    <input
                        type="password"
                        placeholder="Min 8 chars with num"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Role</label>
                    <select
                        value={formData.role}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    >
                        <option value="stylist">Stylist</option>
                        <option value="manager">Manager</option>
                        <option value="receptionist">Receptionist</option>
                    </select>
                </div>
                <button type="submit" className="bb-btn bb-btn-gold onboarding-btn" disabled={loading}>
                    {loading ? 'Adding...' : 'Add Staff & Finish'}
                </button>
            </form>
        </div>
    );
};

export default Step3_StaffAdd;
