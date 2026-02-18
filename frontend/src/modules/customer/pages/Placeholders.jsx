import React from 'react';
const Placeholder = ({ title }) => (
    <div style={{ padding: '40px 20px', textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'Playfair Display, serif' }}>{title}</h2>
        <p style={{ color: 'var(--customer-text-muted)', marginTop: '10px' }}>This section is coming soon!</p>
    </div>
);

export const Book = () => <Placeholder title="Book Appointment" />;
export const Appointments = () => <Placeholder title="My Appointments" />;
export const Offers = () => <Placeholder title="Exclusive Offers" />;
export const Profile = () => <Placeholder title="My Profile" />;

export default Book;
