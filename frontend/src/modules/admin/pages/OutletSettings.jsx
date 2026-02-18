import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Clock, Grid, FileText, Save } from 'lucide-react';

const OutletSettings = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [activeTab, setActiveTab] = useState('timing');
    const [saveStatus, setSaveStatus] = useState('');

    // Load settings from localStorage for testing
    const [settings, setSettings] = useState(() => {
        const saved = localStorage.getItem(`settings_${id}`);
        return saved ? JSON.parse(saved) : {
            chairs: 5,
            rooms: 2,
            gstEnabled: true,
            gstNumber: '',
            gstRate: '18'
        };
    });

    const handleSave = () => {
        localStorage.setItem(`settings_${id}`, JSON.stringify(settings));

        // Trigger history update if we are on GST tab
        if (activeTab === 'gst') {
            const trigger = document.getElementById('gst-history-trigger');
            if (trigger) trigger.click();
        }

        setSaveStatus('Settings saved successfully!');
        setTimeout(() => setSaveStatus(''), 3000);
    };

    const tabs = [
        { id: 'timing', title: 'Timing & Schedule', icon: <Clock size={18} /> },
        { id: 'layout', title: 'Chairs & Rooms', icon: <Grid size={18} /> },
        { id: 'gst', title: 'GST & Legal', icon: <FileText size={18} /> },
    ];

    return (
        <div className="outlet-settings-page">
            <div style={{ marginBottom: '25px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <button
                        onClick={() => navigate('/admin/outlets')}
                        className="header-icon-btn"
                        style={{ background: 'var(--admin-bg-light)' }}
                    >
                        <ArrowLeft size={20} />
                    </button>
                    <h2 className="card-title" style={{ margin: 0 }}>Outlet Settings</h2>
                </div>
                {saveStatus && <span style={{ color: '#4ade80', fontSize: '0.9rem', fontWeight: '500' }}>{saveStatus}</span>}
            </div>

            <div className="settings-container" style={{ display: 'grid', gridTemplateColumns: '250px 1fr', gap: '30px' }}>
                {/* Settings Sidebar */}
                <div className="content-card" style={{ padding: '10px', alignSelf: 'start' }}>
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            style={{
                                width: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                padding: '12px 15px',
                                border: 'none',
                                background: activeTab === tab.id ? 'var(--admin-accent-soft)' : 'transparent',
                                color: activeTab === tab.id ? 'var(--admin-accent)' : 'var(--admin-text-muted)',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                textAlign: 'left',
                                transition: 'all 0.2s',
                                fontWeight: activeTab === tab.id ? '600' : '400',
                                marginBottom: '5px'
                            }}
                        >
                            {tab.icon}
                            {tab.title}
                        </button>
                    ))}
                </div>

                {/* Settings Content */}
                <div className="content-card">
                    {activeTab === 'timing' && <TimingSettings />}
                    {activeTab === 'layout' && <LayoutSettings settings={settings} setSettings={setSettings} />}
                    {activeTab === 'gst' && <GstSettings settings={settings} setSettings={setSettings} outletId={id} />}

                    <div style={{ marginTop: '30px', borderTop: '1px solid var(--admin-border)', paddingTop: '20px', display: 'flex', justifyContent: 'flex-end' }}>
                        <button
                            className="bb-btn bb-btn-gold"
                            style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 25px' }}
                            onClick={handleSave}
                        >
                            <Save size={18} /> Save Changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const TimingSettings = () => {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    return (
        <div>
            <h3 style={{ marginBottom: '20px', color: 'var(--admin-text-main)' }}>Operating Hours</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {days.map(day => (
                    <div key={day} style={{ display: 'grid', gridTemplateColumns: '120px 100px 1fr 1fr', alignItems: 'center', gap: '20px' }}>
                        <span style={{ fontWeight: '500', color: 'var(--admin-text-main)' }}>{day}</span>
                        <label className="switch" style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                            <input type="checkbox" defaultChecked style={{ width: '16px', height: '16px' }} />
                            <span style={{ fontSize: '0.8rem', color: 'var(--admin-text-muted)' }}>Open</span>
                        </label>
                        <input type="time" defaultValue="09:00" style={{ padding: '8px', background: 'var(--admin-bg-main)', border: '1px solid var(--admin-border)', borderRadius: '6px', color: 'var(--admin-text-main)' }} />
                        <input type="time" defaultValue="21:00" style={{ padding: '8px', background: 'var(--admin-bg-main)', border: '1px solid var(--admin-border)', borderRadius: '6px', color: 'var(--admin-text-main)' }} />
                    </div>
                ))}
            </div>
        </div>
    );
};

const LayoutSettings = ({ settings, setSettings }) => {
    return (
        <div>
            <h3 style={{ marginBottom: '20px', color: 'var(--admin-text-main)' }}>Physical Setup</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div className="form-group">
                    <label style={{ display: 'block', marginBottom: '8px', color: 'var(--admin-text-main)' }}>Total Chairs / Stations</label>
                    <input
                        type="number"
                        value={settings.chairs}
                        onChange={(e) => setSettings({ ...settings, chairs: e.target.value })}
                        style={{ width: '100%', padding: '12px', background: 'var(--admin-bg-main)', border: '1px solid var(--admin-border)', borderRadius: '8px', color: 'var(--admin-text-main)' }}
                    />
                    <p style={{ fontSize: '0.75rem', color: 'var(--admin-text-muted)', marginTop: '5px' }}>Number of concurrent clients you can serve.</p>
                </div>
                <div className="form-group">
                    <label style={{ display: 'block', marginBottom: '8px', color: 'var(--admin-text-main)' }}>Private Rooms</label>
                    <input
                        type="number"
                        value={settings.rooms}
                        onChange={(e) => setSettings({ ...settings, rooms: e.target.value })}
                        style={{ width: '100%', padding: '12px', background: 'var(--admin-bg-main)', border: '1px solid var(--admin-border)', borderRadius: '8px', color: 'var(--admin-text-main)' }}
                    />
                    <p style={{ fontSize: '0.75rem', color: 'var(--admin-text-muted)', marginTop: '5px' }}>For spa, facials, or private treatments.</p>
                </div>
            </div>
        </div>
    );
};

