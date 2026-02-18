import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from './context/ThemeContext';
import './LandingPage.css';

const LandingPage = () => {
    const { themeMode, toggleThemeMode } = useTheme();
    const navigate = useNavigate();
    const [activeFaq, setActiveFaq] = useState(null);
    const [isYearly, setIsYearly] = useState(false);

    const toggleFaq = (index) => {
        setActiveFaq(activeFaq === index ? null : index);
    };

    const handleBookCall = () => {
        navigate('/request-demo');
    };

    const handleStartFreeTrial = () => {
        navigate('/register?plan=free');
    };

    const plans = [
        {
            name: 'Free',
            monthlyPrice: '0',
            yearlyPrice: '0',
            features: ['1 Outlet', '3 Staff Members', 'Basic Reports', 'Online Booking'],
            popular: false
        },
        {
            name: 'Pro',
            monthlyPrice: '29',
            yearlyPrice: '25',
            features: ['3 Outlets', '10 Staff Members', 'Advanced Analytics', 'Inventory Management', 'SMS Notifications'],
            popular: true
        },
        {
            name: 'Premium',
            monthlyPrice: '79',
            yearlyPrice: '69',
            features: ['Unlimited Outlets', 'Unlimited Staff', 'Marketing Suite', 'Loyalty Program', 'Custom Branding'],
            popular: false
        },
        {
            name: 'Enterprise',
            monthlyPrice: 'Custom',
            yearlyPrice: 'Custom',
            features: ['Multi-Region Support', 'Dedicated Manager', 'Custom Integrations', '24/7 Priority Support'],
            popular: false
        }
    ];

    const services = [
        {
            title: 'Hair Care',
            image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=800&auto=format&fit=crop',
            link: '#hair-care'
        },
        {
            title: 'Henna Designs',
            image: 'https://images.unsplash.com/photo-1560707303-4e980ce876ad?q=80&w=800&auto=format&fit=crop',
            link: '#henna'
        },
        {
            title: 'Makeup Services',
            image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=800&auto=format&fit=crop',
            link: '#makeup'
        },
        {
            title: 'Nail Care',
            image: 'https://images.unsplash.com/photo-1604654894611-6973b376cbde?q=80&w=800&auto=format&fit=crop',
            link: '#nails'
        },
        {
            title: 'Facial & Skin Care',
            image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=800&auto=format&fit=crop',
            link: '#facial'
        },
        {
            title: 'Waxing Services',
            image: 'https://images.unsplash.com/photo-1590439471364-192aa70c0b53?q=80&w=800&auto=format&fit=crop',
            link: '#waxing'
        }
    ];

    const faqs = [
        {
            q: "What are your opening hours?",
            a: "We are open daily from 10:00 AM to 9:00 PM to serve your beauty needs."
        },
        {
            q: "Do I need to book an appointment in advance?",
            a: "While we do accept walk-ins based on availability, we highly recommend booking an appointment to ensure your preferred time and stylist."
        },
        {
            q: "What brands do you use for hair and skin treatments?",
            a: "We use only premium, internationally trusted brands like L'Oréal Professional, Dermalogica, and organic products for our treatments."
        },
        {
            q: "Is there parking available?",
            a: "Yes, there is ample free parking available for our customers right outside the salon in Mussafah Shabiya."
        }
    ];

    return (
        <div className="bb-landing-page">
            {/* 1. Announcement Bar */}
            <div className="bb-announcement">
                Special Offer! Get 20% off on all services this month.
            </div>

            {/* 2. Navbar */}
            <nav className="bb-nav">
                <div className="bb-container">
                    <div className="bb-logo">
                        <img src="/logo/wapixologo1 (1).png" alt="Bloom & Blossom" />
                    </div>
                    <ul className="bb-nav-links">
                        <li><a href="#home">Home</a></li>
                        <li><a href="#about">About Us</a></li>
                        <li><a href="#services">Our Services</a></li>
                        <li><a href="#plans">Plans</a></li>
                        <li><a href="#packages">Packages</a></li>
                        <li><a href="#gallery">Gallery</a></li>
                        <li><a href="#contact">Contact Us</a></li>
                    </ul>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                        <button
                            onClick={toggleThemeMode}
                            style={{ background: 'none', border: 'none', color: 'var(--bb-text-heading)', cursor: 'pointer', padding: '5px' }}
                            title={themeMode === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                        >
                            {themeMode === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                        </button>
                        <button className="bb-btn bb-btn-dark" onClick={() => navigate('/login')}>Login</button>
                    </div>
                </div>
            </nav>

            {/* 3. Hero Section */}
            <section id="home" className="bb-hero">
                <div className="bb-container">
                    <div className="bb-hero-content bb-fade-in">
                        <h1>Discover the New You with Bloom and Blossom</h1>
                        <p>
                            Step into a realm where beauty meets luxury. At Bloom & Blossom, the most reliable ladies salon in Mussafah, we combine science and art to reveal your authentic beauty.
                        </p>
                        <div className="bb-hero-ctas">
                            <button className="bb-btn bb-btn-dark" onClick={handleStartFreeTrial}>Start Free Trial</button>
                            <button className="bb-btn bb-btn-gold" onClick={handleBookCall}>Request Demo</button>
                        </div>
                    </div>
                    <div className="bb-hero-image-wrapper">
                        <div className="bb-hero-circle">
                            <img
                                src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1000&auto=format&fit=crop"
                                alt="Beauty Salon"
                                className="bb-hero-image"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. Welcome/About Section */}
            <section id="about" className="bb-welcome">
                <div className="bb-container">
                    <div className="bb-welcome-grid">
                        <div className="bb-welcome-img">
                            <img
                                src="https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?q=80&w=800&auto=format&fit=crop"
                                alt="Our Salon"
                                style={{ width: '100%', borderRadius: 'var(--bb-radius)' }}
                            />
                        </div>
                        <div className="bb-welcome-text">
                            <h2>Welcome to Bloom & Blossom</h2>
                            <p>
                                Confidence starts with taking care of yourself, and at Bloom & Blossom, it is our goal to assist you in both looking and feeling great. Our team is ready to offer you a very comfortable, accurate, and luxurious time.
                            </p>
                            <div className="bb-stats">
                                <div className="bb-stat-item">
                                    <h3>7+</h3>
                                    <p>Years Experience</p>
                                </div>
                                <div className="bb-stat-item">
                                    <h3>3000+</h3>
                                    <p>Happy Customers</p>
                                </div>
                            </div>
                            <button className="bb-btn bb-btn-outline" style={{ marginTop: '30px' }}>Learn More</button>
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. Services Grid Section */}
            <section id="services" className="bb-services">
                <div className="bb-container">
                    <div className="bb-section-header">
                        <h2>Our Premium Services</h2>
                        <p>We’re committed to your happiness and customized each service to bring out your individuality.</p>
                    </div>
                    <div className="bb-services-grid">
                        {services.map((service, index) => (
                            <div key={index} className="bb-service-card">
                                <img src={service.image} alt={service.title} className="bb-service-image" />
                                <div className="bb-service-info">
                                    <h3>{service.title}</h3>
                                    <a href={service.link} className="bb-service-link">View Details →</a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Subscription Plans Section */}
            <section id="plans" className="bb-pricing">
                <div className="bb-container">
                    <div className="bb-section-header">
                        <h2>Flexible Plans for Every Salon</h2>
                        <p>Choose the perfect plan to scale your business with Wapixo Salon CRM.</p>
                    </div>

                    <div className="bb-pricing-toggle">
                        <span className={`bb-toggle-label ${!isYearly ? 'active' : ''}`}>Monthly</span>
                        <label className="bb-toggle-switch">
                            <input
                                type="checkbox"
                                checked={isYearly}
                                onChange={() => setIsYearly(!isYearly)}
                            />
                            <span className="bb-slider"></span>
                        </label>
                        <span className={`bb-toggle-label ${isYearly ? 'active' : ''}`}>Yearly <span style={{ color: 'var(--bb-accent-gold)', fontSize: '0.8rem' }}> (Save 15%)</span></span>
                    </div>

                    <div className="bb-pricing-grid">
                        {plans.map((plan, index) => (
                            <div key={index} className={`bb-pricing-card ${plan.popular ? 'popular' : ''}`}>
                                {plan.popular && <div className="bb-popular-badge">Most Popular</div>}
                                <div className="bb-pricing-name">{plan.name}</div>
                                <div className="bb-pricing-price">
                                    <h2>
                                        {plan.name === 'Enterprise' ? '' : '$'}
                                        {isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                                    </h2>
                                    {plan.name !== 'Enterprise' && <span>/per month</span>}
                                </div>
                                <ul className="bb-pricing-features">
                                    {plan.features.map((feature, fIndex) => (
                                        <li key={fIndex}>{feature}</li>
                                    ))}
                                </ul>
                                <button
                                    className={`bb-btn ${plan.popular ? 'bb-btn-gold' : 'bb-btn-outline'} bb-pricing-btn`}
                                    onClick={handleStartFreeTrial}
                                >
                                    {plan.name === 'Enterprise' ? 'Contact Sales' : 'Get Started'}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 6. Testimonials Section */}
            <section className="bb-testimonials">
                <div className="bb-container">
                    <div className="bb-section-header">
                        <h2>Love Hearing From You</h2>
                        <p>Our clients' satisfaction is our greatest accomplishment.</p>
                    </div>
                    <div className="bb-testimonial-grid">
                        <div className="bb-testimonial-card">
                            <span className="bb-testimonial-quote">"Absolutely amazing service! The Moroccan bath and facial were so relaxing. The staff were kind and professional. Will definitely come back!"</span>
                            <p className="bb-testimonial-author">— Sarah J.</p>
                        </div>
                        <div className="bb-testimonial-card">
                            <span className="bb-testimonial-quote">"Affordable and high quality. Loved the hair spa and pedicure combo. My hair felt soft and smooth. Great value for money!"</span>
                            <p className="bb-testimonial-author">— Maria K.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 7. FAQ Section */}
            <section className="bb-faq">
                <div className="bb-container">
                    <div className="bb-section-header">
                        <h2>Frequently Asked Questions</h2>
                        <p>Common queries answered to make your experience easier.</p>
                    </div>
                    <div className="bb-faq-list">
                        {faqs.map((faq, index) => (
                            <div key={index} className="bb-faq-item">
                                <div className="bb-faq-question" onClick={() => toggleFaq(index)}>
                                    <span>{faq.q}</span>
                                    <span>{activeFaq === index ? '−' : '+'}</span>
                                </div>
                                {activeFaq === index && (
                                    <div className="bb-faq-answer">
                                        <p>{faq.a}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 8. Footer Section */}
            <footer id="contact" className="bb-footer">
                <div className="bb-container">
                    <div className="bb-footer-grid">
                        <div className="bb-footer-col">
                            <img src="/logo/wapixologo1 (1).png" alt="Bloom & Blossom" style={{ height: '100px', marginBottom: '20px' }} />
                            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>
                                Bloom & Blossom Ladies Beauty Salon offers expert, personalized beauty care in a calming space to help you feel your best.
                            </p>
                        </div>
                        <div className="bb-footer-col">
                            <h6>Quick Links</h6>
                            <ul>
                                <li><a href="#home">Home</a></li>
                                <li><a href="#about">About Us</a></li>
                                <li><a href="#services">Services</a></li>
                                <li><a href="#packages">Packages</a></li>
                            </ul>
                        </div>
                        <div className="bb-footer-col">
                            <h6>Our Services</h6>
                            <ul>
                                <li><a href="#hair">Hair Care</a></li>
                                <li><a href="#skin">Skin Care</a></li>
                                <li><a href="#makeup">Makeup</a></li>
                                <li><a href="#nails">Nail Care</a></li>
                            </ul>
                        </div>
                        <div className="bb-footer-col">
                            <h6>Contact</h6>
                            <ul style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>
                                <li>Shabiya ME-11, Abu Dhabi</li>
                                <li>+971 544 854 000</li>
                                <li>bloomandblossomuae@gmail.com</li>
                            </ul>
                        </div>
                    </div>
                    <div className="bb-footer-bottom">
                        <p>© 2025 Bloom & Blossom | All rights reserved.</p>
                        <p>Design By Ydesign</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
