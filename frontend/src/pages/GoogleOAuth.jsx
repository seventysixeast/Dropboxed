import React, { useEffect, useState } from 'react';
import { useGoogleLogin } from "@react-oauth/google";
import axios from 'axios';
import { toast } from 'react-toastify';

const GoogleOAuth = () => {
    const API_URL = process.env.REACT_APP_API_URL;
    const [loading, setLoading] = useState(true);

    const url = new URL(window.location.href);
    const userId = url.searchParams.get('userId');
    const redirectUrl = new URL(url.searchParams.get('url'));

    const subscribe = useGoogleLogin({
        onSuccess: (codeResponse) => {
            axios
                .post(
                    `${API_URL}/auth/google`,
                    {
                        code: codeResponse.code,
                        id: userId,
                    },
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                )
                .then((response) => {
                    console.log("Backend response:", response.data);
                    // redirect to redirectUrl
                    window.location.href = redirectUrl.href;
                })
                .catch((error) => {
                    console.error("Error:", error);
                    toast.error("Error: " + error);
                });
        },
        onError: () => {
            console.error("Google login failed");
            toast.error("Google login failed");
        },
        scope:
            "https://www.googleapis.com/auth/calendar.events.readonly https://www.googleapis.com/auth/calendar.events https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.app.created https://www.googleapis.com/auth/calendar.readonly",
        flow: "auth-code",
        include_granted_scopes: true,
    });

    useEffect(() => {
        const timer = setTimeout(() => {
            const subscribeButton = document.getElementById('subscribe');
            if (subscribeButton) {
                subscribeButton.click();
            }
        }, 2000);
    
        return () => clearTimeout(timer);
    }, []);
    


    return (
        <div className="app-content content">
            <div className={`content-overlay`}></div>
            <div className="container">
                <div className="row">
                    <div className="col-md-6 offset-md-3 my-3">
                        <div className="card d-flex flex-column justify-content-center align-items-center">
                            <div className="card-body text-center">
                                {/* <img src={dropboxicon} alt="dropboxicon" className="mb-1" /> */}
                                <h2 className="mb-4">Authorization in progress...</h2>
                                {loading && (
                                    <div
                                        class="spinner-grow"
                                        style={{ color: "#00b5b8" }}
                                        role="status"
                                    >
                                        <span class="sr-only">Loading...</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <button className='btn btn-primary d-none' id='subscribe' onClick={subscribe}>Subscribe</button>
        </div>
    );
};

export default GoogleOAuth;