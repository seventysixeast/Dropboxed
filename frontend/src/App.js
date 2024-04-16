import React, { useEffect } from "react";
import IndexRouter from "./routers/Index";
import { AuthProvider } from "./context/authContext";
import { decryptToken } from "./helpers/tokenUtils";
import { verifyToken } from "./api/authApis";

const App = () => {
    useEffect(() => {
        const getTokenFromUrl = () => {
            const urlParams = new URLSearchParams(window.location.search);
            return urlParams.get('token');
        };

        const handleTokenVerification = async (token) => {
            try {
                const decryptedToken = decryptToken(token);
                const { accessToken, user } = await verifyToken(decryptedToken);
                localStorage.setItem('accessToken', accessToken);
                localStorage.setItem('isAuth', true);
                localStorage.setItem('user', JSON.stringify(user));
                document.cookie = `accessToken=${accessToken}; domain=.localhost; path=/`;
                document.cookie = `isAuth=true; domain=.localhost; path=/`;

                const url = new URL(window.location.href);
                url.searchParams.delete('token');
                window.history.replaceState({}, document.title, url);
            } catch (error) {
                console.error("Token verification failed:", error.message);
            }
        };

        const token = getTokenFromUrl();

        if (token) {
            handleTokenVerification(token);
        }

    }, []);

    return (
        <AuthProvider>
            <IndexRouter />
        </AuthProvider>
    );
};

export default App;
