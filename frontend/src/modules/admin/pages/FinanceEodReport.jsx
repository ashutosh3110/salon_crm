import React, { useState } from 'react';
import {
    FileText, Download, Printer, Calendar,
    TrendingUp, Wallet, Landmark, Users,
    Scissors, ShoppingBag, Star, ChevronLeft,
    ChevronRight, Filter, Mail, Share2,
    CheckCircle2
} from 'lucide-react';

const FinanceEodReport = () => {
    const [reportDate, setReportDate] = useState(new Date().toISOString().split('T')[0]);
    const [isGenerating, setIsGenerating] = useState(false);

    // Mock Report Data
    const reportData = {
        date: reportDate,
        summary: {
            totalGross: 85400,
            totalDiscounts: 4200,
            totalNet: 81200,
            cashSales: 32500,
            onlineSales: 48700,
            totalInvoices: 24,
        },
        services: [
            { name: 'Hair Services', count: 12, value: 45000 },
            { name: 'Skin & Facial', count: 6, value: 18500 },
            { name: 'Nails & Mani/Pedi', count: 8, value: 12000 },
            { name: 'Bridal/Makeup', count: 1, value: 15000 },
        ],
        products: [
            { name: 'Hair Serum', sold: 4, value: 4800 },
            { name: 'Sulphate Free Shampoo', sold: 2, value: 3600 },
        ],
        expenses: {
            total: 2850,
            items: [
                { category: 'Cleaning Supplies', amount: 450 },
                { category: 'Tea & Snacks', amount: 150 },
                { category: 'Electricity Bill', amount: 2250 },
            ]
        },
        customers: {
            total: 24,
            new: 6,
            returning: 18,
            walkins: 4,
            appointments: 20
        },
        staffPerformance: [
            { name: 'Jill', services: 6, value: 22000, rating: 4.8 },
            { name: 'Sansa', services: 4, value: 18500, rating: 5.0 },
            { name: 'Pierre', services: 8, value: 12000, rating: 4.5 },
            { name: 'Elias', services: 6, value: 28700, rating: 4.7 },
        ]
    };

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="finance-eod-report-page">
            {/* Header Controls */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px', displayPrint: 'none' }} className="no-print">
                <div>
                    <h2 className="page-title" style={{ margin: 0 }}>End of Day (EOD) Report</h2>
                    <p style={{ fontSize: '0.85rem', color: 'var(--admin-text-muted)' }}>Financial and operational summary for the selected date.</p>
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                    <div style={{ position: 'relative' }}>
                        <input
                            type="date"
                            className="admin-input"
                            value={reportDate}
                            onChange={(e) => setReportDate(e.target.value)}
                            style={{ paddingLeft: '35px' }}
                        />
                        <Calendar size={16} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--admin-text-muted)' }} />
                    </div>
                    <button className="bb-btn bb-btn-outline" onClick={handlePrint} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Printer size={18} /> Print Report
                    </button>
                    <button className="bb-btn bb-btn-gold" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Download size={18} /> Export PDF
                    </button>
                </div>
            </div>

            {/* Main Report Container */}
            <div className="printable-report" style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>

                {/* 1. Executive Summary Cards */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
                    <div className="stat-card" style={{ padding: '20px', borderTop: '4px solid var(--admin-accent)' }}>
                        <div style={{ color: 'var(--admin-text-muted)', fontSize: '0.75rem', marginBottom: '8px' }}>Total Net Sales</div>
                        <div style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>₹{reportData.summary.totalNet.toLocaleString()}</div>
                        <div style={{ fontSize: '0.7rem', color: 'var(--admin-text-muted)', marginTop: '5px' }}>{reportData.summary.totalInvoices} Invoices Generated</div>
                    </div>
                    <div className="stat-card" style={{ padding: '20px', borderTop: '4px solid #4ade80' }}>
                        <div style={{ color: 'var(--admin-text-muted)', fontSize: '0.75rem', marginBottom: '8px' }}>Cash Collections</div>
                        <div style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>₹{reportData.summary.cashSales.toLocaleString()}</div>
                        <div style={{ fontSize: '0.7rem', color: '#4ade80', marginTop: '5px' }}>40% of Daily Revenue</div>
                    </div>
                    <div className="stat-card" style={{ padding: '20px', borderTop: '4px solid #60a5fa' }}>
                        <div style={{ color: 'var(--admin-text-muted)', fontSize: '0.75rem', marginBottom: '8px' }}>Online/UPI Payments</div>
                        <div style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>₹{reportData.summary.onlineSales.toLocaleString()}</div>
                        <div style={{ fontSize: '0.7rem', color: '#60a5fa', marginTop: '5px' }}>60% of Daily Revenue</div>
                    </div>
                    <div className="stat-card" style={{ padding: '20px', borderTop: '4px solid #f87171' }}>
                        <div style={{ color: 'var(--admin-text-muted)', fontSize: '0.75rem', marginBottom: '8px' }}>Total Expenses</div>
                        <div style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>₹{reportData.expenses.total.toLocaleString()}</div>
                        <div style={{ fontSize: '0.7rem', color: '#f87171', marginTop: '5px' }}>Petty Cash Outflow</div>
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '25px' }}>

                    {/* 2. Sales Breakdown (Left Column) */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
                        <div className="content-card" style={{ padding: '25px' }}>
                            <h3 style={{ fontSize: '1rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <Scissors size={18} color="var(--admin-accent)" /> Service Sales Breakdown
                            </h3>
                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                <thead>
                                    <tr style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid var(--admin-border)' }}>
                                        <th style={{ padding: '12px', textAlign: 'left', fontSize: '0.8rem', color: 'var(--admin-text-muted)' }}>Service Category</th>
                                        <th style={{ padding: '12px', textAlign: 'center', fontSize: '0.8rem', color: 'var(--admin-text-muted)' }}>Quantity</th>
                                        <th style={{ padding: '12px', textAlign: 'right', fontSize: '0.8rem', color: 'var(--admin-text-muted)' }}>Total Value</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {reportData.services.map((s, idx) => (
                                        <tr key={idx} style={{ borderBottom: '1px solid var(--admin-border)' }}>
                                            <td style={{ padding: '12px', fontSize: '0.9rem' }}>{s.name}</td>
                                            <td style={{ padding: '12px', textAlign: 'center' }}>{s.count}</td>
                                            <td style={{ padding: '12px', textAlign: 'right', fontWeight: 'bold' }}>₹{s.value.toLocaleString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="content-card" style={{ padding: '25px' }}>
                            <h3 style={{ fontSize: '1rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <Users size={18} color="#60a5fa" /> Staff Performance Snapshot
                            </h3>
                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                <thead>
                                    <tr style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid var(--admin-border)' }}>
                                        <th style={{ padding: '12px', textAlign: 'left', fontSize: '0.8rem', color: 'var(--admin-text-muted)' }}>Staff Member</th>
                                        <th style={{ padding: '12px', textAlign: 'center', fontSize: '0.8rem', color: 'var(--admin-text-muted)' }}>Services</th>
                                        <th style={{ padding: '12px', textAlign: 'right', fontSize: '0.8rem', color: 'var(--admin-text-muted)' }}>Revenue</th>
                                        <th style={{ padding: '12px', textAlign: 'right', fontSize: '0.8rem', color: 'var(--admin-text-muted)' }}>Avg Rating</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {reportData.staffPerformance.map((staff, idx) => (
                                        <tr key={idx} style={{ borderBottom: '1px solid var(--admin-border)' }}>
                                            <td style={{ padding: '12px', fontSize: '0.9rem' }}>{staff.name}</td>
                                            <td style={{ padding: '12px', textAlign: 'center' }}>{staff.services}</td>
                                            <td style={{ padding: '12px', textAlign: 'right', fontWeight: 'bold' }}>₹{staff.value.toLocaleString()}</td>
                                            <td style={{ padding: '12px', textAlign: 'right' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '4px' }}>
                                                    {staff.rating} <Star size={12} fill="#fbbf24" color="#fbbf24" />
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* 3. Analytics & Details (Right Column) */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
                        <div className="content-card" style={{ padding: '25px' }}>
                            <h3 style={{ fontSize: '1rem', marginBottom: '20px' }}>Customer Mix</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '10px', borderBottom: '1px dashed var(--admin-border)' }}>
                                    <span style={{ fontSize: '0.85rem', color: 'var(--admin-text-muted)' }}>Total Customers</span>
                                    <span style={{ fontWeight: 'bold' }}>{reportData.customers.total}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '10px', borderBottom: '1px dashed var(--admin-border)' }}>
                                    <span style={{ fontSize: '0.85rem', color: 'var(--admin-text-muted)' }}>New Registrations</span>
                                    <span style={{ fontWeight: 'bold', color: '#4ade80' }}>+{reportData.customers.new}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span style={{ fontSize: '0.85rem', color: 'var(--admin-text-muted)' }}>Appointment vs Walk-in</span>
                                    <span style={{ fontWeight: 'bold' }}>{reportData.customers.appointments}/{reportData.customers.walkins}</span>
                                </div>
                            </div>
                        </div>

                        <div className="content-card" style={{ padding: '25px' }}>
                            <h3 style={{ fontSize: '1rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <ShoppingBag size={18} color="#4ade80" /> Product Sales
                            </h3>
                            {reportData.products.map((p, idx) => (
                                <div key={idx} style={{ marginBottom: '12px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                                        <span>{p.name} (x{p.sold})</span>
                                        <span style={{ fontWeight: 'bold' }}>₹{p.value.toLocaleString()}</span>
                                    </div>
                                    <div style={{ height: '4px', width: '100%', background: 'rgba(255,255,255,0.05)', borderRadius: '2px', marginTop: '6px' }}>
                                        <div style={{ height: '100%', width: '60%', background: '#4ade80', borderRadius: '2px' }}></div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="content-card" style={{ padding: '25px', background: 'rgba(255,215,0,0.03)', border: '1px solid rgba(255,215,0,0.1)' }}>
                            <h3 style={{ fontSize: '1rem', marginBottom: '20px' }}>Net Cash Flow</h3>
                            <div style={{ textAlign: 'center' }}>
                                <div style={{ fontSize: '0.8rem', color: 'var(--admin-text-muted)' }}>Net profit after today's expenses</div>
                                <div style={{ fontSize: '1.6rem', fontWeight: 'bold', margin: '10px 0' }}>₹{(reportData.summary.totalNet - reportData.expenses.total).toLocaleString()}</div>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px', color: '#4ade80', fontSize: '0.8rem' }}>
                                    <TrendingUp size={14} /> 12% higher than yesterday
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 4. Footer Note / Verification */}
                <div style={{ marginTop: '20px', padding: '20px', borderTop: '2px solid var(--admin-border)', textAlign: 'center', opacity: 0.6 }}>
                    <p style={{ fontSize: '0.8rem', margin: 0 }}>
                        <CheckCircle2 size={14} style={{ verticalAlign: 'middle', marginRight: '6px' }} />
                        Report generated automatically by Salon System. Financial data verified against POS records.
                    </p>
                    <p style={{ fontSize: '0.7rem', marginTop: '5px' }}>Generated on: {new Date().toLocaleString()}</p>
                </div>
            </div>

            <style>{`
                @media print {
                    .no-print, .admin-sidebar, .admin-header { display: none !important; }
                    .admin-main { padding: 0 !important; margin: 0 !important; }
                    .printable-report { color: #000 !important; }
                    .stat-card, .content-card { 
                        border: 1px solid #ddd !important; 
                        box-shadow: none !important; 
                        background: #fff !important; 
                        color: #000 !important;
                    }
                    .page-title, h3, h4, span, div { color: #000 !important; }
                    .admin-input { display: none !important; }
                }
            `}</style>
        </div>
    );
};

export default FinanceEodReport;
