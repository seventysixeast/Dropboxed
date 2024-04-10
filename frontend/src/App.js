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
                //console.log("token?>>",token)
                const decryptedToken = decryptToken(token);
                //console.log("decryptedToken",decryptedToken)
                const { accessToken, user } = await verifyToken(decryptedToken);
                //console.log("accessToken",accessToken,user)
                // Set token and user data in local storage
                localStorage.setItem('accessToken', accessToken);
                localStorage.setItem('isAuth', true);
                localStorage.setItem('user', JSON.stringify(user));
                // Set cookies with domain attribute
                document.cookie = `accessToken=${accessToken}; domain=.localhost; path=/`;
                document.cookie = `isAuth=true; domain=.localhost; path=/`;

                // Remove token from URL after extracting
                const url = new URL(window.location.href);
                url.searchParams.delete('token');
                window.history.replaceState({}, document.title, url);
            } catch (error) {
                console.error("Token verification failed:", error.message);
                // Handle token verification failure
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
