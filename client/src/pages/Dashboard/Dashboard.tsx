import React from "react";
import { useLocation } from "react-router-dom";

/**
 * Dashboard component
 *
 * @returns Dashboard component, which houses all the logic for starting your account in the language tracker
 */
export const Dashboard = (): JSX.Element => {
    const { state } = useLocation();

    return <div>{state}</div>;
};
