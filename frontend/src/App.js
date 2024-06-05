import React from "react";
import IndexRouter from "./routers/Index";
import { AuthProvider } from "./context/authContext";

const App = () => {
    

    return (
        <AuthProvider>
            <IndexRouter />
        </AuthProvider>
    );
};

export default App;
