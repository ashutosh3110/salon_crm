import React, { useState } from 'react';
import { Settings, CreditCard, Receipt, Percent, ShieldCheck, Hash, Save, Palette } from 'lucide-react';
import { useTheme } from '../../../context/ThemeContext';

const PosSettings = () => {
    const { brandColor, updateTheme } = useTheme();

    const [settings, setSettings] = useState({
        gstEnabled: true,
        serviceTax: '5',
        billPrefix: 'INV',
        nextBillNo: '0001',
        footerText: 'Thank you for your visit! Have a great day.',
        maxDiscount: '20',
        allowedModes: {
            cash: true,
            card: true,
            upi: true,
            wallet: false
        }
    });

    const handleToggle = (key) => {
        setSettings(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const handleModeToggle = (mode) => {
        setSettings(prev => ({
            ...prev,
            allowedModes: { ...prev.allowedModes, [mode]: !prev.allowedModes[mode] }
        }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSettings(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="pos-settings">
            <div className="card-header" style={{ marginBottom: '25px' }}>
                <h2 className="card-title">POS Configuration</h2>
                <button className="bb-btn bb-btn-gold" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px' }}>
                    <Save size={18} /> Save Settings
                </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '25px' }}>
                {/* Branding & Theme Section */}
                <div className="content-card">
                    <h3 style={{ fontSize: '1rem', color: 'var(--admin-accent)', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Palette size={18} /> Global Branding
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '10px', fontSize: '0.9rem' }}>Primary Brand Color</label>
                            <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                                <input
                                    type="color"
                                    value={brandColor}
                                    onChange={(e) => updateTheme({ brandColor: e.target.value })}
                                    style={{ width: '50px', height: '50px', border: 'none', background: 'none', cursor: 'pointer' }}
                                />
                                <div style={{ fontSize: '0.9rem', color: 'var(--admin-text-muted)' }}>
                                    Current: <span style={{ color: brandColor, fontWeight: 'bold' }}>{brandColor.toUpperCase()}</span>
                                </div>
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: '10px' }}>
                            {['#B85C5C', '#2C6E49', '#4361EE', '#7209B7', '#FF9F1C'].map(color => (
                                <button
                                    key={color}
                                    onClick={() => updateTheme({ brandColor: color })}
                                    style={{ width: '30px', height: '30px', borderRadius: '50%', background: color, border: brandColor === color ? '2px solid white' : 'none', cursor: 'pointer' }}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Tax Settings */}
                <div className="content-card">
                    <h3 style={{ fontSize: '1rem', color: 'var(--admin-accent)', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <ShieldCheck size={18} /> Tax Configuration
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px' }}>
                            <div>
                                <div style={{ fontWeight: '600' }}>GST Setting</div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--admin-text-muted)' }}>Enable/Disable GST on invoices</div>
                            </div>
                            <input
                                type="checkbox"
                                checked={settings.gstEnabled}
                                onChange={() => handleToggle('gstEnabled')}
                                style={{ width: '40px', height: '20px', cursor: 'pointer' }}
                            />
                        </div>

                        <div className="form-group">
                            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem' }}>Service Tax (%)</label>
                            <div style={{ position: 'relative' }}>
                                <Percent size={14} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--admin-text-muted)' }} />
                                <input
                                    type="number"
                                    name="serviceTax"
                                    value={settings.serviceTax}
                                    onChange={handleChange}
                                    style={{ width: '100%', padding: '10px', background: 'var(--admin-bg-sidebar)', border: '1px solid var(--admin-border)', borderRadius: '8px', color: '#fff' }}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bill Numbering */}
                <div className="content-card">
                    <h3 style={{ fontSize: '1rem', color: 'var(--admin-accent)', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Hash size={18} /> Bill Numbering Format
                    </h3>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                        <div className="form-group">
                            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem' }}>Invoice Prefix</label>
                            <input
                                type="text"
                                name="billPrefix"
                                value={settings.billPrefix}
                                onChange={handleChange}
                                style={{ width: '100%', padding: '10px', background: 'var(--admin-bg-sidebar)', border: '1px solid var(--admin-border)', borderRadius: '8px', color: '#fff' }}
                            />
                        </div>
                        <div className="form-group">
                            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem' }}>Starting Number</label>
                            <input
                                type="text"
                                name="nextBillNo"
                                value={settings.nextBillNo}
                                onChange={handleChange}
                                style={{ width: '100%', padding: '10px', background: 'var(--admin-bg-sidebar)', border: '1px solid var(--admin-border)', borderRadius: '8px', color: '#fff' }}
                            />
                        </div>
                    </div>
                    <div style={{ marginTop: '15px', padding: '10px', background: 'rgba(184, 92, 92, 0.05)', borderRadius: '6px', fontSize: '0.8rem', color: 'var(--admin-accent)', border: '1px dashed var(--admin-accent)' }}>
                        Preview: {settings.billPrefix}-{settings.nextBillNo}
                    </div>
                </div>

                {/* Payment Modes */}
                <div className="content-card">
                    <h3 style={{ fontSize: '1rem', color: 'var(--admin-accent)', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <CreditCard size={18} /> Allowed Payment Modes
                    </h3>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                        {Object.keys(settings.allowedModes).map((mode) => (
                            <div key={mode} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', border: '1px solid var(--admin-border)' }}>
                                <input
                                    type="checkbox"
                                    checked={settings.allowedModes[mode]}
                                    onChange={() => handleModeToggle(mode)}
                                    style={{ width: '18px', height: '18px' }}
                                />
                                <span style={{ textTransform: 'capitalize', fontSize: '0.9rem' }}>{mode}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Discount & Footer */}
                <div className="content-card">
                    <h3 style={{ fontSize: '1rem', color: 'var(--admin-accent)', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Receipt size={18} /> Footer & Discount Rules
                    </h3>
                    <div className="form-group" style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem' }}>Max Discount Cap (%)</label>
                        <input
                            type="number"
                            name="maxDiscount"
                            value={settings.maxDiscount}
                            onChange={handleChange}
                            style={{ width: '100%', padding: '10px', background: 'var(--admin-bg-sidebar)', border: '1px solid var(--admin-border)', borderRadius: '8px', color: '#fff' }}
                        />
                    </div>
                    <div className="form-group">
                        <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem' }}>Invoice Footer Text</label>
                        <textarea
                            name="footerText"
                            value={settings.footerText}
                            onChange={handleChange}
                            style={{ width: '100%', padding: '10px', background: 'var(--admin-bg-sidebar)', border: '1px solid var(--admin-border)', borderRadius: '8px', color: '#fff', height: '60px', resize: 'none' }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PosSettings;
