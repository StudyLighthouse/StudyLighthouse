import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the SessionContext
const SessionContext = createContext();

// Custom hook to use the SessionContext
export const useSession = () => useContext(SessionContext);

export const SessionProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Load user data from session storage on app initialization
        const storedUser = sessionStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const signIn = (userData) => {
        setUser(userData);
        sessionStorage.setItem('user', JSON.stringify(userData));
    };

    const signOut = () => {
        setUser(null);
        sessionStorage.removeItem('user');
    };

    return (
        <SessionContext.Provider value={{ user, setUser: signIn, loading, signOut }}>
            {children}
        </SessionContext.Provider>
    );
};
