import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the SessionContext
const SessionContext = createContext();

// Custom hook to use the SessionContext
export const useSession = () => useContext(SessionContext);

export const SessionProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    

    useEffect(() => {
        console.log("Fetching user data from session storage...");
        const storedUser = sessionStorage.getItem('user');
        console.log("Stored user data:", storedUser);
        if (storedUser) {
            setUser(JSON.parse(storedUser));
            console.log("User data loaded from session storage:", JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const signIn = (userData) => {
        setUser(userData);
        sessionStorage.setItem('user', JSON.stringify(userData));
        console.log("User signed in. User data stored in session storage:", userData);
    };

    const signOut = () => {
        setUser(null);
        sessionStorage.clear(); // Clear sessionStorage
        console.log("User signed out. User data removed from session storage.");
    };
    

    const updateUserField = (field, value) => {
        setUser((prevUser) => {
            const updatedUser = { ...prevUser, [field === 'newUsername' ? 'name' : field]: value };
            sessionStorage.setItem('user', JSON.stringify(updatedUser));
            console.log("User data updated. Updated user data stored in session storage:", updatedUser);
            return updatedUser;
        });
    };

    return (
        <SessionContext.Provider value={{ user, setUser: signIn, signIn, signOut, updateUserField, loading }}>
            {children}
        </SessionContext.Provider>
    );
};
