import React from 'react';
import { Wallet, CreditCard, Receipt, TrendingDown, Calendar, ArrowUpRight, ArrowDownRight, TrendingUp, PieChart as PieIcon } from 'lucide-react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    AreaChart, Area, Legend, PieChart, Pie, Cell
} from 'recharts';

const FinanceDashboard = () => {
    const stats = [
        {
            title: 'Total Expenses (Feb)',
            value: '₹1,45,200',
            icon: <TrendingDown size={24} />,
            color: '#f87171',
            trend: '+12% vs last month',
            trendUp: true
        },
        {
            title: 'Total Supplier Dues',
            value: '₹3,20,500',
            icon: <Receipt size={24} />,
            color: '#f59e0b',
            trend: '5 Pending Invoices',
            trendUp: false
        },
        {
            title: 'Cash Balance',
            value: '₹42,850',
            icon: <Wallet size={24} />,
            color: '#4ade80',
            trend: 'Last updated 2h ago',
            trendUp: false
        },
        {
            title: 'Bank Balance',
            value: '₹12,85,400',
            icon: <CreditCard size={24} />,
            color: '#60a5fa',
            trend: 'Linked: HDFC Bank',
            trendUp: false
        },
    ];

    // Chart Data
    const monthlyData = [
        { month: 'Oct', income: 720000, expenses: 450000 },
        { month: 'Nov', income: 850000, expenses: 520000 },
        { month: 'Dec', income: 1100000, expenses: 680000 },
        { month: 'Jan', income: 950000, expenses: 610000 },
        { month: 'Feb', income: 1250000, expenses: 780000 },
    ];

    const expenseBreakdown = [
        { name: 'Products', value: 45000, color: '#60a5fa' },
        { name: 'Rent', value: 80000, color: '#a78bfa' },
        { name: 'Marketing', value: 15000, color: '#4ade80' },
        { name: 'Utility', value: 25000, color: '#f59e0b' },
    ];

    return (
        <div className="finance-dashboard-page">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
                <h2 className="page-title" style={{ margin: 0 }}>Financial Overview</h2>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'var(--admin-bg-sidebar)', padding: '8px 15px', borderRadius: '8px', border: '1px solid var(--admin-border)' }}>
                    <Calendar size={18} color="var(--admin-accent)" />
                    <span style={{ fontSize: '0.9rem', fontWeight: '500' }}>February 2026</span>
                </div>
            </div>

            {/* Summary Cards */}
            <div className="dashboard-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '30px' }}>
                {stats.map((stat, index) => (
                    <div key={index} className="stat-card" style={{ padding: '20px', position: 'relative', overflow: 'hidden' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                            <div style={{
                                padding: '10px',
                                borderRadius: '12px',
                                background: `${stat.color}15`,
                                color: stat.color,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                {stat.icon}
                            </div>
                            {stat.trendUp !== undefined && (
                                <div style={{
                                    fontSize: '0.75rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '4px',
                                    color: stat.trendUp ? '#f87171' : '#4ade80',
                                    fontWeight: '600'
                                }}>
                                    {stat.trendUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                                    {stat.trend.split(' ')[0]}
                                </div>
                            )}
                        </div>
                        <div style={{ fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '5px' }}>{stat.value}</div>
                        <div style={{ fontSize: '0.85rem', color: 'var(--admin-text-muted)', fontWeight: '500' }}>{stat.title}</div>
                        <div style={{ marginTop: '15px', fontSize: '0.75rem', color: 'var(--admin-text-muted)', borderTop: '1px solid var(--admin-border)', paddingTop: '10px' }}>
                            {stat.trend}
                        </div>
                    </div>
                ))}
            </div>

            {/* Visual Analytics */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px', marginBottom: '30px' }}>
                {/* Cash Flow Chart */}
                <div className="content-card" style={{ padding: '25px' }}>
                    <h3 style={{ fontSize: '1.1rem', marginBottom: '25px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <TrendingUp size={20} color="var(--admin-accent)" /> Income vs Expenses (Monthly)
                    </h3>
                    <div style={{ height: '350px', width: '100%' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={monthlyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                                <XAxis dataKey="month" stroke="var(--admin-text-muted)" fontSize={12} />
                                <YAxis stroke="var(--admin-text-muted)" fontSize={12} />
                                <Tooltip
                                    contentStyle={{ background: 'var(--admin-bg-sidebar)', border: '1px solid var(--admin-border)', borderRadius: '8px' }}
                                    itemStyle={{ fontSize: '12px' }}
                                />
                                <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '20px' }} />
                                <Bar dataKey="income" name="Total Income" fill="#4ade80" radius={[4, 4, 0, 0]} barSize={35} />
                                <Bar dataKey="expenses" name="Total Expenses" fill="#f87171" radius={[4, 4, 0, 0]} barSize={35} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Expense Breakdown */}
                <div className="content-card" style={{ padding: '25px' }}>
                    <h3 style={{ fontSize: '1.1rem', marginBottom: '25px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <PieIcon size={20} color="var(--admin-accent)" /> Expense Breakdown
                    </h3>
                    <div style={{ height: '350px', width: '100%', position: 'relative' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={expenseBreakdown}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={100}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {expenseBreakdown.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{ background: 'var(--admin-bg-sidebar)', border: '1px solid var(--admin-border)', borderRadius: '8px' }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
                            <div style={{ fontSize: '0.7rem', color: 'var(--admin-text-muted)' }}>Total</div>
                            <div style={{ fontSize: '1rem', fontWeight: 'bold' }}>₹1.6L</div>
                        </div>
                    </div>
                    {/* Legend Labels */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '10px' }}>
                        {expenseBreakdown.map((item, index) => (
                            <div key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: item.color }}></div>
                                    <span style={{ color: 'var(--admin-text-muted)' }}>{item.name}</span>
                                </div>
                                <span style={{ fontWeight: '600' }}>₹{item.value.toLocaleString()}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Trend Analysis */}
            <div className="content-card" style={{ padding: '25px' }}>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '25px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Calendar size={20} color="var(--admin-accent)" /> Daily Net Cash Flow (Last 30 Days)
                </h3>
                <div style={{ height: '250px', width: '100%' }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={monthlyData}>
                            <defs>
                                <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#4ade80" stopOpacity={0.2} />
                                    <stop offset="95%" stopColor="#4ade80" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                            <XAxis dataKey="month" stroke="var(--admin-text-muted)" fontSize={12} />
                            <YAxis stroke="var(--admin-text-muted)" fontSize={12} />
                            <Tooltip
                                contentStyle={{ background: 'var(--admin-bg-sidebar)', border: '1px solid var(--admin-border)', borderRadius: '8px' }}
                            />
                            <Area type="monotone" dataKey="income" stroke="#4ade80" fillOpacity={1} fill="url(#colorIncome)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default FinanceDashboard;
