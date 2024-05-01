import API from "./baseApi";

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
        return data;
    } catch (error) {
        throw new Error(error.message);
    }
};

const forgotPassword = async (data) => {
    try {
        const response = await API.post('/auth/forgot-password', data);
        if (response.status !== 200) {
            throw new Error('Failed to forgot');
        }
        return response.data;
    } catch (error) {
        return error.response.data.error;
    }
};

const resetPassword = async (data) => {
    try {
        const response = await API.post('/auth/reset-password', data);
        if (response.status !== 200) {
            throw new Error('Failed to reset');
        }
        return response.data;
    } catch (error) {
        return error.response.data.error;
    }
};

export { signup, login, verifyToken, clientSignup, forgotPassword, resetPassword };
