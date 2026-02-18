import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    // Initial brand color
    const [brandColor, setBrandColor] = useState(() => {
        return localStorage.getItem('salon_brand_color') || '#B85C5C';
    });

    const [sidebarBg, setSidebarBg] = useState(() => {
        return localStorage.getItem('salon_sidebar_bg') || '#121212';
    });

    // Dark/Light Mode
    const [themeMode, setThemeMode] = useState(() => {
        return localStorage.getItem('salon_theme_mode') || 'dark';
    });

    // Function to update theme globally
    const updateTheme = (newColors) => {
        if (newColors.brandColor) {
            setBrandColor(newColors.brandColor);
            localStorage.setItem('salon_brand_color', newColors.brandColor);
        }
        if (newColors.sidebarBg) {
            setSidebarBg(newColors.sidebarBg);
            localStorage.setItem('salon_sidebar_bg', newColors.sidebarBg);
        }
    };

    const toggleThemeMode = () => {
        const newMode = themeMode === 'dark' ? 'light' : 'dark';
        setThemeMode(newMode);
        localStorage.setItem('salon_theme_mode', newMode);
    };

    // Apply colors to CSS variables
    useEffect(() => {
        const root = document.documentElement;

        // Update Theme Mode attribute
        root.setAttribute('data-theme', themeMode);

        // Update Primary Brand Colors
        root.style.setProperty('--color-primary', brandColor);
        root.style.setProperty('--admin-accent', brandColor);
        root.style.setProperty('--color-cta', brandColor);

        // Update Admin Specific Backgrounds if and ONLY if in dark mode
        // For light mode, we'll let CSS handle the defaults
        if (themeMode === 'dark') {
            root.style.setProperty('--admin-bg-sidebar', sidebarBg);
        } else {
            root.style.removeProperty('--admin-bg-sidebar');
        }

        // Generate a soft hover color based on brand color
        const hoverColor = `${brandColor}1a`;
        root.style.setProperty('--admin-bg-hover', hoverColor);

    }, [brandColor, sidebarBg, themeMode]);

    return (
        <ThemeContext.Provider value={{ brandColor, sidebarBg, themeMode, updateTheme, toggleThemeMode }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
