import React, { useState } from 'react';
import {
    Users, Search, Filter, Calendar, TrendingUp,
    Star, MessageSquare, UserPlus, Clock,
    ChevronRight, MoreVertical, Tag, Smartphone,
    Mail, MapPin, Scissors, ShoppingBag,
    AlertTriangle, Download, ArrowLeft, ExternalLink,
    ChevronDown, BarChart3, Target
} from 'lucide-react';

const CrmManagement = () => {
    const [activeTab, setActiveTab] = useState('customers');
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    // Mock Data
    const customers = [
        { id: 1, name: 'Priya Sharma', phone: '+91 98765 43210', email: 'priya.s@example.com', lastVisit: '2026-02-10', totalVisits: 8, lifetimeSpend: 15400, preferredServices: ['Hair Spa', 'Keratin'], stylist: 'Jill', tags: ['VIP', 'Regular'], avgRating: 4.8 },
        { id: 2, name: 'Anjali Gupta', phone: '+91 99887 76655', email: 'anjali.g@example.com', lastVisit: '2026-01-15', totalVisits: 12, lifetimeSpend: 28500, preferredServices: ['Manicure', 'Facial'], stylist: 'Sansa', tags: ['VIP'], avgRating: 5.0 },
        { id: 3, name: 'Rahul V.', phone: '+91 88776 65544', email: 'rahul.v@example.com', lastVisit: '2026-02-17', totalVisits: 1, lifetimeSpend: 1200, preferredServices: ['Men\'s Haircut'], stylist: 'Pierre', tags: ['New'], avgRating: 4.5 },
        { id: 4, name: 'Sneha Kapur', phone: '+91 77665 54433', email: 'sneha.k@example.com', lastVisit: '2025-11-20', totalVisits: 5, lifetimeSpend: 7500, preferredServices: ['Pedicure'], stylist: 'Elias', tags: ['Inactive'], avgRating: 4.2 },
        { id: 5, name: 'Amit Jain', phone: '+91 66554 43322', email: 'amit.j@example.com', lastVisit: '2026-02-14', totalVisits: 3, lifetimeSpend: 4200, preferredServices: ['Barard Trim'], stylist: 'George', tags: ['Regular'], avgRating: 4.4 },
    ];

    const visitHistory = [
        { id: 1, date: '2026-02-10', services: ['Hair Spa', 'Head Massage'], products: ['Moroccan Oil'], amount: 3200, staff: 'Jill', rating: 5, note: 'She preferred lukewarm water for rinsing.' },
        { id: 2, date: '2025-12-22', services: ['Keratin Treatment'], products: [], amount: 6500, staff: 'Jill', rating: 4, note: 'Was in a hurry, finish quickly.' },
        { id: 3, date: '2025-10-05', services: ['Classic Manicure'], products: ['Nail Polish'], amount: 1500, staff: 'Hasib', rating: 5, note: 'Loves red shades.' },
    ];

    const segments = [
        { id: 1, name: 'New Customers', rule: 'First visit in last 30 days', count: 42, color: '#60a5fa' },
        { id: 2, name: 'High Spenders', rule: 'Lifetime spend > ₹20,000', count: 18, color: '#fbbf24' },
        { id: 3, name: 'Regular Visitors', rule: 'Visit count > 5 in 90 days', count: 35, color: '#4ade80' },
        { id: 4, name: 'Inactive Customers', rule: 'Last visit > 45 days ago', count: 64, color: '#f87171' },
    ];

    const feedbacks = [
        { id: 1, customer: 'Priya Sharma', rating: 5, comment: 'Excellent service by Jill, my hair feels amazing!', service: 'Hair Spa', staff: 'Jill', date: '2026-02-10' },
        { id: 2, customer: 'Rahul V.', rating: 4, comment: 'Good haircut, but had to wait for 15 minutes.', service: 'Haircut', staff: 'Pierre', date: '2026-02-17' },
        { id: 3, customer: 'Sneha Kapur', rating: 3, comment: 'The pedicure was okay, but the room was too cold.', service: 'Pedicure', staff: 'Elias', date: '2025-11-20' },
    ];

    const stats = {
        totalCustomers: 1250,
        activeThisMonth: 420,
        avgSpend: 2450,
        retentionRate: '68%'
    };

    const renderTabContent = () => {
        if (selectedCustomer) return renderCustomerProfile();

        switch (activeTab) {
            case 'customers': return renderCustomerList();
            case 'segments': return renderSegments();
            case 'feedback': return renderFeedback();
            case 'reengagement': return renderReengagement();
            default: return renderCustomerList();
        }
    };

    const renderCustomerList = () => (
        <div className="fade-in">
            {/* Top Filters */}
            <div className="content-card" style={{ padding: '20px', marginBottom: '25px', border: '1px solid rgba(212, 175, 55, 0.1)' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr 1fr', gap: '15px' }}>
                    <div style={{ position: 'relative' }}>
                        <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--admin-accent)', zIndex: 1 }} />
                        <input
                            type="text"
                            className="admin-input"
                            placeholder="Search name or phone..."
                            style={{
                                paddingLeft: '35px',
                                width: '100%',
                                background: 'rgba(255,255,255,0.05)',
                                border: '1px solid rgba(212, 175, 55, 0.3)',
                                color: 'var(--admin-text-main)',
                                height: '42px'
                            }}
                        />
                    </div>
                    <select className="admin-input" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(212, 175, 55, 0.3)', color: 'var(--admin-text-main)', height: '42px', cursor: 'pointer' }}>
                        <option style={{ background: 'var(--admin-bg-sidebar)', color: 'var(--admin-text-main)' }}>All Outlets</option>
                        <option style={{ background: 'var(--admin-bg-sidebar)', color: 'var(--admin-text-main)' }}>Main Branch - Andheri</option>
                        <option style={{ background: 'var(--admin-bg-sidebar)', color: 'var(--admin-text-main)' }}>Bandra Center</option>
                    </select>
                    <select className="admin-input" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(212, 175, 55, 0.3)', color: 'var(--admin-text-main)', height: '42px', cursor: 'pointer' }}>
                        <option style={{ background: 'var(--admin-bg-sidebar)', color: 'var(--admin-text-main)' }}>Last Visit (All)</option>
                        <option style={{ background: 'var(--admin-bg-sidebar)', color: 'var(--admin-text-main)' }}>Last 7 Days</option>
                        <option style={{ background: 'var(--admin-bg-sidebar)', color: 'var(--admin-text-main)' }}>Last 30 Days</option>
                        <option style={{ background: 'var(--admin-bg-sidebar)', color: 'var(--admin-text-main)' }}>Over 90 Days</option>
                    </select>
                    <select className="admin-input" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(212, 175, 55, 0.3)', color: 'var(--admin-text-main)', height: '42px', cursor: 'pointer' }}>
                        <option style={{ background: 'var(--admin-bg-sidebar)', color: 'var(--admin-text-main)' }}>Spend Range (All)</option>
                        <option style={{ background: 'var(--admin-bg-sidebar)', color: 'var(--admin-text-main)' }}>0 - ₹5,000</option>
                        <option style={{ background: 'var(--admin-bg-sidebar)', color: 'var(--admin-text-main)' }}>₹5,000 - ₹15,000</option>
                        <option style={{ background: 'var(--admin-bg-sidebar)', color: 'var(--admin-text-main)' }}>₹15,000+</option>
                    </select>
                    <button className="bb-btn bb-btn-gold" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', height: '42px' }}>
                        <Filter size={16} /> Filters
                    </button>
                </div>
            </div>

            {/* Customer Table */}
            <div className="content-card" style={{ padding: 0, overflow: 'hidden' }}>
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid var(--admin-border)' }}>
                                <th style={{ padding: '15px', textAlign: 'left', color: 'var(--admin-text-muted)', fontSize: '0.8rem' }}>Customer</th>
                                <th style={{ padding: '15px', textAlign: 'left', color: 'var(--admin-text-muted)', fontSize: '0.8rem' }}>Last Visit</th>
                                <th style={{ padding: '15px', textAlign: 'center', color: 'var(--admin-text-muted)', fontSize: '0.8rem' }}>Visits</th>
                                <th style={{ padding: '15px', textAlign: 'right', color: 'var(--admin-text-muted)', fontSize: '0.8rem' }}>LT Spend</th>
                                <th style={{ padding: '15px', textAlign: 'left', color: 'var(--admin-text-muted)', fontSize: '0.8rem' }}>Stylist</th>
                                <th style={{ padding: '15px', textAlign: 'left', color: 'var(--admin-text-muted)', fontSize: '0.8rem' }}>Tags</th>
                                <th style={{ padding: '15px', textAlign: 'right', color: 'var(--admin-text-muted)', fontSize: '0.8rem' }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {customers.map(cust => (
                                <tr key={cust.id} style={{ borderBottom: '1px solid var(--admin-border)' }} className="table-row-hover">
                                    <td style={{ padding: '15px' }}>
                                        <div style={{ fontWeight: '600' }}>{cust.name}</div>
                                        <div style={{ fontSize: '0.8rem', color: 'var(--admin-text-muted)' }}>{cust.phone}</div>
                                    </td>
                                    <td style={{ padding: '15px', fontSize: '0.85rem' }}>
                                        {cust.lastVisit}
                                    </td>
                                    <td style={{ padding: '15px', textAlign: 'center' }}>
                                        <span style={{ background: 'rgba(255,255,255,0.05)', padding: '4px 8px', borderRadius: '4px' }}>{cust.totalVisits}</span>
                                    </td>
                                    <td style={{ padding: '15px', textAlign: 'right', fontWeight: 'bold', color: 'var(--admin-accent)' }}>
                                        ₹{cust.lifetimeSpend.toLocaleString()}
                                    </td>
                                    <td style={{ padding: '15px', fontSize: '0.85rem' }}>
                                        {cust.stylist}
                                    </td>
                                    <td style={{ padding: '15px' }}>
                                        <div style={{ display: 'flex', gap: '5px' }}>
                                            {cust.tags.map(tag => (
                                                <span key={tag} style={{
                                                    fontSize: '0.65rem', padding: '2px 6px', borderRadius: '4px',
                                                    background: tag === 'VIP' ? 'rgba(251, 191, 36, 0.1)' : (tag === 'New' ? 'rgba(74, 222, 128, 0.1)' : 'rgba(255,255,255,0.05)'),
                                                    color: tag === 'VIP' ? '#fbbf24' : (tag === 'New' ? '#4ade80' : '#fff'),
                                                    border: tag === 'VIP' ? '1px solid rgba(251, 191, 36, 0.2)' : 'none'
                                                }}>
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </td>
                                    <td style={{ padding: '15px', textAlign: 'right' }}>
                                        <button
                                            className="bb-btn bb-btn-outline"
                                            style={{ padding: '6px 10px', fontSize: '0.75rem' }}
                                            onClick={() => setSelectedCustomer(cust)}
                                        >
                                            View Profile
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div style={{ padding: '15px', borderTop: '1px solid var(--admin-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.85rem', color: 'var(--admin-text-muted)' }}>Showing 5 of 1,250 customers</span>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <button className="icon-btn-sm" disabled><ChevronRight size={16} style={{ transform: 'rotate(180deg)' }} /></button>
                        <button className="icon-btn-sm"><ChevronRight size={16} /></button>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderCustomerProfile = () => (
        <div className="fade-in">
            <button
                onClick={() => setSelectedCustomer(null)}
                style={{ background: 'none', border: 'none', color: 'var(--admin-accent)', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', marginBottom: '20px', padding: 0 }}
            >
                <ArrowLeft size={18} /> Back to List
            </button>

            <div style={{ display: 'grid', gridTemplateColumns: '350px 1fr', gap: '25px' }}>
                {/* Profile Info Sidebar */}
                <div className="content-card" style={{ padding: '25px' }}>
                    <div style={{ textAlign: 'center', marginBottom: '25px' }}>
                        <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'var(--admin-accent)', color: '#000', fontSize: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', margin: '0 auto 15px' }}>
                            {selectedCustomer.name.charAt(0)}
                        </div>
                        <h3 style={{ margin: 0 }}>{selectedCustomer.name}</h3>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '5px', marginTop: '10px' }}>
                            {selectedCustomer.tags.map(tag => (
                                <span key={tag} style={{ fontSize: '0.7rem', padding: '3px 8px', borderRadius: '12px', background: 'rgba(255,255,255,0.05)' }}>{tag}</span>
                            ))}
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <Smartphone size={16} color="var(--admin-text-muted)" />
                            <div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--admin-text-muted)' }}>Phone</div>
                                <div style={{ fontSize: '0.9rem' }}>{selectedCustomer.phone}</div>
                            </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <Mail size={16} color="var(--admin-text-muted)" />
                            <div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--admin-text-muted)' }}>Email</div>
                                <div style={{ fontSize: '0.9rem' }}>{selectedCustomer.email}</div>
                            </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <Calendar size={16} color="var(--admin-text-muted)" />
                            <div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--admin-text-muted)' }}>Customer Since</div>
                                <div style={{ fontSize: '0.9rem' }}>March 12, 2024</div>
                            </div>
                        </div>
                    </div>

                    <div style={{ marginTop: '30px', paddingTop: '20px', borderTop: '1px solid var(--admin-border)' }}>
                        <h4 style={{ fontSize: '0.9rem', marginBottom: '15px' }}>Internal Notes</h4>
                        <textarea
                            className="admin-input"
                            style={{ width: '100%', height: '100px', fontSize: '0.85rem' }}
                            placeholder="Add notes for staff..."
                            defaultValue="Always prefers Jill for hair coloring. Sensitive scalp."
                        ></textarea>
                        <button className="bb-btn bb-btn-outline" style={{ width: '100%', marginTop: '10px', fontSize: '0.8rem' }}>Save Note</button>
                    </div>

                    <div style={{ marginTop: '30px', background: 'rgba(255,215,0,0.05)', padding: '15px', borderRadius: '12px', border: '1px solid rgba(255,215,0,0.1)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                            <span style={{ fontSize: '0.85rem' }}>Average Rating</span>
                            <span style={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '4px' }}>4.8 <Star size={14} fill="#fbbf24" color="#fbbf24" /></span>
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--admin-text-muted)' }}>Top Service: Hair Spa</div>
                    </div>
                </div>

                {/* Main Profile Tabs Content */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
                    {/* Stats Row */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px' }}>
                        <div className="content-card" style={{ padding: '20px' }}>
                            <div style={{ color: 'var(--admin-text-muted)', fontSize: '0.75rem', marginBottom: '5px' }}>Lifetime Spend</div>
                            <div style={{ fontSize: '1.4rem', fontWeight: 'bold', color: 'var(--admin-accent)' }}>₹{selectedCustomer.lifetimeSpend.toLocaleString()}</div>
                        </div>
                        <div className="content-card" style={{ padding: '20px' }}>
                            <div style={{ color: 'var(--admin-text-muted)', fontSize: '0.75rem', marginBottom: '5px' }}>Total Visits</div>
                            <div style={{ fontSize: '1.4rem', fontWeight: 'bold' }}>{selectedCustomer.totalVisits}</div>
                        </div>
                        <div className="content-card" style={{ padding: '20px' }}>
                            <div style={{ color: 'var(--admin-text-muted)', fontSize: '0.75rem', marginBottom: '5px' }}>Avg Ticket</div>
                            <div style={{ fontSize: '1.4rem', fontWeight: 'bold' }}>₹3,550</div>
                        </div>
                    </div>

                    {/* Visit History */}
                    <div className="content-card" style={{ padding: 0 }}>
                        <div style={{ padding: '20px', borderBottom: '1px solid var(--admin-border)' }}>
                            <h3 style={{ margin: 0, fontSize: '1.1rem' }}>Visit History</h3>
                        </div>
                        <div style={{ padding: '20px' }}>
                            {visitHistory.map((visit, idx) => (
                                <div key={visit.id} style={{
                                    padding: '20px',
                                    background: 'rgba(255,255,255,0.02)',
                                    borderRadius: '12px',
                                    marginBottom: idx === visitHistory.length - 1 ? 0 : '15px',
                                    border: '1px solid var(--admin-border)'
                                }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                                        <div>
                                            <div style={{ fontSize: '1rem', fontWeight: 'bold' }}>{new Date(visit.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
                                            <div style={{ fontSize: '0.8rem', color: 'var(--admin-text-muted)' }}>Stylist: {visit.staff}</div>
                                        </div>
                                        <div style={{ textAlign: 'right' }}>
                                            <div style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>₹{visit.amount.toLocaleString()}</div>
                                            <div style={{ display: 'flex', gap: '3px', marginTop: '5px' }}>
                                                {[...Array(5)].map((_, i) => <Star key={i} size={12} fill={i < visit.rating ? '#fbbf24' : 'none'} color={i < visit.rating ? '#fbbf24' : 'var(--admin-border)'} />)}
                                            </div>
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '15px' }}>
                                        {visit.services.map(s => (
                                            <span key={s} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', padding: '4px 10px', background: 'rgba(255,255,255,0.05)', borderRadius: '6px' }}>
                                                <Scissors size={14} /> {s}
                                            </span>
                                        ))}
                                        {visit.products.map(p => (
                                            <span key={p} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', padding: '4px 10px', background: 'rgba(74, 222, 128, 0.05)', borderRadius: '6px', color: '#4ade80' }}>
                                                <ShoppingBag size={14} /> {p}
                                            </span>
                                        ))}
                                    </div>

                                    {visit.note && (
                                        <div style={{ marginTop: '10px', fontSize: '0.85rem', color: 'var(--admin-text-muted)', fontStyle: 'italic', background: 'rgba(0,0,0,0.1)', padding: '10px', borderRadius: '8px' }}>
                                            " {visit.note} "
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderSegments = () => (
        <div className="fade-in">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '30px' }}>
                {segments.map(seg => (
                    <div key={seg.id} className="content-card" style={{ padding: '25px', position: 'relative', overflow: 'hidden' }}>
                        <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: seg.color }}></div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
                            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: `${seg.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Target size={20} color={seg.color} />
                            </div>
                            <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{seg.count}</div>
                        </div>
                        <h4 style={{ margin: '0 0 5px 0' }}>{seg.name}</h4>
                        <p style={{ fontSize: '0.75rem', color: 'var(--admin-text-muted)', margin: 0 }}>{seg.rule}</p>
                        <button className="bb-btn bb-btn-outline" style={{ width: '100%', marginTop: '20px', fontSize: '0.75rem', padding: '6px' }}>View List</button>
                    </div>
                ))}
            </div>

            <div className="content-card" style={{ padding: '25px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <h3>Custom Segments</h3>
                    <button className="bb-btn bb-btn-gold" style={{ fontSize: '0.85rem' }}>+ Create New Segment</button>
                </div>
                <div style={{ padding: '40px', textAlign: 'center', color: 'var(--admin-text-muted)', border: '2px dashed var(--admin-border)', borderRadius: '12px' }}>
                    <Users size={32} style={{ opacity: 0.3, marginBottom: '10px' }} />
                    <p>Analysis for custom segments shown here. Group customers by behaviors to target marketing.</p>
                </div>
            </div>
        </div>
    );

    const renderFeedback = () => (
        <div className="fade-in">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '30px' }}>
                <div className="stat-card" style={{ padding: '20px' }}>
                    <div style={{ color: 'var(--admin-text-muted)', fontSize: '0.8rem', marginBottom: '10px' }}>Avg Rating (Overall)</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ fontSize: '2rem', fontWeight: 'bold' }}>4.6</span>
                        <div style={{ display: 'flex', gap: '2px' }}>
                            {[...Array(5)].map((_, i) => <Star key={i} size={16} fill={i < 4 ? '#fbbf24' : 'none'} color={i < 4 ? '#fbbf24' : 'var(--admin-border)'} />)}
                        </div>
                    </div>
                </div>
                <div className="stat-card" style={{ padding: '20px' }}>
                    <div style={{ color: 'var(--admin-text-muted)', fontSize: '0.8rem', marginBottom: '10px' }}>Low Ratings (Monthly)</div>
                    <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#f87171' }}>12</div>
                    <div style={{ fontSize: '0.7rem', color: '#f87171', marginTop: '5px' }}>Requires Attention</div>
                </div>
                <div className="stat-card" style={{ padding: '20px' }}>
                    <div style={{ color: 'var(--admin-text-muted)', fontSize: '0.8rem', marginBottom: '10px' }}>Response Rate</div>
                    <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>92%</div>
                </div>
            </div>

            <div className="content-card" style={{ padding: 0 }}>
                <div style={{ padding: '20px', borderBottom: '1px solid var(--admin-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{ margin: 0, fontSize: '1rem' }}>Latest Reviews</h3>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <select className="admin-input" style={{ fontSize: '0.8rem', borderColor: 'rgba(212, 175, 55, 0.2)', color: '#fff' }}>
                            <option style={{ background: '#1a1a1a' }}>All Ratings</option>
                            <option style={{ background: '#1a1a1a' }}>Low Ratings (1-2)</option>
                            <option style={{ background: '#1a1a1a' }}>High Ratings (4-5)</option>
                        </select>
                        <select className="admin-input" style={{ fontSize: '0.8rem', borderColor: 'rgba(212, 175, 55, 0.2)', color: '#fff' }}>
                            <option style={{ background: '#1a1a1a' }}>All Staff</option>
                            {staffMembers.map(s => <option key={s.id} style={{ background: '#1a1a1a' }}>{s.name}</option>)}
                        </select>
                    </div>
                </div>
                <div style={{ padding: '20px' }}>
                    {feedbacks.map(f => (
                        <div key={f.id} style={{ display: 'flex', gap: '15px', padding: '15px', borderBottom: '1px solid var(--admin-border)' }}>
                            <div style={{ width: '45px', height: '45px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                                {f.customer.charAt(0)}
                            </div>
                            <div style={{ flex: 1 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                                    <div style={{ fontWeight: 'bold' }}>{f.customer}</div>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--admin-text-muted)' }}>{f.date}</div>
                                </div>
                                <div style={{ display: 'flex', gap: '2px', marginBottom: '10px' }}>
                                    {[...Array(5)].map((_, i) => <Star key={i} size={14} fill={i < f.rating ? '#fbbf24' : 'none'} color={i < f.rating ? '#fbbf24' : 'var(--admin-border)'} />)}
                                </div>
                                <p style={{ fontSize: '0.9rem', margin: '0 0 10px 0' }}>"{f.comment}"</p>
                                <div style={{ fontSize: '0.75rem', display: 'flex', gap: '15px' }}>
                                    <span style={{ color: 'var(--admin-accent)' }}>Service: {f.service}</span>
                                    <span style={{ color: 'var(--admin-text-muted)' }}>Staff: {f.staff}</span>
                                </div>
                            </div>
                            <div>
                                <button className="bb-btn bb-btn-outline" style={{ fontSize: '0.7rem' }}>Reply</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    const renderReengagement = () => (
        <div className="fade-in">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '30px' }}>
                <div className="stat-card" style={{ padding: '20px' }}>
                    <div style={{ color: 'var(--admin-text-muted)', fontSize: '0.8rem', marginBottom: '10px' }}>Inactive (30-60 Days)</div>
                    <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>148</div>
                </div>
                <div className="stat-card" style={{ padding: '20px' }}>
                    <div style={{ color: 'var(--admin-text-muted)', fontSize: '0.8rem', marginBottom: '10px' }}>Lapsed (Over 90 Days)</div>
                    <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#f87171' }}>254</div>
                </div>
                <div className="stat-card" style={{ padding: '20px' }}>
                    <div style={{ color: 'var(--admin-text-muted)', fontSize: '0.8rem', marginBottom: '10px' }}>Revenue At Risk</div>
                    <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>₹1.2L</div>
                </div>
            </div>

            <div className="content-card" style={{ padding: 0 }}>
                <div style={{ padding: '20px', borderBottom: '1px solid var(--admin-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3>Re-engagement Action List</h3>
                    <button className="bb-btn bb-btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Download size={16} /> Export CSV
                    </button>
                </div>
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid var(--admin-border)' }}>
                                <th style={{ padding: '15px', textAlign: 'left', color: 'var(--admin-text-muted)', fontSize: '0.8rem' }}>Customer</th>
                                <th style={{ padding: '15px', textAlign: 'left', color: 'var(--admin-text-muted)', fontSize: '0.8rem' }}>Last Visit</th>
                                <th style={{ padding: '15px', textAlign: 'left', color: 'var(--admin-text-muted)', fontSize: '0.8rem' }}>Last Service</th>
                                <th style={{ padding: '15px', textAlign: 'right', color: 'var(--admin-text-muted)', fontSize: '0.8rem' }}>Contact</th>
                                <th style={{ padding: '15px', textAlign: 'right', color: 'var(--admin-text-muted)', fontSize: '0.8rem' }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {customers.filter(c => c.tags.includes('Inactive')).map(cust => (
                                <tr key={cust.id} style={{ borderBottom: '1px solid var(--admin-border)' }}>
                                    <td style={{ padding: '15px' }}>
                                        <div style={{ fontWeight: '600' }}>{cust.name}</div>
                                        <div style={{ fontSize: '0.75rem', color: '#f87171' }}>64 days since last visit</div>
                                    </td>
                                    <td style={{ padding: '15px', fontSize: '0.85rem' }}>{cust.lastVisit}</td>
                                    <td style={{ padding: '15px', fontSize: '0.85rem' }}>{cust.preferredServices[0]}</td>
                                    <td style={{ padding: '15px', textAlign: 'right' }}>
                                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                                            <button className="icon-btn-sm" title="Call"><Smartphone size={14} /></button>
                                            <button className="icon-btn-sm" title="Email"><Mail size={14} /></button>
                                        </div>
                                    </td>
                                    <td style={{ padding: '15px', textAlign: 'right' }}>
                                        <button className="bb-btn bb-btn-gold" style={{ fontSize: '0.7rem' }}>Send Offer</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );

    const staffMembers = [
        { id: 1, name: 'Jill' },
        { id: 2, name: 'Sansa' },
        { id: 3, name: 'Bob' },
        { id: 4, name: 'Elias' },
    ];

    return (
        <div className="crm-management-page">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
                <div>
                    <h2 className="page-title" style={{ margin: 0 }}>Customer Relations (CRM)</h2>
                    <p style={{ fontSize: '0.85rem', color: 'var(--admin-text-muted)' }}>Manage your customer base, analyze behaviors and monitor feedback.</p>
                </div>
            </div>

            {/* Quick Stats Row */}
            {!selectedCustomer && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '30px' }}>
                    <div className="stat-card" style={{ padding: '20px' }}>
                        <div style={{ color: 'var(--admin-text-muted)', fontSize: '0.75rem', marginBottom: '8px' }}>Total Customers</div>
                        <div style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>{stats.totalCustomers.toLocaleString()}</div>
                    </div>
                    <div className="stat-card" style={{ padding: '20px' }}>
                        <div style={{ color: 'var(--admin-text-muted)', fontSize: '0.75rem', marginBottom: '8px' }}>Active (30 Days)</div>
                        <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#4ade80' }}>{stats.activeThisMonth}</div>
                    </div>
                    <div style={{ gridColumn: 'span 2' }}>
                        <div className="stat-card" style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <div style={{ color: 'var(--admin-text-muted)', fontSize: '0.75rem', marginBottom: '8px' }}>Average Spend / Customer</div>
                                <div style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>₹{stats.avgSpend.toLocaleString()}</div>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <div style={{ color: 'var(--admin-text-muted)', fontSize: '0.75rem', marginBottom: '8px' }}>Visit Retention</div>
                                <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: 'var(--admin-accent)' }}>{stats.retentionRate}</div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Tab Navigation */}
            {!selectedCustomer && (
                <div style={{ display: 'flex', gap: '30px', borderBottom: '1px solid var(--admin-border)', marginBottom: '30px' }}>
                    {[
                        { id: 'customers', label: 'Customers', icon: <Users size={18} /> },
                        { id: 'segments', label: 'Segments', icon: <Target size={18} /> },
                        { id: 'feedback', label: 'Feedback', icon: <MessageSquare size={18} /> },
                        { id: 'reengagement', label: 'Re-engagement', icon: <Clock size={18} /> },
                    ].map(tab => (
                        <div
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            style={{
                                padding: '12px 0', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px',
                                borderBottom: activeTab === tab.id ? '2px solid var(--admin-accent)' : '2px solid transparent',
                                color: activeTab === tab.id ? 'var(--admin-accent)' : 'var(--admin-text-muted)',
                                transition: 'all 0.3s'
                            }}
                        >
                            {tab.icon}
                            <span style={{ fontWeight: activeTab === tab.id ? 'bold' : 'normal' }}>{tab.label}</span>
                        </div>
                    ))}
                </div>
            )}

            {renderTabContent()}

            {/* Privacy Footer */}
            <div style={{ marginTop: '50px', padding: '15px', borderTop: '1px dashed var(--admin-border)', textAlign: 'center', opacity: 0.5 }}>
                <p style={{ fontSize: '0.75rem', margin: 0 }}>
                    <AlertTriangle size={12} style={{ verticalAlign: 'middle', marginRight: '5px' }} />
                    Customer data is private and encrypted. Access to contact information is logged.
                </p>
            </div>
        </div>
    );
};

export default CrmManagement;
