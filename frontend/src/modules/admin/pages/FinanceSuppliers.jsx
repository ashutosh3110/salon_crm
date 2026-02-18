import React, { useState } from 'react';
import { Plus, Search, Edit2, Trash2, X, Phone, User, Receipt, Download, Filter } from 'lucide-react';

const FinanceSuppliers = () => {
    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentSupplier, setCurrentSupplier] = useState({ name: '', phone: '', outstanding: '0' });

    // Dummy Data
    const [suppliers, setSuppliers] = useState([
        { id: 1, name: 'L\'Oréal Professional', phone: '+91 98765 43210', outstanding: 45000 },
        { id: 2, name: 'Schwarzkopf India', phone: '+91 87654 32109', outstanding: 12400 },
        { id: 3, name: 'Wellness Essentials', phone: '+91 76543 21098', outstanding: 0 },
        { id: 4, name: 'Dyson Commercial', phone: '+91 65432 10987', outstanding: 8500 },
    ]);

    const handleOpenModal = (supplier = null) => {
        if (supplier) {
            setCurrentSupplier(supplier);
            setIsEditing(true);
        } else {
            setCurrentSupplier({ name: '', phone: '', outstanding: '0' });
            setIsEditing(false);
        }
        setShowModal(true);
    };

    const handleSave = (e) => {
        e.preventDefault();
        // Logic for save would go here
        setShowModal(false);
    };

    return (
        <div className="finance-suppliers-page">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
                <div>
                    <h2 className="page-title" style={{ margin: 0 }}>Vender & Supplier Management</h2>
                    <p style={{ fontSize: '0.85rem', color: 'var(--admin-text-muted)' }}>Manage contracts and outstanding payments for your salon partners.</p>
                </div>
                <button className="bb-btn bb-btn-gold" onClick={() => handleOpenModal()} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Plus size={18} /> Add New Supplier
                </button>
            </div>

            {/* Filters and Search */}
            <div className="content-card" style={{ marginBottom: '20px', padding: '15px' }}>
                <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                    <div style={{ position: 'relative', flex: 1 }}>
                        <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--admin-text-muted)' }} />
                        <input
                            type="text"
                            placeholder="Search by supplier name or contact..."
                            className="admin-input"
                            style={{ width: '100%', paddingLeft: '40px' }}
                        />
                    </div>
                    <button className="bb-btn bb-btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Filter size={16} /> Filters
                    </button>
                    <button className="bb-btn bb-btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Download size={16} /> Export
                    </button>
                </div>
            </div>

            {/* Supplier Table */}
            <div className="content-card" style={{ padding: 0 }}>
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid var(--admin-border)' }}>
                                <th style={{ padding: '15px', textAlign: 'left', color: 'var(--admin-text-muted)', fontSize: '0.8rem' }}>Supplier Details</th>
                                <th style={{ padding: '15px', textAlign: 'left', color: 'var(--admin-text-muted)', fontSize: '0.8rem' }}>Contact Info</th>
                                <th style={{ padding: '15px', textAlign: 'right', color: 'var(--admin-text-muted)', fontSize: '0.8rem' }}>Outstanding Amt</th>
                                <th style={{ padding: '15px', textAlign: 'center', color: 'var(--admin-text-muted)', fontSize: '0.8rem' }}>Status</th>
                                <th style={{ padding: '15px', textAlign: 'right', color: 'var(--admin-text-muted)', fontSize: '0.8rem' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {suppliers.map((supplier) => (
                                <tr key={supplier.id} style={{ borderBottom: '1px solid var(--admin-border)' }}>
                                    <td style={{ padding: '15px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                            <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'var(--admin-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                                                {supplier.name[0]}
                                            </div>
                                            <div style={{ fontWeight: '600' }}>{supplier.name}</div>
                                        </div>
                                    </td>
                                    <td style={{ padding: '15px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.9rem' }}>
                                            <Phone size={14} color="var(--admin-text-muted)" /> {supplier.phone}
                                        </div>
                                    </td>
                                    <td style={{ padding: '15px', textAlign: 'right', fontWeight: 'bold', color: supplier.outstanding > 0 ? '#f87171' : '#4ade80' }}>
                                        ₹{supplier.outstanding.toLocaleString()}
                                    </td>
                                    <td style={{ padding: '15px', textAlign: 'center' }}>
                                        <span style={{
                                            padding: '4px 8px', borderRadius: '4px', fontSize: '0.7rem',
                                            background: supplier.outstanding > 0 ? 'rgba(248, 113, 113, 0.1)' : 'rgba(74, 222, 128, 0.1)',
                                            color: supplier.outstanding > 0 ? '#f87171' : '#4ade80',
                                            border: `1px solid ${supplier.outstanding > 0 ? 'rgba(248, 113, 113, 0.2)' : 'rgba(74, 222, 128, 0.2)'}`
                                        }}>
                                            {supplier.outstanding > 0 ? 'Payment Due' : 'Cleared'}
                                        </span>
                                    </td>
                                    <td style={{ padding: '15px', textAlign: 'right' }}>
                                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                                            <button
                                                className="icon-btn"
                                                onClick={() => handleOpenModal(supplier)}
                                                style={{ color: 'var(--admin-accent)', border: 'none', background: 'none', cursor: 'pointer' }}
                                            >
                                                <Edit2 size={18} />
                                            </button>
                                            <button
                                                className="icon-btn"
                                                style={{ color: '#f87171', border: 'none', background: 'none', cursor: 'pointer' }}
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal for Add/Edit */}
            {showModal && (
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
                    <div className="content-card" style={{ width: '450px', padding: '25px', position: 'relative' }}>
                        <button
                            onClick={() => setShowModal(false)}
                            style={{ position: 'absolute', right: '20px', top: '20px', background: 'none', border: 'none', color: 'var(--admin-text-muted)', cursor: 'pointer' }}
                        >
                            <X size={20} />
                        </button>

                        <h3 style={{ marginBottom: '20px', borderBottom: '1px solid var(--admin-border)', paddingBottom: '15px' }}>
                            {isEditing ? 'Edit Supplier' : 'Add New Supplier'}
                        </h3>

                        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                            <div className="form-group">
                                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', marginBottom: '8px', color: 'var(--admin-text-muted)' }}>
                                    <User size={14} /> Supplier Name
                                </label>
                                <input
                                    type="text"
                                    className="admin-input"
                                    style={{ width: '100%' }}
                                    value={currentSupplier.name}
                                    onChange={(e) => setCurrentSupplier({ ...currentSupplier, name: e.target.value })}
                                    placeholder="e.g. L'Oréal Professional"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', marginBottom: '8px', color: 'var(--admin-text-muted)' }}>
                                    <Phone size={14} /> Contact Number
                                </label>
                                <input
                                    type="text"
                                    className="admin-input"
                                    style={{ width: '100%' }}
                                    value={currentSupplier.phone}
                                    onChange={(e) => setCurrentSupplier({ ...currentSupplier, phone: e.target.value })}
                                    placeholder="+91 XXXXX XXXXX"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', marginBottom: '8px', color: 'var(--admin-text-muted)' }}>
                                    <Receipt size={14} /> Opening/Outstanding Balance
                                </label>
                                <div style={{ position: 'relative' }}>
                                    <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', fontWeight: 'bold' }}>₹</span>
                                    <input
                                        type="number"
                                        className="admin-input"
                                        style={{ width: '100%', paddingLeft: '25px' }}
                                        value={currentSupplier.outstanding}
                                        onChange={(e) => setCurrentSupplier({ ...currentSupplier, outstanding: e.target.value })}
                                        placeholder="0"
                                    />
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                                <button type="button" className="bb-btn bb-btn-outline" onClick={() => setShowModal(false)} style={{ flex: 1 }}>Cancel</button>
                                <button type="submit" className="bb-btn bb-btn-gold" style={{ flex: 1 }}>{isEditing ? 'Update Details' : 'Save Supplier'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FinanceSuppliers;
