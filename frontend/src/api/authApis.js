import API from "./baseApi";

const signup = async (userData) => {
    try {
        const response = await API.post("/auth/signup", userData);
        if (response.status !== 201) {
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
        if (response.status !== 201) {
            throw new Error("Signup failed");
        }
        const data = response.data;
        return data;
    } catch (error) {
        throw new Error(error.message);
    }
};

const login = async (userData) => {
    console.log("userData",userData);
    try {
        const response = await API.post("/auth/login", userData);
        console.log("response",response);
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

export { signup, login, verifyToken, clientSignup };
