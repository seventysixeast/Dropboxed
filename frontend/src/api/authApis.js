import API from "./baseApi";

const REACT_APP_DROPBOX_CLIENT = process.env.REACT_APP_DROPBOX_CLIENT;
const REACT_APP_DROPBOX_SECRET = process.env.REACT_APP_DROPBOX_SECRET;

const signup = async (userData) => {
    try {
        const response = await API.post("/auth/signup", userData);
        if (response.status !== 200) {
            throw new Error("Signup failed");
        }
        const data = response.data;
        return data;
    } catch (error) {
        throw new Error(error.message);
    }
};

const clientSignup = async (userData) => {
    try {
        const response = await API.post("/auth/client-signup", userData);
        if (response.status !== 200) {
            throw new Error("Signup failed");
        }
        const data = response.data;
        return data;
    } catch (error) {
        throw new Error(error.message);
    }
};

const login = async (userData) => {
    try {
        const response = await API.post("/auth/login", userData);
        if (response.status !== 200) {
            throw new Error("Login failed");
        }
        const data = response.data;

        return data;
    } catch (error) {
        throw new Error(error.message);
    }
};

const verifyToken = async (token) => {
    try {
        const response = await API.post("/auth/verify-token", { token });
        if (response.status !== 200) {
            throw new Error("Token verification failed");
        }
        const data = response.data;
        const { accessToken, user } = data;
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("isAuth", true);
        localStorage.setItem("user", JSON.stringify(user));
        return data;
    } catch (error) {
        throw new Error(error.message);
    }
};

const forgotPassword = async (data) => {
    try {
        const response = await API.post("/auth/forgot-password", data);
        if (response.status !== 200) {
            throw new Error("Failed to forgot");
        }
        return response.data;
    } catch (error) {
        return error.response.data.error;
    }
};

const resetPassword = async (data) => {
    try {
        const response = await API.post("/auth/reset-password", data);
        if (response.status !== 200) {
            throw new Error("Failed to reset");
        }
        return response.data;
    } catch (error) {
        return error.response.data.error;
    }
};

const authorizationToServer = async (data) => {
    try {
        const response = await API.post("/auth/dropbox-auth", data);
        if (response.status !== 200) {
            throw new Error("Failed to forgot");
        }
        return response.data;
    } catch (error) {
        return error.response.data.error;
    }
};

const getRefreshToken = async (data) => {
    try {
        let token = data;
        const response = await fetch("https://api.dropboxapi.com/oauth2/token", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
                grant_type: "refresh_token",
                refresh_token: token,
                client_id: REACT_APP_DROPBOX_CLIENT,
                client_secret: REACT_APP_DROPBOX_SECRET,
            }),
        });
        const resp = await response.json();
        console.log(resp);
        return resp;
    } catch (error) {
        throw new Error(error.message);
    }
};

export {
    signup,
    login,
    verifyToken,
    clientSignup,
    forgotPassword,
    resetPassword,
    authorizationToServer,
    getRefreshToken,
};
