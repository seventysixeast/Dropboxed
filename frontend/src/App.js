import React, { useEffect } from "react";
import { toast } from 'react-toastify';
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
                const { success, accessToken, user, message } = await verifyToken(decryptedToken);
                console.log("success", success)
                if (success) {
                    // Save user data and access token in localStorage
                    localStorage.setItem('accessToken', accessToken);
                    localStorage.setItem('isAuth', true);
                    localStorage.setItem('user', JSON.stringify(user));
                    
                    // Show success toast
                    // toast.success('Token verification successful');
                    
                    // Redirect to dashboard
                    window.location.href = '/dashboard';
                } else {
                    // Show error toast
                    toast.error(`Token verification failed: ${message}`);
                    // Redirect to login page
                    window.location.href = '/login';
                }
            } catch (error) {
                console.error("Token verification failed:", error.message);
                // Show error toast
                toast.error('Token verification failed');
                // Redirect to login page
                window.location.href = '/login';
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
