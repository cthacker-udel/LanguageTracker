/* eslint-disable @typescript-eslint/indent -- disabled */

import React from "react";

import type { NotificationContextInterface } from "../../@types";

export const NotificationContext = React.createContext<
    NotificationContextInterface | undefined
>(undefined);
