import React, { useEffect, useState } from "react";
import dropboxicon from "../assets/images/logo_dropbox.svg";
import { authorizationToServer } from "../api/authApis";

const REACT_APP_DROPBOX_CLIENT = process.env.REACT_APP_DROPBOX_CLIENT;
const REACT_APP_DROPBOX_REDIRECT = process.env.REACT_APP_DROPBOX_REDIRECT;
const REACT_APP_DROPBOX_SECRET = process.env.REACT_APP_DROPBOX_SECRET;

const DropboxOAuth = () => {
    const [accessToken, setAccessToken] = useState("");
    const [error, setError] = useState("");
    const [running, setRunning] = useState(false);

    const handleGetRefreshToken = async () => {
        setRunning(true);
        try {
            const urlParams = new URLSearchParams(window.location.search);
            let state = urlParams.get("state");
            const userId = state.split("?userId=")[1];
            state = state.split("?userId=")[0];
            const code = urlParams.get("code");
            const response = await fetch("https://api.dropboxapi.com/oauth2/token", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: new URLSearchParams({
                    code: code,
                    grant_type: "authorization_code",
                    redirect_uri: REACT_APP_DROPBOX_REDIRECT,
                    client_id: REACT_APP_DROPBOX_CLIENT,
                    client_secret: REACT_APP_DROPBOX_SECRET,
                }),
            });

            const data = await response.json();

            setAccessToken(data.access_token);

            if (userId !== null && userId !== undefined) {
                const formData = new FormData();
                formData.append("dropbox_refresh", data.refresh_token);
                formData.append("dropbox_access", data.access_token);
                formData.append("id", userId);

                const res = await authorizationToServer(formData);
            }
            window.location.href = state;
        } catch (error) {
            setError("Failed to get refresh token");
            const urlParams = new URLSearchParams(window.location.search);
            let state = urlParams.get("state");
            const userId = state.split("?userId=")[1];
            state = state.split("?userId=")[0];
            window.location.href = state;
        }
        setRunning(false);
    };

    // const handleRefreshAccessToken = async () => {
    //     setRunning(true);
    //     try {
    //         const response = await fetch('https://api.dropboxapi.com/oauth2/token', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/x-www-form-urlencoded'
    //             },
    //             body: new URLSearchParams({
    //                 grant_type: 'refresh_token',
    //                 refresh_token: refreshToken,
    //                 redirect_uri: "http://localhost:3000/auth/dropbox",
    //                 client_id: "ywbxb6ciymziv7g",
    //                 client_secret: "4zheardnqvmrox1",
    //             })
    //         });

    //         const data = await response.json();
    //         setAccessToken(data.access_token);
    //     } catch (error) {
    //         setError('Failed to refresh access token');
    //     }
    // };

    useEffect(() => {
        if (running === false) {
            handleGetRefreshToken();
        }
    }, []);

    return (
        <div className="app-content content">
            <div className={`content-overlay`}></div>
            <div className="container">
                <div className="row">
                    <div className="col-md-6 offset-md-3 my-3">
                        <div className="card d-flex flex-column justify-content-center align-items-center">
                            <div className="card-body text-center">
                                <img src={dropboxicon} alt="dropboxicon" className="mb-1" />
                                <h2 className="mb-4">Authorization in progress...</h2>

                                {running && (
                                    <div
                                        className="spinner-grow"
                                        style={{ color: "#00b5b8" }}
                                        role="status"
                                    >
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DropboxOAuth;
