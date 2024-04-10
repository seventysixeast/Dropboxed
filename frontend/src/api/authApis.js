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


export { signup, login };
