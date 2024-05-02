import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./app-assets/css/core/menu/menu-types/vertical-menu-modern.css";
import "./assets/css/style.css";
import { AuthProvider } from "./context/authContext";
import { GoogleOAuthProvider } from "@react-oauth/google";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
    <GoogleOAuthProvider clientId="49494450157-past37o3hghtbn0vd7mn220ub5u975ef.apps.googleusercontent.com">
      <AuthProvider>
        <Router>
          <App />
          <ToastContainer position="top-right" autoClose={2000} />
        </Router>
      </AuthProvider>
    </GoogleOAuthProvider>
  // </React.StrictMode>
);

reportWebVitals();
