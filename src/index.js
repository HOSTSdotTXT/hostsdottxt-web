import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./index.css";
import SignUp from "./routes/SignUp.js";
import Login from "./routes/Login";
import reportWebVitals from "./reportWebVitals";
import { AuthProvider } from "./hooks/useAuth";
import { FeaturesProvider } from "./hooks/useFeatures";
import Records from "./routes/Records";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <AuthProvider>
      <FeaturesProvider>
        <BrowserRouter>
          <Routes>
            {/* <Route path="/" element={<Home />} /> */}
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="zones/:zoneName" element={<Records />} />
          </Routes>
        </BrowserRouter>
      </FeaturesProvider>
    </AuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
