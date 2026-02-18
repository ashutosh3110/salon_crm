import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { login } from '../../api/auth';
import './auth.css';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location.state?.message) {
            setSuccessMsg(location.state.message);
        }
    }, [location]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMsg('');
        setLoading(true);

        try {
            const response = await login(formData);
            const { accessToken, user } = response.data;

            // Store auth data
            localStorage.setItem('token', accessToken);
            localStorage.setItem('user', JSON.stringify(user));

            // Role-based redirection
            if (user.role === 'admin' || user.role === 'owner') {
                if (user.onboardingStatus !== 'COMPLETED') {
                    navigate('/onboarding');
                } else {
                    navigate('/admin');
                }
            } else if (user.role === 'manager' || user.role === 'receptionist') {
                navigate('/admin'); // Or specific dashboard
            } else {
                navigate('/'); // Default fallback
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <div className="auth-header">
                    <img src="/logo/wapixologo1 (1).png" alt="Logo" className="auth-logo" />
                    <h2>Welcome Back</h2>
                    <p>Login to manage your salon.</p>
                </div>

                {successMsg && <div className="auth-success">{successMsg}</div>}
                {error && <div className="auth-error">{error}</div>}

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="form-group">
                        <label>Email Address</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="admin@example.com"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button type="submit" className="bb-btn bb-btn-gold auth-btn" disabled={loading}>
                        {loading ? 'Logging in...' : 'Sign In'}
                    </button>
                </form>

                <div className="auth-footer">
                    Don't have an account? <Link to="/register">Start Free Trial</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
