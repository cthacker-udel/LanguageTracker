import React, { type ReactNode } from "react";

import type { Notification, NotificationContextInterface } from "../../@types";
import { NotificationContext } from "../../context/notification/NotificationContext";

type NotificationProviderProperties = {
    children: ReactNode;
};

/**
 * The provider for the context value, adding a clean and concise way to
 * implement the context.
 *
 * @param props - The props of the component
 * @param props.children - The react component this component wraps around
 */
export const NotificationProvider = ({
    children,
}: NotificationProviderProperties): JSX.Element => {
    const [notifications, setNotifications] = React.useState<Notification[]>(
        [],
    );

    const functionalProperties: Partial<NotificationContextInterface> =
        React.useMemo(
            () => ({
                addNotification: (_notification: Notification): void => {
                    setNotifications((oldNotifications: Notification[]) => [
                        ...oldNotifications,
                        _notification,
                    ]);
                },
                removeNotification: (_index: number): void => {
                    setNotifications((oldNotifications: Notification[]) =>
                        oldNotifications.filter(
                            (_: Notification, ind: number) => ind !== _index,
                        ),
                    );
                },
            }),
            [],
        );

    const providerValue: NotificationContextInterface = React.useMemo(
        () => ({
            ...(functionalProperties as NotificationContextInterface),
            notifications,
        }),
        [functionalProperties, notifications],
    );

    return (
        <NotificationContext.Provider value={providerValue}>
            {children}
        </NotificationContext.Provider>
    );
};
