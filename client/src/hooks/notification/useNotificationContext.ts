import React from "react";

import type { NotificationContextInterface } from "../../@types";
import { NotificationContext } from "../../context/notification/NotificationContext";

/**
 * Uses the NotificationContext value and returns it, otherwise throws an error if used incorrectly
 */
export const useNotificationContext = (): NotificationContextInterface => {
    const notificationContextValue: NotificationContextInterface | undefined =
        React.useContext(NotificationContext);
    if (notificationContextValue === undefined) {
        throw new Error(
            "Consumers of the context must be children of the provider",
        );
    }
    return notificationContextValue;
};
