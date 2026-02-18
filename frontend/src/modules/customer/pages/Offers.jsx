import React from 'react';
import {
    Tag, Gift, Zap, Scissors,
    Sparkles, Clock, Copy, Check,
    ArrowRight, Star
} from 'lucide-react';
import '../customer.css';

const Offers = () => {
    const mainOffers = [
        {
            id: 1,
            title: 'First Visit Special',
            desc: 'Get flat 50% off on your first salon service with us.',
            code: 'WELCOME50',
            discount: '50%',
            image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=600&auto=format&fit=crop',
            badge: 'NEW USER'
        },
        {
            id: 2,
            title: 'Summer Glow Package',
            desc: 'Hydra Facial + De-Tan + Face Massage at a special price.',
            code: 'GLOW2026',
            discount: '₹800',
            image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=600&auto=format&fit=crop',
            badge: 'BESTSELLER'
        }
    ];

    const bankOffers = [
        { id: 101, title: 'HDFC Bank Cards', desc: 'Flat 10% cashback up to ₹500', icon: <Zap size={20} /> },
        { id: 102, title: 'ICICI Net Banking', desc: 'Extra 5 reward points per ₹100', icon: <Star size={20} /> }
    ];

    return (
        <div className="offers-container animate-fade-in" style={{ paddingBottom: '100px' }}>
            <header className="home-header">
                <div className="greeting">
                    <h2>Special Offers</h2>
                    <p>Best deals for your beauty</p>
                </div>
                <div style={{ width: '45px', height: '45px', background: 'rgba(184, 92, 92, 0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--customer-accent)' }}>
                    <Tag size={24} />
                </div>
            </header>

            {/* Featured Offers */}
            <div className="section-title">
                <h3>Deals of the Week</h3>
            </div>
            {mainOffers.map((offer, index) => (
                <div key={offer.id} className={`offer-card animate-slide-up delay-${index + 1}`}>
                    <div className="offer-image-container">
                        <img src={offer.image} className="offer-img" alt={offer.title} />
                        <div className="offer-badge">{offer.badge}</div>
                        <div className="discount-circle">{offer.discount}</div>
                    </div>
                    <div className="offer-details">
                        <h4 style={{ margin: '0 0 5px 0', fontSize: '1.1rem' }}>{offer.title}</h4>
                        <p style={{ margin: '0', fontSize: '0.85rem', color: 'var(--customer-text-muted)', lineHeight: '1.4' }}>
                            {offer.desc}
                        </p>

                        <div className="promo-code-box">
                            <div>
                                <span style={{ fontSize: '0.6rem', color: 'var(--customer-text-muted)', display: 'block', textTransform: 'uppercase', marginBottom: '2px' }}>Promo Code</span>
                                <span className="code-text">{offer.code}</span>
                            </div>
                            <div className="copy-btn" onClick={() => { alert('Code Copied!'); }}>
                                <Copy size={16} style={{ marginBottom: '4px' }} />
                                <span>Copy</span>
                            </div>
                        </div>
                    </div>
                </div>
            ))}

            {/* Loyalty Rewards Placeholder */}
            <div className="mobile-card animate-slide-up delay-3" style={{ background: 'linear-gradient(135deg, #1e1e1e 0%, #121212 100%)', border: '1px solid rgba(251, 191, 36, 0.2)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <div style={{ width: '50px', height: '50px', background: 'rgba(251, 191, 36, 0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fbbf24' }}>
                        <Gift size={28} />
                    </div>
                    <div>
                        <h4 style={{ margin: '0', color: '#fbbf24' }}>Loyalty Rewards</h4>
                        <p style={{ margin: '4px 0 0 0', fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)' }}>Earn points on every visit and redeem for free services.</p>
                    </div>
                </div>
                <button style={{ width: '100%', marginTop: '15px', padding: '10px', background: '#fbbf24', color: '#000', border: 'none', borderRadius: '8px', fontWeight: 'bold', fontSize: '0.85rem' }}>
                    Check My Points
                </button>
            </div>

            {/* Bank & Wallet Offers */}
            <div className="section-title animate-fade-in delay-4">
                <h3>Bank & Wallet Offers</h3>
            </div>
            <div style={{ padding: '0 20px' }}>
                {bankOffers.map((bank, i) => (
                    <div key={i} className={`animate-slide-up delay-4`} style={{ display: 'flex', alignItems: 'center', gap: '15px', background: 'var(--customer-card-bg)', padding: '15px', borderRadius: '16px', marginBottom: '12px', border: '1px solid var(--customer-border)' }}>
                        <div style={{ color: 'var(--customer-accent)' }}>{bank.icon}</div>
                        <div style={{ flex: 1 }}>
                            <div style={{ fontSize: '0.9rem', fontWeight: '700' }}>{bank.title}</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--customer-text-muted)' }}>{bank.desc}</div>
                        </div>
                        <ArrowRight size={18} color="var(--customer-text-muted)" />
                    </div>
                ))}
            </div>

            {/* Referral Banner */}
            <div className="mobile-card animate-slide-up delay-5" style={{ background: 'rgba(184, 92, 92, 0.1)', borderColor: 'rgba(184, 92, 92, 0.2)', textAlign: 'center' }}>
                <div style={{ width: '40px', height: '40px', background: 'var(--customer-accent)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px auto', color: 'white' }}>
                    <Sparkles size={20} />
                </div>
                <h4 style={{ margin: '0 0 5px 0' }}>Invite & Earn</h4>
                <p style={{ margin: '0 0 15px 0', fontSize: '0.8rem', color: 'var(--customer-text-muted)' }}>Share the love! Get ₹200 for every friend who visits.</p>
                <button style={{ padding: '8px 20px', background: 'var(--customer-accent)', color: 'white', border: 'none', borderRadius: '20px', fontSize: '0.8rem', fontWeight: '700' }}>Invite Friends</button>
            </div>
        </div>
    );
};

export default Offers;
