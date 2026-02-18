import React, { useState } from 'react';
import { motion } from 'framer-motion';

const LoginForm = () => {
    const [mobileNumber, setMobileNumber] = useState('');

    const handleInputChange = (e) => {
        const val = e.target.value.replace(/\D/g, '');
        if (val.length <= 10) {
            setMobileNumber(val);
        }
    };

    return (
        <motion.div
            className="login-form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
        >
            <div className="input-group">
                <div className="mobile-input-wrapper">
                    <span className="prefix">+91</span>
                    <input
                        type="tel"
                        className="mobile-input"
                        placeholder="Enter Mobile Number"
                        value={mobileNumber}
                        onChange={handleInputChange}
                        maxLength={10}
                    />
                </div>
            </div>

            <button
                className="continue-btn"
                disabled={mobileNumber.length !== 10}
            >
                Continue
            </button>
        </motion.div>
    );
};

export default LoginForm;
