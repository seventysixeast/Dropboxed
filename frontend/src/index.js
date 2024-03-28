import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
// import "./app-assets/vendors/css/vendors.min.css";
// import "./app-assets/css/bootstrap.css";
// import "./app-assets/css/bootstrap-extended.css";
// import "./app-assets/css/colors.css";
// import "./app-assets/css/components.css";
import "./app-assets/css/core/menu/menu-types/vertical-menu-modern.css";
// import "./app-assets/css/core/colors/palette-gradient.css";
// import "./app-assets/fonts/simple-line-icons/style.min.css";
// import "./app-assets/css/pages/card-statistics.css";
// import "./app-assets/css/pages/vertical-timeline.css";
import "./assets/css/style.css";
import { AuthProvider } from "./context/authContext";
// import "./app-assets/vendors/js/vendors.min.js";
// import "./app-assets/vendors/js/charts/apexcharts/apexcharts.min.js";
// import "./app-assets/js/core/app-menu.js";
// import "./app-assets/js/core/app.js";
// import "./app-assets/js/scripts/cards/card-statistics.js";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <Router>
        <App />
      </Router>
    </AuthProvider>
  </React.StrictMode>
);

reportWebVitals();
