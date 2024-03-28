const signup = async (userData) => {
    console.log(userData);
    try {
        const response = await fetch("/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        });
        if (!response.ok) {
            throw new Error("Signup failed");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error(error.message);
    }
};

export default signup;
