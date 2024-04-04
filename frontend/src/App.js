import React, { useEffect, useState } from "react";
import IndexRouter from "./routers/Index";
import { AuthProvider } from "./context/authContext";

/*const users = [
    {
        username: "john",
        age: 15,
        hobbies: ["Football", "Cricket"],
    },
    {
        username: "jane",
        age: 23,
        hobbies: ["Reading", "Writing"],
    },
];*/

const App = () => {
    const [subdomain, setSubDomain] = useState(null);

    /*useEffect(() => {
        const host = window.location.host; // gets the full domain of the app

        const arr = host.split(".").slice(0, host.includes("localhost") ? -1 : -2);
        if (arr.length > 0) setSubDomain(arr[0]);
    }, []);

    const requestedUser = users.find((user) => user.username === subdomain);
*/
    return (
        <AuthProvider>
            (
                <IndexRouter />
            )
        </AuthProvider>
    );
};

export default App;
