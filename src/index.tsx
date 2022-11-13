import React from "react";
import ReactDOM from "react-dom/client";
import "./i18n";
import App from "./components/App";
import { AuthProvider } from "./context/AuthContext";
import { AppProvider } from "./context/AppContext/AppContext";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { HelmetProvider } from "react-helmet-async";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <HelmetProvider>
      <AuthProvider>
        <AppProvider>
          <App />
        </AppProvider>
      </AuthProvider>
    </HelmetProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
