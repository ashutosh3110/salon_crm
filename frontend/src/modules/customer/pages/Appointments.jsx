import React, { useState } from 'react';
import {
    Calendar, Clock, CheckCircle2, XCircle,
    RefreshCcw, Star, FileText, Camera,
    ChevronRight, MapPin
} from 'lucide-react';
import '../customer.css';

const Appointments = () => {
    const [activeTab, setActiveTab] = useState('upcoming');

    const upcomingAppointments = [
        {
            id: 1,
            date: '22 June 2024',
            time: '11:30 AM',
            salon: 'Bloom & Blossom - Bandra',
            services: ['Luxury Haircut', 'Hair Spa'],
            status: 'confirmed',
            total: 2500
        },
        {
            id: 2,
            date: '28 June 2024',
            time: '04:00 PM',
            salon: 'Bloom & Blossom - Andheri',
            services: ['Hydra Facial'],
            status: 'confirmed',
            total: 1999
        }
    ];

    const pastAppointments = [
        {
            id: 101,
            date: '10 May 2024',
            salon: 'Bloom & Blossom - Bandra',
            services: ['Global Coloring'],
            stylist: 'Jill',
            total: 3500,
            status: 'completed',
            rating: 5,
            hasPhotos: true,
            photos: {
                before: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=200&auto=format&fit=crop',
                after: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=200&auto=format&fit=crop'
            }
        },
        {
            id: 102,
            date: '15 April 2024',
            salon: 'Bloom & Blossom - Bandra',
            services: ['Deep Conditioning'],
            stylist: 'Sansa',
            total: 1500,
            status: 'completed',
            rating: 4,
            hasPhotos: false
        }
    ];

    const renderStars = (rating) => {
        return (
            <div className="rating-stars">
                {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                        key={star}
                        size={14}
                        fill={star <= rating ? "#fbbf24" : "none"}
                        stroke={star <= rating ? "#fbbf24" : "currentColor"}
                    />
                ))}
            </div>
        );
    };

    return (
        <div className="appointments-container animate-fade-in">
            <header className="home-header" style={{ paddingBottom: '10px' }}>
                <div className="greeting">
                    <h2>My Activity</h2>
                    <p>Track your bookings</p>
                </div>
            </header>

            {/* Segmented Control Tabs */}
            <div className="activity-tabs">
                <div
                    className={`activity-tab ${activeTab === 'upcoming' ? 'active' : ''}`}
                    onClick={() => setActiveTab('upcoming')}
                >
                    Upcoming
                </div>
                <div
                    className={`activity-tab ${activeTab === 'past' ? 'active' : ''}`}
                    onClick={() => setActiveTab('past')}
                >
                    Past
                </div>
            </div>

            <div className="appointments-list" style={{ paddingBottom: '100px' }}>
                {activeTab === 'upcoming' ? (
                    upcomingAppointments.map((apt, index) => (
                        <div key={apt.id} className={`mobile-card appointment-card animate-slide-up delay-${index + 1}`}>
                            <div className="appointment-header">
                                <div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.9rem', fontWeight: 'bold', marginBottom: '4px' }}>
                                        <Calendar size={14} color="var(--customer-accent)" />
                                        {apt.date}
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: 'var(--customer-text-muted)' }}>
                                        <Clock size={14} />
                                        {apt.time}
                                    </div>
                                </div>
                                <span className={`apt-status ${apt.status}`}>{apt.status}</span>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', margin: '10px 0' }}>
                                <MapPin size={14} color="var(--customer-text-muted)" />
                                {apt.salon}
                            </div>

                            <ul className="apt-service-list">
                                {apt.services.map((s, idx) => (
                                    <li key={idx} className="apt-service-item">
                                        <CheckCircle2 size={14} color="#4ade80" />
                                        {s}
                                    </li>
                                ))}
                            </ul>

                            <div className="apt-footer">
                                <span style={{ fontWeight: 'bold' }}>₹{apt.total}</span>
                                <div style={{ display: 'flex', gap: '10px' }}>
                                    <button style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: 'none', padding: '6px 12px', borderRadius: '8px', fontSize: '0.75rem', fontWeight: '600' }}>Cancel</button>
                                    <button style={{ background: 'var(--customer-accent)', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '8px', fontSize: '0.75rem', fontWeight: '600' }}>Reschedule</button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    pastAppointments.map((apt, index) => (
                        <div key={apt.id} className={`mobile-card animate-slide-up delay-${index + 1}`} style={{ opacity: 0.8 }}>
                            <div className="appointment-header">
                                <div style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>{apt.date}</div>
                                <span className="apt-status completed">Completed</span>
                            </div>

                            <div style={{ fontSize: '0.85rem', margin: '5px 0' }}>{apt.salon}</div>

                            <div style={{ display: 'flex', justifyContent: 'space-between', margin: '10px 0' }}>
                                <div style={{ fontSize: '0.85rem', color: 'var(--customer-text-muted)' }}>
                                    {apt.services.join(', ')}
                                </div>
                                <div style={{ fontWeight: '700' }}>₹{apt.total}</div>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', marginBottom: '15px' }}>
                                <span style={{ color: 'var(--customer-text-muted)' }}>Stylist:</span>
                                <span style={{ fontWeight: '600' }}>{apt.stylist}</span>
                            </div>

                            {apt.hasPhotos && (
                                <div className="photo-comparison">
                                    <div>
                                        <img src={apt.photos.before} className="comp-img" alt="Before" />
                                        <div className="comp-label">Before</div>
                                    </div>
                                    <div>
                                        <img src={apt.photos.after} className="comp-img" alt="After" />
                                        <div className="comp-label">After</div>
                                    </div>
                                </div>
                            )}

                            <div className="apt-footer">
                                {renderStars(apt.rating)}
                                <div style={{ display: 'flex', gap: '10px' }}>
                                    <button style={{ display: 'flex', alignItems: 'center', gap: '5px', background: 'rgba(255,255,255,0.05)', color: 'var(--customer-text-main)', border: '1px solid var(--customer-border)', padding: '6px 10px', borderRadius: '8px', fontSize: '0.7rem' }}>
                                        <FileText size={14} /> Invoice
                                    </button>
                                    <button style={{ display: 'flex', alignItems: 'center', gap: '5px', background: 'rgba(184, 92, 92, 0.1)', color: 'var(--customer-accent)', border: '1px solid rgba(184, 92, 92, 0.2)', padding: '6px 10px', borderRadius: '8px', fontSize: '0.7rem' }}>
                                        Rebook
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Appointments;
