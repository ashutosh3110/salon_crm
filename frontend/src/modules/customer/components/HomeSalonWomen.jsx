import React from 'react';
import { motion } from 'framer-motion';
import ServiceCard from './ServiceCard';

const HomeSalonWomen = () => {
    const services = [
        {
            title: 'Waxing',
            image: '/New folder/WhatsApp Image 2026-02-18 at 3.27.25 PM.jpeg'
        },
        {
            title: 'Facial',
            image: '/New folder/WhatsApp Image 2026-02-18 at 2.46.04 PM.jpeg'
        },
        {
            title: 'Body Polishing',
            image: '/New folder/WhatsApp Image 2026-02-18 at 3.23.50 PM.jpeg'
        },
        {
            title: 'Clean-Up',
            image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=400&auto=format&fit=crop'
        }
    ];

    // Animation Variants
    const containerVariants = {
        hidden: {
            opacity: 0,
            y: 20
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut",
                staggerChildren: 0.12
            }
        }
    };

    const cardVariants = {
        hidden: {
            opacity: 0,
            scale: 0.95
        },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.4
            }
        }
    };

    return (
        <motion.section
            className="home-salon-section"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={containerVariants}
        >
            <div className="section-title" style={{ paddingLeft: 0, marginBottom: '16px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '700' }}>Home Salon For Women</h3>
            </div>
            <div className="home-salon-grid">
                {services.map((service, index) => (
                    <ServiceCard
                        key={index}
                        title={service.title}
                        image={service.image}
                        variants={cardVariants}
                    />
                ))}
            </div>
        </motion.section>
    );
};

export default HomeSalonWomen;
