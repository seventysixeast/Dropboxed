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
    <GoogleOAuthProvider clientId="565520681360-ec8fv1hed52fpasmfcrhaooe0akjb8o7.apps.googleusercontent.com">
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
