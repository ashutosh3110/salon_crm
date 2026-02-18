import React from 'react';
import { motion } from 'framer-motion';
import AnimatedImageGrid from '../components/auth/AnimatedImageGrid';
import LoginForm from '../components/auth/LoginForm';
import '../auth.css';

const LoginPage = () => {
    return (
        <div className="mobile-login-container">
            {/* Top Animated Grid */}
            <AnimatedImageGrid />

            {/* Brand Logo Section */}
            <div className="form-section">
                <motion.div
                    className="logo-container"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                >
                    <h1 className="brand-logo">LUZO</h1>
                    <p className="tagline">Luxury You Aspire</p>
                </motion.div>

                {/* Login Form */}
                <LoginForm />

                {/* Footer Links */}
                <motion.footer
                    className="auth-footer"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                >
                    <p className="footer-text">
                        By continuing you agree to our <br />
                        <span>Terms of Service</span> and <span>Privacy Policy</span>
                    </p>

                    <div className="footer-links">
                        <a href="#" className="footer-link">Contact Support</a>
                        <a href="#" className="footer-link guest-link">Continue as guest</a>
                    </div>
                </motion.footer>
            </div>
        </div>
    );
};

export default LoginPage;
