import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RequestDemo.css';

const RequestDemo = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        salonName: '',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would typically send the data to your backend
        console.log('Form submitted:', formData);
        alert('Thank you for your interest! We will contact you shortly.');
        navigate('/');
    };

    return (
        <div className="rd-page">
            <div className="rd-container">
                <button onClick={() => navigate('/')} className="rd-back-btn">
                    ← Back to Home
                </button>

                <div className="rd-content">
                    <div className="rd-header">
                        <h1>Request a Demo</h1>
                        <p>Fill out the form below and our team will get in touch with you to schedule a personalized demo of Bloom & Blossom.</p>
                    </div>

                    <form className="rd-form" onSubmit={handleSubmit}>
                        <div className="rd-form-group">
                            <label htmlFor="name">Full Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                placeholder="Enter your full name"
                            />
                        </div>

                        <div className="rd-form-group">
                            <label htmlFor="email">Email Address</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                placeholder="Enter your email"
                            />
                        </div>

                        <div className="rd-form-group">
                            <label htmlFor="phone">Phone Number</label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                                placeholder="Enter your phone number"
                            />
                        </div>

                        <div className="rd-form-group">
                            <label htmlFor="salonName">Salon Name</label>
                            <input
                                type="text"
                                id="salonName"
                                name="salonName"
                                value={formData.salonName}
                                onChange={handleChange}
                                required
                                placeholder="Enter your salon name"
                            />
                        </div>

                        <div className="rd-form-group">
                            <label htmlFor="message">Message (Optional)</label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="Tell us about your specific needs or questions..."
                                rows="4"
                            ></textarea>
                        </div>

                        <button type="submit" className="rd-submit-btn">
                            Submit Request
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RequestDemo;
