/* eslint-disable jest/require-hook -- disabled */
import "./index.css";

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { HomePage } from "./pages/HomePage";

const root = ReactDOM.createRoot(
    // eslint-disable-next-line @typescript-eslint/non-nullable-type-assertion-style -- disabled
    document.querySelector("#root") as HTMLElement,
);

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="*">
                    <Route element={<HomePage />} index />
                    <Route element={<span>{"Login page"}</span>} path="login" />
                    <Route
                        element={<span>{"SignUp Page"}</span>}
                        path="signup"
                    />
                </Route>
            </Routes>
        </BrowserRouter>
    </React.StrictMode>,
);
