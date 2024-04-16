import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [authData, setAuthData] = useState(() => {
        // Initialize authentication data based on localStorage
        const storedIsAuth = localStorage.getItem('isAuth') === 'true';
        const storedUser = JSON.parse(localStorage.getItem('user'));
        const storedToken = localStorage.getItem('accessToken');
        return { isAuth: storedIsAuth, user: storedUser, token: storedToken };
    });

    useEffect(() => {
        // Update authentication data state when localStorage changes
        const storedIsAuth = localStorage.getItem('isAuth') === 'true';
        const storedUser = JSON.parse(localStorage.getItem('user'));
        const storedToken = localStorage.getItem('accessToken');
        setAuthData({ isAuth: storedIsAuth, user: storedUser, token: storedToken });
    }, []);

    const setAuthStatus = ({ user, token }) => {
        const newIsAuth = !!user && !!token;
        localStorage.setItem('isAuth', newIsAuth);
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('accessToken', token);

        // Set cookies with domain attribute
        document.cookie = `isAuth=${newIsAuth}; domain=.localhost; path=/`;
        document.cookie = `user=${JSON.stringify(user)}; domain=.localhost; path=/`;
        document.cookie = `accessToken=${token}; domain=.localhost; path=/`;

        setAuthData({ isAuth: newIsAuth, user, token });
    };

    const logout = () => {
        localStorage.removeItem('isAuth');
        localStorage.removeItem('user');
        localStorage.removeItem('accessToken');

        // Remove cookies
        document.cookie = 'isAuth=; domain=.localhost; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        document.cookie = 'user=; domain=.localhost; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        document.cookie = 'accessToken=; domain=.localhost; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

        setAuthData({ isAuth: false, user: null, token: null });
    };

    return (
        <AuthContext.Provider value={{ authData, setAuthStatus, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
