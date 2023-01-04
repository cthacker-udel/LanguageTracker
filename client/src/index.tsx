/* eslint-disable @typescript-eslint/no-explicit-any -- disabled for swr cache implementation */
/* eslint-disable jest/require-hook -- disabled */
import "./index.css";

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SWRConfig } from "swr";

import { AppLayout, ErrorPage } from "./common";
import { Dashboard, HomePage, LoginPage, SignUp } from "./pages";
import { NotificationProvider } from "./provider";

const root = ReactDOM.createRoot(
    // eslint-disable-next-line @typescript-eslint/non-nullable-type-assertion-style -- disabled
    document.querySelector("#root") as HTMLElement,
);

root.render(
    <React.StrictMode>
        <SWRConfig value={{ provider: (): Map<any, any> => new Map() }}>
            <BrowserRouter>
                <NotificationProvider>
                    <Routes>
                        <Route element={<AppLayout />} path="/">
                            <Route element={<HomePage />} index />
                            <Route element={<LoginPage />} path="login" />
                            <Route element={<SignUp />} path="signup" />
                            <Route element={<Dashboard />} path="dashboard" />
                            <Route element={<ErrorPage />} path="*" />
                        </Route>
                    </Routes>
                </NotificationProvider>
            </BrowserRouter>
        </SWRConfig>
    </React.StrictMode>,
);
