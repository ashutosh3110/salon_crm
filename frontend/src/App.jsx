import { useState } from 'react'
import './App.css'

export function App() {
    return (
        <div className="container">
            <header style={{ padding: 'var(--space-2xl) 0', textAlign: 'center' }}>
                <h1 style={{ fontSize: '3.5rem', marginBottom: 'var(--space-sm)' }}>Salon CRM</h1>
                <p style={{ fontSize: '1.2rem', color: 'var(--color-text-muted)', fontFamily: 'var(--font-body)' }}>
                    Professional Management for your Salon & Spa
                </p>
            </header>

            <main style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-lg)' }}>
                <div className="card">
                    <h2>Appointments</h2>
                    <p style={{ margin: 'var(--space-md) 0' }}>Manage today's bookings and schedule new clients seamlessly.</p>
                    <button className="btn-primary">View Schedule</button>
                </div>

                <div className="card">
                    <h2>Inventory</h2>
                    <p style={{ margin: 'var(--space-md) 0' }}>Track your products and beauty supplies with ease.</p>
                    <button className="btn-secondary">Check Stocks</button>
                </div>

                <div className="card">
                    <h2>Customers</h2>
                    <p style={{ margin: 'var(--space-md) 0' }}>Build lasting relationships with detailed client profiles.</p>
                    <button className="btn-primary">View CRM</button>
                </div>
            </main>

            <section style={{ marginTop: 'var(--space-3xl)', padding: 'var(--space-2xl)', background: 'var(--color-surface)', borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-lg)' }}>
                <h2 style={{ marginBottom: 'var(--space-lg)' }}>Quick Registration</h2>
                <form style={{ display: 'grid', gap: 'var(--space-md)' }}>
                    <div style={{ display: 'grid', gap: 'var(--space-xs)' }}>
                        <label style={{ fontWeight: 600 }}>Salon Name</label>
                        <input type="text" className="input" placeholder="Luxury Spa & Salon" />
                    </div>
                    <div style={{ display: 'grid', gap: 'var(--space-xs)' }}>
                        <label style={{ fontWeight: 600 }}>Email Address</label>
                        <input type="email" className="input" placeholder="contact@example.com" />
                    </div>
                    <button type="button" className="btn-primary" style={{ width: 'fit-content', marginTop: 'var(--space-md)' }}>
                        Register Now
                    </button>
                </form>
            </section>

            <footer style={{ marginTop: 'auto', padding: 'var(--space-2xl) 0', textAlign: 'center', borderTop: '1px solid var(--color-border)' }}>
                <p>© 2026 Salon CRM. Elegant management for the modern beauty industry.</p>
            </footer>
        </div>
    )
}
