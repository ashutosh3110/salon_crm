import React from 'react';
import {
    Award, Star, Calendar, MapPin,
    Gift, MessageSquare, Receipt, ArrowRight,
    Scissors, Sparkles, Smile, Heart, ShieldCheck,
    Truck, Quote, Facebook, Instagram, Twitter
} from 'lucide-react';
import HomeSalonWomen from '../components/HomeSalonWomen';
import '../customer.css';

const Home = () => {
    const user = {
        name: 'Ashutosh',
        loyaltyPoints: 1250,
        membership: 'Gold Member',
        membershipStatus: 'Active',
        avatar: 'https://i.pravatar.cc/150?u=ashutosh',
        heroImage: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=800&auto=format&fit=crop'
    };

    const upcomingAppointment = {
        date: 'Sunday, 22 June',
        time: '11:30 AM',
        salon: 'Bloom & Blossom - Bandra',
        service: 'Hair Styling & Spa'
    };

    const quickActions = [
        { icon: <Calendar size={24} />, label: 'Book Now', path: '/app/book' },
        { icon: <Gift size={24} />, label: 'Offers', path: '/app/offers' },
        { icon: <MessageSquare size={24} />, label: 'Refer', path: '#' },
        { icon: <Receipt size={24} />, label: 'Bills', path: '#' },
    ];

    const testimonials = [
        { id: 1, name: 'Priya S.', text: 'Best hair spa experience ever! The staff is so polite.', rating: 5, avatar: 'https://i.pravatar.cc/150?u=priya' },
        { id: 2, name: 'Anjali R.', text: 'Finally a salon that understands curly hair! Highly recommend Sansa.', rating: 5, avatar: 'https://i.pravatar.cc/150?u=anjali' },
        { id: 3, name: 'Rahul K.', text: 'Fast, efficient and premium. The Bandra outlet is stunning.', rating: 4, avatar: 'https://i.pravatar.cc/150?u=rahul' },
    ];

    const benefits = [
        { icon: <ShieldCheck size={24} />, title: 'Hygiene First', desc: '100% Sanitized Tools' },
        { icon: <Heart size={24} />, title: 'Expert Care', desc: 'Certified Specialists' },
        { icon: <Truck size={24} />, title: 'Home Service', desc: 'Beauty at your doorstep' },
        { icon: <Sparkles size={24} />, title: 'Premium Products', desc: 'L-Oreal & Dyson Used' }
    ];

    const experts = [
        { id: 1, name: 'Jill', role: 'Sr. Stylist', img: 'https://i.pravatar.cc/150?u=jill' },
        { id: 2, name: 'Sansa', role: 'Skin Expert', img: 'https://i.pravatar.cc/150?u=sansa' },
        { id: 3, name: 'Bob', role: 'Hair Master', img: 'https://i.pravatar.cc/150?u=bob' },
        { id: 4, name: 'Arya', role: 'Makeup Artist', img: 'https://i.pravatar.cc/150?u=arya' },
    ];

    return (
        <div className="home-container" style={{ paddingBottom: '120px' }}>
            {/* Standard Text Header */}
            <header className="home-header animate-fade-in">
                <div className="greeting">
                    <p>Good Morning,</p>
                    <h2 style={{ fontSize: '1.6rem' }}>Hi, {user.name} 👋</h2>
                </div>
                <img src={user.avatar} alt="Profile" className="profile-avatar-small animate-scale-in" />
            </header>

            {/* Loyalty & Status Strip */}
            <div style={{ padding: '0 20px', marginBottom: '25px' }} className="animate-slide-up delay-1">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--customer-card-bg)', padding: '12px 18px', borderRadius: '14px', border: '1px solid var(--customer-border)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Award size={18} color="var(--customer-accent)" />
                        <span style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>{user.loyaltyPoints} Pts</span>
                    </div>
                    <div style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--customer-accent)' }}>
                        {user.membership}
                    </div>
                </div>
            </div>

            {/* Quick Actions Grid */}
            <div className="quick-actions-grid animate-slide-up delay-1">
                {quickActions.map((action, i) => (
                    <div key={i} className="action-item">
                        <div className="action-icon">
                            {action.icon}
                        </div>
                        <span>{action.label}</span>
                    </div>
                ))}
            </div>

            {/* Hero Image in Middle */}
            <div className="promo-hero-card animate-scale-in delay-2" style={{ backgroundImage: `url(${user.heroImage})` }}>
                <div className="promo-content">
                    <h3 style={{ margin: '0', fontSize: '1.4rem', color: '#fff' }}>Luxury Hair Spa</h3>
                    <p style={{ margin: '5px 0 15px 0', fontSize: '0.8rem', color: 'rgba(255,255,255,0.9)' }}>Experience premium hair care starting at ₹1299</p>
                    <button style={{ background: '#fff', color: '#000', border: 'none', padding: '8px 18px', borderRadius: '8px', fontSize: '0.75rem', fontWeight: '700' }}>Book Now</button>
                </div>
            </div>

            {/* Upcoming Appointment */}
            <div className="section-title animate-fade-in delay-2">
                <h3>Upcoming Visit</h3>
                <span style={{ fontSize: '0.8rem' }}>View All</span>
            </div>
            <div className="mobile-card animate-slide-up delay-2">
                <div style={{ display: 'flex', gap: '15px' }}>
                    <div style={{ background: 'var(--customer-accent)', borderRadius: '12px', padding: '10px', textAlign: 'center', minWidth: '60px' }}>
                        <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'rgba(255,255,255,0.8)' }}>June</div>
                        <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>22</div>
                    </div>
                    <div style={{ flex: 1 }}>
                        <h4 style={{ margin: '0 0 5px 0', fontSize: '1rem' }}>{upcomingAppointment.service}</h4>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.8rem', color: 'var(--customer-text-muted)' }}>
                            <MapPin size={12} /> {upcomingAppointment.salon}
                        </div>
                    </div>
                </div>
            </div>

            {/* Meet Our Specialists */}
            <div className="section-title animate-fade-in delay-3">
                <h3>Our Specialists</h3>
            </div>
            <div className="staff-scroll animate-slide-up delay-3">
                {experts.map(expert => (
                    <div key={expert.id} className="staff-avatar-item" style={{ minWidth: '80px' }}>
                        <img src={expert.img} className="avatar-circle" style={{ width: '65px', height: '65px', border: '2px solid rgba(184, 92, 92, 0.2)' }} alt={expert.name} />
                        <span style={{ fontSize: '0.8rem', fontWeight: '700', marginTop: '4px' }}>{expert.name}</span>
                        <span style={{ fontSize: '0.65rem', color: 'var(--customer-text-muted)' }}>{expert.role}</span>
                    </div>
                ))}
            </div>

            {/* Home Salon For Women section */}
            <div className="animate-slide-up delay-3">
                <HomeSalonWomen />
            </div>

            {/* Why Choose Us Benefits */}
            <div className="section-title animate-fade-in delay-3">
                <h3>Why Bloom & Blossom?</h3>
            </div>
            <div className="benefits-grid animate-slide-up delay-3">
                {benefits.map((b, i) => (
                    <div key={i} className="benefit-item">
                        {b.icon}
                        <h4>{b.title}</h4>
                        <p>{b.desc}</p>
                    </div>
                ))}
            </div>

            {/* Testimonials */}
            <div className="section-title animate-fade-in delay-4">
                <h3>Customer Love</h3>
            </div>
            <div className="testimonial-scroll animate-slide-up delay-4">
                {testimonials.map(t => (
                    <div key={t.id} className="testimonial-card">
                        <div className="testimonial-header">
                            <img src={t.avatar} className="client-avatar" alt={t.name} />
                            <div style={{ flex: 1 }}>
                                <div style={{ fontSize: '0.85rem', fontWeight: '700' }}>{t.name}</div>
                                <div style={{ display: 'flex', gap: '2px' }}>
                                    {[...Array(t.rating)].map((_, i) => <Star key={i} size={10} fill="#fbbf24" stroke="none" />)}
                                </div>
                            </div>
                            <Quote size={20} className="quote-icon" />
                        </div>
                        <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--customer-text-muted)', fontStyle: 'italic', lineHeight: '1.4' }}>
                            "{t.text}"
                        </p>
                    </div>
                ))}
            </div>

            {/* Special Offers Section */}
            <div className="section-title animate-fade-in delay-4">
                <h3>Limited Time Offers</h3>
                <ArrowRight size={18} />
            </div>
            <div className="banner-scroll animate-slide-up delay-4">
                <div className="offer-banner" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=800&auto=format&fit=crop)' }}>
                    <div className="banner-overlay">
                        <div style={{ background: 'var(--customer-accent)', padding: '2px 8px', borderRadius: '4px', fontSize: '0.6rem', alignSelf: 'flex-start', marginBottom: '8px' }}>50% OFF</div>
                        <h4 style={{ margin: '0', fontSize: '1.2rem', color: '#fff' }}>Summer Glow</h4>
                    </div>
                </div>
                <div className="offer-banner" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?q=80&w=800&auto=format&fit=crop)' }}>
                    <div className="banner-overlay">
                        <div style={{ background: '#b8860b', padding: '2px 8px', borderRadius: '4px', fontSize: '0.6rem', alignSelf: 'flex-start', marginBottom: '8px' }}>BEST</div>
                        <h4 style={{ margin: '0', fontSize: '1.2rem', color: '#fff' }}>Keratin Magic</h4>
                    </div>
                </div>
            </div>

            {/* Footer / Social Connect */}
            <div className="animate-fade-in delay-5" style={{ padding: '40px 20px', textAlign: 'center', background: 'rgba(255,255,255,0.02)', borderTop: '1px solid var(--customer-border)' }}>
                <h2 style={{ fontSize: '1.4rem', fontFamily: 'Playfair Display, serif', marginBottom: '10px' }}>Bloom & Blossom</h2>
                <p style={{ fontSize: '0.8rem', color: 'var(--customer-text-muted)', marginBottom: '20px' }}>Your premium beauty sanctuary in the city.</p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '30px' }}>
                    <Instagram size={24} color="var(--customer-text-muted)" />
                    <Facebook size={24} color="var(--customer-text-muted)" />
                    <Twitter size={24} color="var(--customer-text-muted)" />
                </div>
                <p style={{ fontSize: '0.6rem', color: 'var(--customer-text-muted)', opacity: 0.5 }}>
                    © 2026 Bloom & Blossom Salon CRM. All Rights Reserved.
                </p>
            </div>
        </div>
    );
};

export default Home;
