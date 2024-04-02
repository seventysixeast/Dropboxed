const createClient = async (userData) => {
    try {
        const response = await fetch("http://localhost:6977/client/createClient", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        });
        if (!response.ok) {
            throw new Error("Failed to create a client!");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error(error.message);
    }
};


export { createClient, };
