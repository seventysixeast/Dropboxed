import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [isAuth, setIsAuth] = useState(false);

    const checkAuthStatus = () => {
        const authStatus = localStorage.getItem('isAuth');
        if (authStatus) {
            setIsAuth(JSON.parse(authStatus));
        }
    };

    useEffect(() => {
        checkAuthStatus();
    }, []);

    const setAuthStatus = (status) => {
        setIsAuth(status);
        localStorage.setItem('isAuth', JSON.stringify(status));
    };

    return (
        <AuthContext.Provider value={{ isAuth, setAuthStatus }}>
            {children}
        </AuthContext.Provider>
    );
};
