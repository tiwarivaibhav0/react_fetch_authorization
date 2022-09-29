import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Login, { Home } from "./login";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "@shopify/polaris/build/esm/styles.css";
import { AppProvider } from "@shopify/polaris";
import enTranslations from "@shopify/polaris/locales/en.json";
import { Dashboard } from "./dashboard";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    {/* <React.StrictMode> */}
      {" "}
      <AppProvider i18n={enTranslations}>
        <Routes>
          <Route element={<Login />} path="/" />
          <Route element={<Dashboard />} path="/dashboard" />
        </Routes>
      </AppProvider>
      
    {/* </React.StrictMode> */}
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
