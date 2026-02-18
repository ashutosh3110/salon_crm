import React from 'react';
import { motion } from 'framer-motion';

const ServiceCard = ({ title, image, variants }) => {
    return (
        <motion.div
            className="service-card-women"
            variants={variants}
            whileTap={{
                scale: 0.98,
                boxShadow: "0px 2px 8px rgba(0,0,0,0.1)"
            }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
            <div className="service-card-title">{title}</div>
            <div className="service-card-img-container">
                <motion.img
                    src={image}
                    alt={title}
                    className="service-card-img"
                    animate={{
                        translateY: [0, -6, 0]
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
            </div>
        </motion.div>
    );
};

export default ServiceCard;
