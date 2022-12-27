import React from "react";

import { TextConstants } from "../../constants";
import styles from "./HomePage.module.css";

/**
 *
 * @returns The Home Page of the application
 */
export const HomePage = (): JSX.Element => (
    <div className={styles.home_page_layout}>
        <div className={styles.home_page_title}>
            {TextConstants.HOME_PAGE.TITLE}
        </div>
        <div className={styles.home_page_content}>
            {TextConstants.HOME_PAGE.DESCRIPTION}
        </div>
    </div>
);
