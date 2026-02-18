import React, { useState } from 'react';
import {
    MapPin, Scissors, User, Calendar as CalendarIcon,
    ChevronRight, CheckCircle2, Clock,
    ArrowLeft, Bell, Smartphone, Star, X,
    ChevronLeft
} from 'lucide-react';
import '../customer.css';

const Book = () => {
    const [step, setStep] = useState(1);
    const [selectedOutlet, setSelectedOutlet] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('Hair');
    const [selectedService, setSelectedService] = useState(null);
    const [selectedStaff, setSelectedStaff] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [showCalendarView, setShowCalendarView] = useState(false);
    const [selectedDate, setSelectedDate] = useState(22); // Default to current day for demo

    const outlets = [
        {
            id: 1, name: 'Bloom & Blossom - Bandra', address: 'Linking Road, Bandra West',
            rating: 4.8, distance: '1.2 km',
            image: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?q=80&w=400&auto=format&fit=crop'
        },
        {
            id: 2, name: 'Bloom & Blossom - Andheri', address: 'Lokhandwala Core, Andheri West',
            rating: 4.9, distance: '3.5 km',
            image: 'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?q=80&w=400&auto=format&fit=crop'
        },
    ];

    const services = {
        'Hair': [
            { id: 101, name: 'Luxury Haircut', price: 1200, duration: '45 mins', desc: 'Wash + Style included', image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=200&auto=format&fit=crop' },
            { id: 102, name: 'Global Coloring', price: 3500, duration: '120 mins', desc: 'Premium L-Oreal shades', image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=200&auto=format&fit=crop' },
            { id: 103, name: 'Deep Conditioning', price: 1500, duration: '60 mins', desc: 'Spa treatment', image: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?q=80&w=200&auto=format&fit=crop' },
        ],
        'Skin': [
            { id: 201, name: 'Hydra Facial', price: 2500, duration: '60 mins', desc: 'Deep skin cleansing', image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=200&auto=format&fit=crop' },
            { id: 202, name: 'D-Tan Pack', price: 800, duration: '30 mins', desc: 'Tan removal', image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=200&auto=format&fit=crop' },
        ]
    };

    const staff = [
        { id: 1, name: 'Jill', role: 'Sr. Stylist', img: 'https://i.pravatar.cc/150?u=jill', exp: '5+ yrs' },
        { id: 2, name: 'Sansa', role: 'Expert', img: 'https://i.pravatar.cc/150?u=sansa', exp: '3+ yrs' },
        { id: 3, name: 'Bob', role: 'Stylist', img: 'https://i.pravatar.cc/150?u=bob', exp: '4+ yrs' },
    ];

    const calendarDates = Array.from({ length: 30 }, (_, i) => i + 1);

    const slotGroups = {
        'Morning Slots': [
            { time: '10:00 AM', status: 'available' },
            { time: '10:30 AM', status: 'booked' },
            { time: '11:00 AM', status: 'available' },
            { time: '11:45 AM', status: 'booked' },
        ],
        'Afternoon Slots': [
            { time: '01:00 PM', status: 'available' },
            { time: '02:30 PM', status: 'available' },
            { time: '03:00 PM', status: 'booked' },
            { time: '04:15 PM', status: 'available' },
        ],
        'Evening Slots': [
            { time: '06:00 PM', status: 'available' },
            { time: '07:30 PM', status: 'available' },
            { time: '08:00 PM', status: 'booked' },
        ]
    };

    const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);

    const CalendarViewModal = () => (
        <div className="full-calendar-modal animate-fade-in">
            <div className="modal-close-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '40px', height: '40px', background: 'var(--customer-card-bg)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <CalendarIcon size={20} color="var(--customer-accent)" />
                    </div>
                    <div>
                        <h3 style={{ margin: 0, fontSize: '1rem' }}>Availability</h3>
                        <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--customer-text-muted)' }}>{selectedOutlet?.name}</p>
                    </div>
                </div>
                <button onClick={() => setShowCalendarView(false)} style={{ background: 'rgba(255,255,255,0.05)', border: 'none', color: '#fff', padding: '8px', borderRadius: '50%' }}>
                    <X size={22} />
                </button>
            </div>

            <div className="calendar-body">
                <div className="calendar-header-nav">
                    <span className="month-label">February 2026</span>
                    <div className="nav-arrows">
                        <div className="nav-arrow"><ChevronLeft size={18} /></div>
                        <div className="nav-arrow"><ChevronRight size={18} /></div>
                    </div>
                </div>

                <div className="weekdays-grid">
                    {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => <div key={d} className="weekday-label">{d}</div>)}
                </div>

                <div className="dates-grid">
                    {/* Dummy padding for February start day */}
                    {[26, 27, 28, 29, 30, 31].map(d => <div key={`prev-${d}`} className="calendar-date-cell other-month">{d}</div>)}
                    {calendarDates.slice(0, 22).map(d => (
                        <div
                            key={d}
                            className={`calendar-date-cell ${selectedDate === d ? 'active' : ''} ${d === 22 || d === 24 ? 'has-availability' : ''}`}
                            onClick={() => setSelectedDate(d)}
                        >
                            {d}
                        </div>
                    ))}
                    {/* Next month dummy */}
                    {[1, 2].map(d => <div key={`next-${d}`} className="calendar-date-cell other-month">{d}</div>)}
                </div>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.02)', padding: '10px 0' }}>
                {Object.entries(slotGroups).map(([group, slots]) => (
                    <div key={group}>
                        <div className="slots-section-title">{group}</div>
                        <div className="availability-grid">
                            {slots.map((slot, i) => (
                                <div
                                    key={i}
                                    className={`slot-item ${slot.status} ${selectedTime === slot.time ? 'selected' : ''}`}
                                    onClick={() => {
                                        if (slot.status === 'available') {
                                            setSelectedTime(slot.time);
                                            setShowCalendarView(false);
                                            // Auto progress if in time selection step
                                            if (step === 3) nextStep();
                                        }
                                    }}
                                >
                                    {slot.time}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <div style={{ padding: '30px 20px 20px 20px' }}>
                <button className="mobile-card" style={{ width: '100%', margin: 0, background: 'var(--customer-accent)', color: 'white', fontWeight: 'bold' }} onClick={() => setShowCalendarView(false)}>
                    Close Calendar
                </button>
            </div>
        </div>
    );

    return (
        <div className="booking-container" style={{ paddingBottom: '120px' }}>
            {showCalendarView && <CalendarViewModal />}

            {!showCalendarView && (
                <>
                    {step > 1 && (
                        <div style={{ padding: '0 20px', marginBottom: '10px' }}>
                            <button onClick={prevStep} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--customer-border)', color: 'var(--customer-text-main)', display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 15px', borderRadius: '12px', fontSize: '0.9rem' }}>
                                <ArrowLeft size={16} /> Back
                            </button>
                        </div>
                    )}

                    <div className="booking-step-indicator">
                        {[1, 2, 3, 4].map(s => <div key={s} className={`step-dot ${step === s ? 'active' : ''}`} />)}
                    </div>

                    {step === 1 && (
                        <div className="animate-fade-in">
                            <div className="section-title"><h3>Select Salon</h3></div>
                            <div className="option-grid">
                                {outlets.map(outlet => (
                                    <div
                                        key={outlet.id}
                                        className={`selectable-card ${selectedOutlet?.id === outlet.id ? 'selected' : ''}`}
                                        onClick={() => { setSelectedOutlet(outlet); nextStep(); }}
                                        style={{ padding: '12px' }}
                                    >
                                        <img src={outlet.image} className="outlet-image" alt={outlet.name} />
                                        <div style={{ flex: 1 }}>
                                            <div style={{ fontWeight: 'bold', fontSize: '1rem' }}>{outlet.name}</div>
                                            <div style={{ fontSize: '0.8rem', color: 'var(--customer-text-muted)' }}>{outlet.address}</div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '4px' }}>
                                                <span style={{ fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '3px', color: '#fbbf24' }}><Star size={12} fill="#fbbf24" /> {outlet.rating}</span>
                                                <span style={{ fontSize: '0.75rem', color: 'var(--customer-text-muted)' }}>{outlet.distance}</span>
                                            </div>
                                        </div>
                                        <ChevronRight size={18} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="animate-fade-in">
                            <div className="section-title"><h3>Select Service</h3></div>
                            <div style={{ padding: '0 20px', marginBottom: '20px' }}>
                                <div className="view-book-btn" onClick={() => setShowCalendarView(true)}>
                                    <CalendarIcon size={20} />
                                    <span>Check Salon Availability</span>
                                </div>
                            </div>
                            <div className="category-tabs">
                                {Object.keys(services).map(cat => (
                                    <div key={cat} className={`category-tab ${selectedCategory === cat ? 'active' : ''}`} onClick={() => setSelectedCategory(cat)}>{cat}</div>
                                ))}
                            </div>
                            {services[selectedCategory].map(service => (
                                <div key={service.id} className={`service-selection-card ${selectedService?.id === service.id ? 'selected' : ''}`} onClick={() => setSelectedService(service)}>
                                    <img src={service.image} className="service-thumbnail" />
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontWeight: '700' }}>{service.name}</div>
                                        <div style={{ fontSize: '0.8rem', color: 'var(--customer-text-muted)' }}>{service.desc}</div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '8px' }}>
                                            <span style={{ fontSize: '0.8rem', color: 'var(--customer-accent)' }}>{service.duration}</span>
                                            <span style={{ fontWeight: 'bold' }}>₹{service.price}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {selectedService && <button className="sticky-bottom-btn" onClick={nextStep}>Next: Choose Expert</button>}
                        </div>
                    )}

                    {step === 3 && (
                        <div className="animate-fade-in">
                            <div className="section-title"><h3>Expert & Time</h3></div>
                            <div className="staff-scroll">
                                {staff.map(member => (
                                    <div key={member.id} className={`staff-avatar-item ${selectedStaff?.id === member.id ? 'selected' : ''}`} onClick={() => setSelectedStaff(member)}>
                                        <img src={member.img} className="avatar-circle" />
                                        <span style={{ fontSize: '0.8rem', fontWeight: '600' }}>{member.name}</span>
                                    </div>
                                ))}
                            </div>

                            <div style={{ padding: '0 20px', marginBottom: '20px' }}>
                                <div style={{ background: 'var(--customer-card-bg)', border: '1px solid var(--customer-border)', borderRadius: '16px', padding: '20px', textAlign: 'center' }}>
                                    <CalendarIcon size={32} color="var(--customer-accent)" style={{ marginBottom: '10px' }} />
                                    <h4 style={{ margin: '0 0 5px 0' }}>{selectedTime ? `Time: ${selectedTime}` : 'Pick a Time'}</h4>
                                    <p style={{ fontSize: '0.8rem', color: 'var(--customer-text-muted)', marginBottom: '15px' }}>Check available slots for your preferred date.</p>
                                    <div className="view-book-btn" style={{ margin: '0', width: '100%', background: 'rgba(255,255,255,0.05)' }} onClick={() => setShowCalendarView(true)}>
                                        <CalendarIcon size={18} />
                                        <span>Open Calendar & Slots</span>
                                    </div>
                                </div>
                            </div>

                            {selectedTime && <button className="sticky-bottom-btn" onClick={nextStep}>Review Booking</button>}
                        </div>
                    )}

                    {step === 4 && (
                        <div className="animate-fade-in">
                            <div className="section-title"><h3>Confirm Booking</h3></div>
                            <div className="mobile-card" style={{ padding: '0', overflow: 'hidden' }}>
                                <div style={{ height: '140px', position: 'relative' }}>
                                    <img src={selectedService?.image} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(transparent, #000)', padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                                        <h4 style={{ margin: 0, color: 'white' }}>{selectedService?.name}</h4>
                                        <p style={{ margin: 0, color: 'rgba(255,255,255,0.7)', fontSize: '0.8rem' }}>{selectedOutlet?.name}</p>
                                    </div>
                                </div>
                                <div style={{ padding: '15px' }}>
                                    <div className="summary-row"><span>Slot</span><span style={{ fontWeight: '700' }}>{selectedDate} Feb, {selectedTime}</span></div>
                                    <div className="summary-row"><span>Professional</span><span>{selectedStaff?.name || 'Any'}</span></div>
                                    <div className="summary-row total"><span>Total Payable</span><span style={{ color: 'var(--customer-accent)' }}>₹{selectedService?.price}</span></div>
                                </div>
                            </div>
                            <button className="sticky-bottom-btn" style={{ background: '#4ade80' }} onClick={() => alert('Booking Done!')}>Confirm & Pay</button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default Book;
