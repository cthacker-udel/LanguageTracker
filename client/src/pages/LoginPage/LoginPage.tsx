import React from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/esm/Button";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import {
    Layout,
    TextConstants,
    validateObject,
    ValueConstants,
} from "../../common";
import styles from "./LoginPage.module.css";

type FormData = {
    username: string;
    password: string;
};

/**
 * The login page, which is just a simple form for the user to login
 *
 * @returns The Login Page component, which houses the logic for logging a user in
 */
export const LoginPage = (): JSX.Element => {
    const navigate = useNavigate();

    const { formState, register } = useForm<FormData>({
        defaultValues: { password: "", username: "" },
        mode: "all",
        reValidateMode: "onBlur",
    });

    const { errors, dirtyFields } = formState;

    return (
        <Layout>
            <div className={styles.login_page_layout}>
                <div className={styles.login_page_title}>
                    {TextConstants.LOGIN_PAGE.TITLE}
                </div>
                <Form className={styles.login_form}>
                    <Form.Group controlId="formBasicUsername">
                        <Form.Label>
                            {TextConstants.LOGIN_PAGE.USERNAME_LABEL}
                        </Form.Label>
                        <Form.Control
                            isInvalid={
                                validateObject(errors.username) &&
                                validateObject(dirtyFields) &&
                                dirtyFields.username
                            }
                            isValid={
                                !errors.username &&
                                validateObject(dirtyFields) &&
                                dirtyFields.username
                            }
                            type="text"
                            {...register("username", {
                                maxLength: {
                                    message:
                                        TextConstants.INVALID.LOGIN_PAGE
                                            .USERNAME.maxLength,
                                    value: ValueConstants.LOGIN_PAGE.USERNAME
                                        .maxLength,
                                },
                                minLength: {
                                    message:
                                        TextConstants.INVALID.LOGIN_PAGE
                                            .USERNAME.minLength,
                                    value: ValueConstants.LOGIN_PAGE.USERNAME
                                        .minLength,
                                },
                                required: {
                                    message:
                                        TextConstants.INVALID.LOGIN_PAGE
                                            .USERNAME.required,
                                    value: ValueConstants.LOGIN_PAGE.USERNAME
                                        .required,
                                },
                            })}
                        />
                        {errors.username && dirtyFields.username && (
                            <Form.Control.Feedback type="invalid">
                                {errors.username.message}
                            </Form.Control.Feedback>
                        )}
                        {!errors.username && dirtyFields.username && (
                            <Form.Control.Feedback type="valid">
                                {TextConstants.VALID.LOGIN_PAGE.USERNAME}
                            </Form.Control.Feedback>
                        )}
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>
                            {TextConstants.LOGIN_PAGE.PASSWORD_LABEL}
                        </Form.Label>
                        <Form.Control
                            isInvalid={
                                validateObject(errors.password) &&
                                validateObject(dirtyFields) &&
                                dirtyFields.password
                            }
                            isValid={
                                !errors.password &&
                                validateObject(dirtyFields) &&
                                dirtyFields.password
                            }
                            type="password"
                            {...register("password", {
                                maxLength: {
                                    message:
                                        TextConstants.INVALID.LOGIN_PAGE
                                            .PASSWORD.maxLength,
                                    value: ValueConstants.LOGIN_PAGE.PASSWORD
                                        .maxLength,
                                },
                                minLength: {
                                    message:
                                        TextConstants.INVALID.LOGIN_PAGE
                                            .PASSWORD.minLength,
                                    value: ValueConstants.LOGIN_PAGE.PASSWORD
                                        .minLength,
                                },
                                required: {
                                    message:
                                        TextConstants.INVALID.LOGIN_PAGE
                                            .PASSWORD.required,
                                    value: ValueConstants.LOGIN_PAGE.PASSWORD
                                        .required,
                                },
                            })}
                        />
                        {errors.password && dirtyFields.password && (
                            <Form.Control.Feedback type="invalid">
                                {errors.password.message}
                            </Form.Control.Feedback>
                        )}
                        {!errors.password && dirtyFields.password && (
                            <Form.Control.Feedback type="valid">
                                {TextConstants.VALID.LOGIN_PAGE.PASSWORD}
                            </Form.Control.Feedback>
                        )}
                    </Form.Group>
                    <div className={styles.login_page_button_layout}>
                        <Button type="submit" variant="outline-primary">
                            {TextConstants.LOGIN_PAGE.LOGIN_BUTTON}
                        </Button>
                        <Button
                            onClick={(): void => {
                                navigate("/signup");
                            }}
                            type="button"
                            variant="outline-secondary"
                        >
                            {TextConstants.LOGIN_PAGE.SIGN_UP_BUTTON}
                        </Button>
                    </div>
                </Form>
            </div>
        </Layout>
    );
};
