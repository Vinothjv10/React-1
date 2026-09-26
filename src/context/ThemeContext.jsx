import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';

export const THEME_STORAGE_KEY = 'vj-theme';

const ThemeContext = createContext({ theme: 'dark', toggle: () => {} });

const readInitialTheme = () => {
    // public/index.html sets data-theme before React loads (no flash); trust it.
    if (typeof document !== 'undefined' && document.documentElement.dataset.theme === 'light') {
        return 'light';
    }
    return 'dark';
};

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(readInitialTheme);

    useEffect(() => {
        document.documentElement.dataset.theme = theme;
        try {
            localStorage.setItem(THEME_STORAGE_KEY, theme);
        } catch (_) {
            /* private mode — preference simply won't persist */
        }
    }, [theme]);

    const toggle = useCallback(() => {
        setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
    }, []);

    return <ThemeContext.Provider value={{ theme, toggle }}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => useContext(ThemeContext);
