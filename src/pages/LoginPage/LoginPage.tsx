import React from "react";
import { useNavigate } from "react-router-dom";

import { Layout, TextConstants } from "../../common";
import styles from "./LoginPage.module.css";

/**
 * The login page, which is just a simple form for the user to login
 *
 * @returns The Login Page component, which houses the logic for logging a user in
 */
export const LoginPage = (): JSX.Element => {
    const navigate = useNavigate();

    return (
        <Layout>
            <div className={styles.login_page_layout}>
                <div className={styles.login_page_title}>
                    {TextConstants.LOGIN_PAGE.TITLE}
                </div>
                <form className={styles.login_form}>
                    <div className={styles.login_page_form_layout}>
                        <label
                            className={styles.login_page_form_layout_label}
                            htmlFor="username_form"
                        >
                            {TextConstants.LOGIN_PAGE.USERNAME_LABEL}
                        </label>
                        <input
                            className={styles.login_page_form_layout_input}
                            id="username_form"
                            tabIndex={1}
                            type="text"
                        />
                    </div>
                    <div className={styles.login_page_form_layout}>
                        <label
                            className={styles.login_page_form_layout_label}
                            htmlFor="password_form"
                        >
                            {TextConstants.LOGIN_PAGE.PASSWORD_LABEL}
                        </label>
                        <input
                            className={styles.login_page_form_layout_input}
                            id="password_form"
                            tabIndex={2}
                            type="text"
                        />
                    </div>
                    <div className={styles.login_page_button_layout}>
                        <button
                            className={`btn_secondary ${styles.login_page_login_button}`}
                            type="submit"
                        >
                            {TextConstants.LOGIN_PAGE.LOGIN_BUTTON}
                        </button>
                        <button
                            className="btn_secondary"
                            onClick={(): void => {
                                navigate("/signup");
                            }}
                            type="button"
                        >
                            {TextConstants.LOGIN_PAGE.SIGN_UP_BUTTON}
                        </button>
                    </div>
                </form>
            </div>
        </Layout>
    );
};
