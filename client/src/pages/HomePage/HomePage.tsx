import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import { TextConstants } from "../../common/constants";
import styles from "./HomePage.module.css";

/**
 *
 * @returns The Home Page of the application
 */
export const HomePage = (): JSX.Element => {
    const navigator = useNavigate();

    return (
        <div className={styles.home_page_layout}>
            <div className={styles.home_page_title}>
                {TextConstants.HOME_PAGE.TITLE}
            </div>
            <div className={styles.home_page_content}>
                {TextConstants.HOME_PAGE.DESCRIPTION}
            </div>
            <div className={styles.home_page_button_layout}>
                <Button
                    className={styles.home_page_login_button}
                    onClick={(): void => {
                        navigator("/login");
                    }}
                    type="button"
                    variant="primary"
                >
                    {TextConstants.HOME_PAGE.LOGIN_BUTTON}
                </Button>
                <Button
                    className={styles.home_page_sign_up_button}
                    onClick={(): void => {
                        navigator("/signup");
                    }}
                    type="button"
                    variant="secondary"
                >
                    {TextConstants.HOME_PAGE.SIGN_UP_BUTTON}
                </Button>
            </div>
        </div>
    );
};
