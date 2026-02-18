import React from 'react';
import { motion } from 'framer-motion';

const AnimatedImageGrid = () => {
    const images = [
        { type: 'img', url: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=200&auto=format&fit=crop' },
        { type: 'brand', text: 'BBLUNT' },
        { type: 'img', url: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=200&auto=format&fit=crop' },
        { type: 'brand', text: 'NAMASTEY SALON' },
        { type: 'img', url: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=200&auto=format&fit=crop' },
        { type: 'brand', text: 'FEMINA FLAUNT' },
        { type: 'img', url: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=200&auto=format&fit=crop' },
        { type: 'brand', text: 'BEYOND THE FRINGE' },
        { type: 'img', url: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=200&auto=format&fit=crop' },
    ];

    return (
        <div className="grid-container">
            <motion.div
                className="masonry-grid"
                initial={{ translateY: 60 }}
                animate={{
                    translateY: -40,
                    scale: [1, 1.03, 1]
                }}
                transition={{
                    translateY: {
                        duration: 8,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut"
                    },
                    scale: {
                        duration: 6,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }
                }}
            >
                {images.map((item, index) => (
                    <motion.div
                        key={index}
                        className={`grid-item ${item.type === 'brand' ? 'brand-card' : ''}`}
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                    >
                        {item.type === 'img' ? (
                            <img src={item.url} alt={`Salon ${index}`} />
                        ) : (
                            <span>{item.text}</span>
                        )}
                    </motion.div>
                ))}
                {/* Repeat grid for seamless loop feel if scrolling, but here it's translateY loop */}
                {images.slice(0, 6).map((item, index) => (
                    <div key={`dup-${index}`} className={`grid-item ${item.type === 'brand' ? 'brand-card' : ''}`}>
                        {item.type === 'img' ? (
                            <img src={item.url} alt={`Salon ${index}`} />
                        ) : (
                            <span>{item.text}</span>
                        )}
                    </div>
                ))}
            </motion.div>
        </div>
    );
};

export default AnimatedImageGrid;