const GstSettings = ({ settings, setSettings, outletId }) => {
    const [history, setHistory] = useState(() => {
        const savedHistory = localStorage.getItem(`gst_history_${outletId}`);
        return savedHistory ? JSON.parse(savedHistory) : [];
    });

    const handleGstUpdate = () => {
        const newRecord = {
            id: Date.now(),
            gstNumber: settings.gstNumber || 'N/A',
            gstRate: settings.gstRate,
            enabled: settings.gstEnabled,
            updatedAt: new Date().toLocaleString()
        };
        const updatedHistory = [newRecord, ...history];
        setHistory(updatedHistory);
        localStorage.setItem(`gst_history_${outletId}`, JSON.stringify(updatedHistory));
    };

    return (
        <div>
            <h3 style={{ marginBottom: '20px', color: 'var(--admin-text-main)' }}>Taxation & GST</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <input
                        type="checkbox"
                        id="gstEnabled"
                        checked={settings.gstEnabled}
                        onChange={(e) => setSettings({ ...settings, gstEnabled: e.target.checked })}
                        style={{ width: '18px', height: '18px' }}
                    />
                    <label htmlFor="gstEnabled" style={{ color: 'var(--admin-text-main)', fontWeight: '500', cursor: 'pointer' }}>Enable GST Billing</label>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    <div className="form-group">
                        <label style={{ display: 'block', marginBottom: '8px', color: 'var(--admin-text-main)' }}>GSTIN Number</label>
                        <input
                            type="text"
                            value={settings.gstNumber}
                            onChange={(e) => setSettings({ ...settings, gstNumber: e.target.value })}
                            placeholder="e.g. 07AAAAA0000A1Z5"
                            style={{ width: '100%', padding: '12px', background: 'var(--admin-bg-main)', border: '1px solid var(--admin-border)', borderRadius: '8px', color: 'var(--admin-text-main)' }}
                        />
                    </div>
                    <div className="form-group">
                        <label style={{ display: 'block', marginBottom: '8px', color: 'var(--admin-text-main)' }}>Default GST Rate (%)</label>
                        <select
                            value={settings.gstRate}
                            onChange={(e) => setSettings({ ...settings, gstRate: e.target.value })}
                            style={{ width: '100%', padding: '12px', background: 'var(--admin-bg-main)', border: '1px solid var(--admin-border)', borderRadius: '8px', color: 'var(--admin-text-main)' }}
                        >
                            <option value="5">5%</option>
                            <option value="12">12%</option>
                            <option value="18">18%</option>
                            <option value="28">28%</option>
                        </select>
                    </div>
                </div>

                {/* History Section */}
                <div style={{ marginTop: '40px' }}>
                    <h4 style={{ marginBottom: '15px', color: 'var(--admin-text-main)', fontSize: '1rem', borderTop: '1px solid var(--admin-border)', paddingTop: '20px' }}>GST Update History</h4>
                    <div style={{ background: 'var(--admin-bg-main)', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--admin-border)' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                            <thead>
                                <tr style={{ background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid var(--admin-border)' }}>
                                    <th style={{ padding: '12px 15px', textAlign: 'left', color: 'var(--admin-text-muted)' }}>Date & Time</th>
                                    <th style={{ padding: '12px 15px', textAlign: 'left', color: 'var(--admin-text-muted)' }}>GSTIN</th>
                                    <th style={{ padding: '12px 15px', textAlign: 'left', color: 'var(--admin-text-muted)' }}>Rate</th>
                                    <th style={{ padding: '12px 15px', textAlign: 'left', color: 'var(--admin-text-muted)' }}>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {history.length === 0 ? (
                                    <tr>
                                        <td colSpan="4" style={{ padding: '30px', textAlign: 'center', color: 'var(--admin-text-muted)' }}>No update history found.</td>
                                    </tr>
                                ) : (
                                    history.map((record) => (
                                        <tr key={record.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                                            <td style={{ padding: '12px 15px', color: 'var(--admin-text-main)' }}>{record.updatedAt}</td>
                                            <td style={{ padding: '12px 15px', color: 'var(--admin-text-main)' }}>{record.gstNumber}</td>
                                            <td style={{ padding: '12px 15px', color: 'var(--admin-text-main)' }}>{record.gstRate}%</td>
                                            <td style={{ padding: '12px 15px' }}>
                                                <span style={{
                                                    padding: '3px 10px',
                                                    borderRadius: '6px',
                                                    background: record.enabled ? 'rgba(74, 222, 128, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                                                    color: record.enabled ? '#4ade80' : '#ef4444',
                                                    fontSize: '0.75rem',
                                                    fontWeight: '600'
                                                }}>
                                                    {record.enabled ? 'Enabled' : 'Disabled'}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {/* Hidden button to trigger history update from parent */}
            <button id="gst-history-trigger" onClick={handleGstUpdate} style={{ display: 'none' }}></button>
        </div>
    );
};

export default OutletSettings;
