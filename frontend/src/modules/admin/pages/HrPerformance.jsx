import React, { useState } from 'react';
import {
    Users, TrendingUp, DollarSign, Star,
    Search, Filter, Download, ArrowUpRight,
    ArrowDownRight, StarHalf, Tag, MessageSquare,
    ChevronRight, X, Calendar, MapPin, Briefcase,
    LayoutDashboard, ShoppingBag, Scissors, BarChart3, PieChart
} from 'lucide-react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    LineChart, Line, AreaChart, Area, Cell, PieChart as RePieChart, Pie
} from 'recharts';

const HrPerformance = () => {
    const [activeTab, setActiveTab] = useState('table'); // 'table' or 'charts'
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [filters, setFilters] = useState({
        dateRange: 'This Month',
        outlet: 'All',
        role: 'All'
    });

    const stats = [
        { title: 'Total Employees', value: '24', icon: <Users size={20} />, color: '#60a5fa' },
        { title: 'Total Revenue', value: '₹12.5L', icon: <TrendingUp size={20} />, color: '#4ade80' },
        { title: 'Avg Revenue/Staff', value: '₹52,083', icon: <DollarSign size={20} />, color: '#f59e0b' },
        { title: 'Payroll Cost', value: '₹5.4L', icon: <DollarSign size={20} />, color: '#f87171' },
        { title: 'Profit Contribution', value: '₹7.1L', icon: <TrendingUp size={20} />, color: '#a78bfa' },
    ];

    const performanceData = [
        {
            id: 1, name: 'Anita Sharma', role: 'Senior Stylist', outlet: 'Bandra Main', services: 145, products: 22,
            revenue: 85000, commission: 12750, salary: 35000, contribution: 37250, rating: 4.9, status: 'High',
            trend: 'up', feedback: 'Extremely professional and fast.', serviceBreakdown: { hair: 60000, skin: 25000 }
        },
        {
            id: 2, name: 'Rajesh Kumar', role: 'Hair Expert', outlet: 'Andheri West', services: 112, products: 8,
            revenue: 72400, commission: 7240, salary: 28000, contribution: 37160, rating: 4.5, status: 'Avg',
            trend: 'up', feedback: 'Great with men\'s styling.', serviceBreakdown: { hair: 72400, skin: 0 }
        },
        {
            id: 3, name: 'Sonal Verma', role: 'Skin Specialist', outlet: 'Juhu Studio', services: 88, products: 35,
            revenue: 92000, commission: 13800, salary: 32000, contribution: 46200, rating: 4.8, status: 'High',
            trend: 'down', feedback: 'Outstanding product sales skills.', serviceBreakdown: { hair: 12000, skin: 80000 }
        }
    ];

    // Chart Data
    const revenueByStaff = performanceData.map(d => ({ name: d.name, revenue: d.revenue, contribution: d.contribution }));
    const trendData = [
        { month: 'Oct', revenue: 850000 },
        { month: 'Nov', revenue: 920000 },
        { month: 'Dec', revenue: 1100000 },
        { month: 'Jan', revenue: 1050000 },
        { month: 'Feb', revenue: 1250000 },
    ];

    const getStatusColor = (status) => {
        switch (status) {
            case 'High': return '#4ade80';
            case 'Avg': return '#f59e0b';
            case 'Low': return '#ef4444';
            default: return 'var(--admin-text-muted)';
        }
    };

    return (
        <div className="performance-page">
            {/* Top Controls */}
            <div className="content-card" style={{ marginBottom: '25px', padding: '20px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
                    <div className="form-group">
                        <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: 'var(--admin-text-muted)', marginBottom: '8px' }}>
                            <Calendar size={14} /> Date Range
                        </label>
                        <select className="admin-input" style={{ width: '100%', padding: '10px', background: 'var(--admin-bg-sidebar)', border: '1px solid var(--admin-border)', color: '#fff', borderRadius: '8px' }}>
                            <option>This Month</option>
                            <option>Last Month</option>
                            <option>Last 3 Months</option>
                            <option>Custom Range</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: 'var(--admin-text-muted)', marginBottom: '8px' }}>
                            <MapPin size={14} /> Outlet
                        </label>
                        <select className="admin-input" style={{ width: '100%', padding: '10px', background: 'var(--admin-bg-sidebar)', border: '1px solid var(--admin-border)', color: '#fff', borderRadius: '8px' }}>
                            <option>All Outlets</option>
                            <option>Bandra Main</option>
                            <option>Andheri West</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: 'var(--admin-text-muted)', marginBottom: '8px' }}>
                            <Briefcase size={14} /> Role
                        </label>
                        <select className="admin-input" style={{ width: '100%', padding: '10px', background: 'var(--admin-bg-sidebar)', border: '1px solid var(--admin-border)', color: '#fff', borderRadius: '8px' }}>
                            <option>All Roles</option>
                            <option>Stylist</option>
                            <option>Receptionist</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: 'var(--admin-text-muted)', marginBottom: '8px' }}>
                            <Search size={14} /> Search
                        </label>
                        <input
                            type="text"
                            placeholder="Employee name..."
                            style={{ width: '100%', padding: '10px', background: 'var(--admin-bg-sidebar)', border: '1px solid var(--admin-border)', color: '#fff', borderRadius: '8px' }}
                        />
                    </div>
                </div>
            </div>

            {/* View Toggle Tabs */}
            <div style={{ display: 'flex', gap: '15px', marginBottom: '25px' }}>
                <button
                    onClick={() => setActiveTab('table')}
                    className={`bb-btn ${activeTab === 'table' ? 'bb-btn-gold' : 'bb-btn-outline'}`}
                    style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px' }}
                >
                    <LayoutDashboard size={18} /> Performance Table
                </button>
                <button
                    onClick={() => setActiveTab('charts')}
                    className={`bb-btn ${activeTab === 'charts' ? 'bb-btn-gold' : 'bb-btn-outline'}`}
                    style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px' }}
                >
                    <BarChart3 size={18} /> Visual Analytics
                </button>
            </div>

            {/* Summary Cards */}
            <div className="dashboard-grid" style={{ marginBottom: '25px', display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '15px' }}>
                {stats.map((stat, index) => (
                    <div key={index} className="stat-card" style={{ padding: '15px' }}>
                        <div style={{ color: stat.color, marginBottom: '10px' }}>{stat.icon}</div>
                        <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{stat.value}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--admin-text-muted)' }}>{stat.title}</div>
                    </div>
                ))}
            </div>

            {activeTab === 'table' ? (
                /* Main Table */
                <div className="content-card" style={{ padding: 0, overflow: 'visible' }}>
                    <div style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--admin-border)' }}>
                        <h3 className="card-title">Detailed Performance Table</h3>
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <button className="bb-btn bb-btn-outline" style={{ fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <Download size={14} /> Export CSV
                            </button>
                            <button className="bb-btn bb-btn-gold" style={{ fontSize: '0.8rem' }}>Tag Performer</button>
                        </div>
                    </div>
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid var(--admin-border)' }}>
                                    <th style={{ padding: '15px', textAlign: 'left', color: 'var(--admin-text-muted)', fontSize: '0.75rem' }}>Employee</th>
                                    <th style={{ padding: '15px', textAlign: 'center', color: 'var(--admin-text-muted)', fontSize: '0.75rem' }}>Services</th>
                                    <th style={{ padding: '15px', textAlign: 'center', color: 'var(--admin-text-muted)', fontSize: '0.75rem' }}>Products</th>
                                    <th style={{ padding: '15px', textAlign: 'right', color: 'var(--admin-text-muted)', fontSize: '0.75rem' }}>Revenue</th>
                                    <th style={{ padding: '15px', textAlign: 'right', color: 'var(--admin-text-muted)', fontSize: '0.75rem' }}>Net Contribution</th>
                                    <th style={{ padding: '15px', textAlign: 'center', color: 'var(--admin-text-muted)', fontSize: '0.75rem' }}>Rating</th>
                                    <th style={{ padding: '15px', textAlign: 'center', color: 'var(--admin-text-muted)', fontSize: '0.75rem' }}>Status</th>
                                    <th style={{ padding: '15px', textAlign: 'right', color: 'var(--admin-text-muted)', fontSize: '0.75rem' }}>Detail</th>
                                </tr>
                            </thead>
                            <tbody>
                                {performanceData.map((row) => (
                                    <tr key={row.id} onClick={() => setSelectedEmployee(row)} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)', cursor: 'pointer', transition: 'background 0.2s' }} className="hover-row">
                                        <td style={{ padding: '15px' }}>
                                            <div style={{ fontWeight: '600' }}>{row.name}</div>
                                            <div style={{ fontSize: '0.7rem', color: 'var(--admin-text-muted)' }}>{row.role} • {row.outlet}</div>
                                        </td>
                                        <td style={{ padding: '15px', textAlign: 'center' }}>{row.services}</td>
                                        <td style={{ padding: '15px', textAlign: 'center' }}>{row.products}</td>
                                        <td style={{ padding: '15px', textAlign: 'right', fontWeight: 'bold' }}>₹{row.revenue.toLocaleString()}</td>
                                        <td style={{ padding: '15px', textAlign: 'right', color: '#4ade80' }}>₹{row.contribution.toLocaleString()}</td>
                                        <td style={{ padding: '15px', textAlign: 'center' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', fontSize: '0.85rem' }}>
                                                <Star size={12} fill="#f59e0b" color="#f59e0b" /> {row.rating}
                                            </div>
                                        </td>
                                        <td style={{ padding: '15px', textAlign: 'center' }}>
                                            <span style={{
                                                padding: '4px 8px', borderRadius: '4px', fontSize: '0.7rem',
                                                background: `${getStatusColor(row.status)}15`, color: getStatusColor(row.status), border: `1px solid ${getStatusColor(row.status)}30`
                                            }}>
                                                {row.status}
                                            </span>
                                        </td>
                                        <td style={{ padding: '15px', textAlign: 'right' }}>
                                            <ChevronRight size={18} color="var(--admin-text-muted)" />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                /* Visual Charts Section */
                <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '25px' }}>
                    <div className="content-card" style={{ padding: '25px' }}>
                        <h3 style={{ fontSize: '1.1rem', marginBottom: '25px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <TrendingUp size={20} color="var(--admin-accent)" /> Revenue vs Contribution per Staff
                        </h3>
                        <div style={{ height: '350px', width: '100%' }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={revenueByStaff} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                                    <XAxis dataKey="name" stroke="var(--admin-text-muted)" fontSize={12} />
                                    <YAxis stroke="var(--admin-text-muted)" fontSize={12} />
                                    <Tooltip
                                        contentStyle={{ background: 'var(--admin-bg-sidebar)', border: '1px solid var(--admin-border)', borderRadius: '8px' }}
                                        itemStyle={{ fontSize: '12px' }}
                                    />
                                    <Bar dataKey="revenue" name="Total Revenue" fill="var(--admin-accent)" radius={[4, 4, 0, 0]} barSize={40} />
                                    <Bar dataKey="contribution" name="Net Profit" fill="#4ade80" radius={[4, 4, 0, 0]} barSize={40} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="content-card" style={{ padding: '25px' }}>
                        <h3 style={{ fontSize: '1.1rem', marginBottom: '25px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <BarChart3 size={20} color="var(--admin-accent)" /> Revenue Trend (Last 5 Months)
                        </h3>
                        <div style={{ height: '350px', width: '100%' }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={trendData}>
                                    <defs>
                                        <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="var(--admin-accent)" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="var(--admin-accent)" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                                    <XAxis dataKey="month" stroke="var(--admin-text-muted)" fontSize={12} />
                                    <YAxis stroke="var(--admin-text-muted)" fontSize={12} />
                                    <Tooltip
                                        contentStyle={{ background: 'var(--admin-bg-sidebar)', border: '1px solid var(--admin-border)', borderRadius: '8px' }}
                                    />
                                    <Area type="monotone" dataKey="revenue" stroke="var(--admin-accent)" fillOpacity={1} fill="url(#colorRev)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="content-card" style={{ padding: '25px', gridColumn: 'span 2' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
                            <div style={{ textAlign: 'center', padding: '20px', background: 'rgba(255,255,255,0.02)', borderRadius: '12px' }}>
                                <div style={{ color: 'var(--admin-accent)', fontSize: '0.8rem', marginBottom: '10px' }}>Contribution Margin</div>
                                <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>56.8%</div>
                                <div style={{ fontSize: '0.7rem', color: '#4ade80', marginTop: '5px' }}>↑ 2.4% from Jan</div>
                            </div>
                            <div style={{ textAlign: 'center', padding: '20px', background: 'rgba(255,255,255,0.02)', borderRadius: '12px' }}>
                                <div style={{ color: '#4ade80', fontSize: '0.8rem', marginBottom: '10px' }}>Customer Retention</div>
                                <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>82%</div>
                                <div style={{ fontSize: '0.7rem', color: '#4ade80', marginTop: '5px' }}>↑ 5.1% from Jan</div>
                            </div>
                            <div style={{ textAlign: 'center', padding: '20px', background: 'rgba(255,255,255,0.02)', borderRadius: '12px' }}>
                                <div style={{ color: '#f59e0b', fontSize: '0.8rem', marginBottom: '10px' }}>Upsell Success</div>
                                <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>24%</div>
                                <div style={{ fontSize: '0.7rem', color: '#ef4444', marginTop: '5px' }}>↓ 1.2% from Jan</div>
                            </div>
                            <div style={{ textAlign: 'center', padding: '20px', background: 'rgba(255,255,255,0.02)', borderRadius: '12px' }}>
                                <div style={{ color: '#a78bfa', fontSize: '0.8rem', marginBottom: '10px' }}>Active Staff</div>
                                <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>21 / 24</div>
                                <div style={{ fontSize: '0.7rem', color: 'var(--admin-text-muted)', marginTop: '5px' }}>On Duty Today</div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Employee Detail Modal */}
            {selectedEmployee && (
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
                    <div className="content-card" style={{ width: '800px', maxHeight: '90vh', overflowY: 'auto', padding: 0 }}>
                        <div style={{ padding: '20px', borderBottom: '1px solid var(--admin-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--admin-bg-sidebar)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                <div style={{ width: '45px', height: '45px', borderRadius: '50%', background: 'var(--admin-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '1.2rem' }}>
                                    {selectedEmployee.name[0]}
                                </div>
                                <div>
                                    <h3 style={{ margin: 0 }}>{selectedEmployee.name} Performance Profile</h3>
                                    <div style={{ fontSize: '0.8rem', color: 'var(--admin-text-muted)' }}>Emp ID: PERF-{selectedEmployee.id}00 • {selectedEmployee.role}</div>
                                </div>
                            </div>
                            <button onClick={() => setSelectedEmployee(null)} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}><X size={24} /></button>
                        </div>

                        <div style={{ padding: '30px' }}>
                            {/* Modal Grid */}
                            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '30px' }}>
                                {/* Left Side: Stats & Revenue */}
                                <div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                                        <h4 style={{ margin: 0, fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <TrendingUp size={18} color="var(--admin-accent)" /> Revenue Trends
                                        </h4>
                                        <div style={{ fontSize: '0.8rem', color: selectedEmployee.trend === 'up' ? '#4ade80' : '#ef4444', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                            {selectedEmployee.trend === 'up' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                                            {selectedEmployee.trend === 'up' ? '+12%' : '-5%'} vs last month
                                        </div>
                                    </div>

                                    <div style={{ background: 'rgba(255,255,255,0.02)', padding: '20px', borderRadius: '12px', border: '1px solid var(--admin-border)' }}>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                                            <div>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '8px' }}>
                                                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Scissors size={14} /> Hair Services</span>
                                                    <span style={{ fontWeight: 'bold' }}>₹{selectedEmployee.serviceBreakdown.hair.toLocaleString()}</span>
                                                </div>
                                                <div style={{ height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '3px', overflow: 'hidden' }}>
                                                    <div style={{ width: '70%', height: '100%', background: '#60a5fa' }}></div>
                                                </div>
                                            </div>
                                            <div>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '8px' }}>
                                                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Star size={14} /> Skin/Beauty</span>
                                                    <span style={{ fontWeight: 'bold' }}>₹{selectedEmployee.serviceBreakdown.skin.toLocaleString()}</span>
                                                </div>
                                                <div style={{ height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '3px', overflow: 'hidden' }}>
                                                    <div style={{ width: '30%', height: '100%', background: '#a78bfa' }}></div>
                                                </div>
                                            </div>
                                            <div>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '8px' }}>
                                                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><ShoppingBag size={14} /> Product Sales</span>
                                                    <span style={{ fontWeight: 'bold' }}>₹7,500</span>
                                                </div>
                                                <div style={{ height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '3px', overflow: 'hidden' }}>
                                                    <div style={{ width: '15%', height: '100%', background: '#4ade80' }}></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div style={{ marginTop: '25px' }}>
                                        <h4 style={{ margin: '0 0 15px 0', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <MessageSquare size={18} color="var(--admin-accent)" /> Customer Feedback
                                        </h4>
                                        <div style={{ padding: '15px', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid var(--admin-border)', fontStyle: 'italic', fontSize: '0.9rem', color: 'var(--admin-text-muted)' }}>
                                            "{selectedEmployee.feedback}"
                                        </div>
                                    </div>
                                </div>

                                {/* Right Side: Breakdown & Notes */}
                                <div style={{ background: 'rgba(255,255,255,0.02)', padding: '25px', borderRadius: '12px', border: '1px solid var(--admin-border)' }}>
                                    <h4 style={{ margin: '0 0 20px 0', fontSize: '1rem' }}>Financial Breakdown</h4>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                                            <span style={{ color: 'var(--admin-text-muted)' }}>Gross Revenue</span>
                                            <span style={{ fontWeight: '600' }}>₹{selectedEmployee.revenue.toLocaleString()}</span>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                                            <span style={{ color: 'var(--admin-text-muted)' }}>Total Commissions</span>
                                            <span style={{ color: '#ef4444' }}>- ₹{selectedEmployee.commission.toLocaleString()}</span>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                                            <span style={{ color: 'var(--admin-text-muted)' }}>Salary Cost</span>
                                            <span style={{ color: '#ef4444' }}>- ₹{selectedEmployee.salary.toLocaleString()}</span>
                                        </div>
                                        <div style={{ height: '1px', background: 'var(--admin-border)', margin: '5px 0' }}></div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1rem', fontWeight: 'bold' }}>
                                            <span>Net Contribution</span>
                                            <span style={{ color: '#4ade80' }}>₹{selectedEmployee.contribution.toLocaleString()}</span>
                                        </div>
                                    </div>

                                    <div style={{ marginTop: '30px' }}>
                                        <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', marginBottom: '10px' }}><Tag size={16} /> Internal Admin Notes</label>
                                        <textarea
                                            placeholder="Add performance notes (internal only)..."
                                            style={{ width: '100%', height: '80px', background: 'var(--admin-bg-sidebar)', border: '1px solid var(--admin-border)', borderRadius: '8px', color: '#fff', padding: '10px', fontSize: '0.85rem', resize: 'none' }}
                                        ></textarea>
                                        <button className="bb-btn bb-btn-gold" style={{ width: '100%', marginTop: '10px', padding: '8px' }}>Save Notes</button>
                                    </div>
                                </div>
                            </div>

                            <div style={{ marginTop: '30px', display: 'flex', gap: '15px' }}>
                                <button className="bb-btn bb-btn-outline" style={{ flex: 1, color: '#f59e0b', borderColor: 'rgba(245, 158, 11, 0.3)' }}>Tag as Needs Training</button>
                                <button className="bb-btn bb-btn-gold" style={{ flex: 1 }}>Promote to Top Performer</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <style jsx>{`
                .hover-row:hover {
                    background: rgba(255,255,255,0.03);
                }
                .performance-page {
                    animation: fadeIn 0.5s ease-out;
                }
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    );
};

export default HrPerformance;
