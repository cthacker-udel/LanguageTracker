import React from "react";
import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";

import { Layout, TextConstants, ValueConstants } from "../../common";
import styles from "./SignUpPage.module.css";

type FormData = {
    firstName: string;
    lastName: string;
    dob: string;
    username: string;
    email: string;
};

/**
 * The Sign-Up form, consists of data the user can populate in their profile
 */
export const SignUp = (): JSX.Element => {
    const { formState, register } = useForm<FormData>({
        defaultValues: {
            dob: new Date().toDateString(),
            email: "",
            firstName: "",
            lastName: "",
            username: "",
        },
        mode: "all",
        reValidateMode: "onBlur",
    });

    const { errors, dirtyFields } = formState;

    return (
        <Layout childrenOverride={styles.sign_up_page_layout}>
            <div className={styles.sign_up_page_title}>
                {TextConstants.SIGN_UP_PAGE.TITLE}
            </div>
            <Form className={styles.sign_up_page_form}>
                <Form.Group controlId="sign_up_first_name">
                    <Form.Label>
                        {TextConstants.SIGN_UP_PAGE.FIRST_NAME_LABEL}
                    </Form.Label>
                    <Form.Control
                        isInvalid={
                            errors.firstName &&
                            dirtyFields.firstName !== undefined
                        }
                        isValid={
                            !errors.firstName &&
                            dirtyFields.firstName !== undefined
                        }
                        {...register("firstName", {
                            maxLength: {
                                message:
                                    TextConstants.INVALID.SIGN_UP_PAGE.LAST_NAME
                                        .maxLength,
                                value: ValueConstants.SIGN_UP_PAGE.LAST_NAME
                                    .maxLength,
                            },
                            minLength: {
                                message:
                                    TextConstants.INVALID.SIGN_UP_PAGE
                                        .FIRST_NAME.minLength,
                                value: ValueConstants.SIGN_UP_PAGE.FIRST_NAME
                                    .minLength,
                            },
                        })}
                    />
                    {errors.firstName && dirtyFields.firstName && (
                        <Form.Control.Feedback type="invalid">
                            {errors.firstName.message}
                        </Form.Control.Feedback>
                    )}
                    {!errors.firstName && dirtyFields.firstName && (
                        <Form.Control.Feedback type="valid">
                            {TextConstants.VALID.SIGN_UP_PAGE.FIRST_NAME}
                        </Form.Control.Feedback>
                    )}
                </Form.Group>
                <Form.Group controlId="sign_up_last_name">
                    <Form.Label>
                        {TextConstants.SIGN_UP_PAGE.LAST_NAME_LABEL}
                    </Form.Label>
                    <Form.Control
                        isInvalid={errors.lastName && dirtyFields.lastName}
                        {...register("lastName", {
                            maxLength: {
                                message:
                                    TextConstants.INVALID.SIGN_UP_PAGE.LAST_NAME
                                        .maxLength,
                                value: ValueConstants.SIGN_UP_PAGE.LAST_NAME
                                    .maxLength,
                            },
                            minLength: {
                                message:
                                    TextConstants.INVALID.SIGN_UP_PAGE.LAST_NAME
                                        .minLength,
                                value: ValueConstants.SIGN_UP_PAGE.LAST_NAME
                                    .minLength,
                            },
                        })}
                    />
                    {errors.lastName && dirtyFields.lastName && (
                        <Form.Control.Feedback type="invalid">
                            {errors.lastName.message}
                        </Form.Control.Feedback>
                    )}
                    {!errors.lastName && dirtyFields.lastName && (
                        <Form.Control.Feedback type="valid">
                            {TextConstants.VALID.SIGN_UP_PAGE.LAST_NAME}
                        </Form.Control.Feedback>
                    )}
                </Form.Group>
                <Form.Group controlId="sign_up_page_email">
                    <Form.Label>
                        {TextConstants.SIGN_UP_PAGE.EMAIL_LABEL}
                    </Form.Label>
                    <Form.Control
                        isInvalid={errors.email && dirtyFields.email}
                        isValid={!errors.email && dirtyFields.email}
                        {...register("email", {
                            maxLength: {
                                message:
                                    TextConstants.INVALID.SIGN_UP_PAGE.EMAIL
                                        .maxLength,
                                value: ValueConstants.SIGN_UP_PAGE.EMAIL
                                    .maxLength,
                            },
                            minLength: {
                                message:
                                    TextConstants.INVALID.SIGN_UP_PAGE.EMAIL
                                        .minLength,
                                value: ValueConstants.SIGN_UP_PAGE.EMAIL
                                    .minLength,
                            },
                        })}
                    />
                    {errors.email && dirtyFields.email && (
                        <Form.Control.Feedback type="invalid">
                            {errors.email.message}
                        </Form.Control.Feedback>
                    )}
                    {!errors.email && dirtyFields.email && (
                        <Form.Control.Feedback type="valid">
                            {TextConstants.VALID.SIGN_UP_PAGE.EMAIL}
                        </Form.Control.Feedback>
                    )}
                </Form.Group>
                <Form.Group controlId="username">
                    <Form.Label>
                        {TextConstants.SIGN_UP_PAGE.USERNAME_LABEL}
                    </Form.Label>
                    <Form.Control
                        isInvalid={errors.username && dirtyFields.username}
                        isValid={!errors.username && dirtyFields.username}
                        {...register("username", {
                            maxLength: {
                                message:
                                    TextConstants.INVALID.SIGN_UP_PAGE.USERNAME
                                        .maxLength,
                                value: ValueConstants.SIGN_UP_PAGE.USERNAME
                                    .maxLength,
                            },
                            minLength: {
                                message:
                                    TextConstants.INVALID.SIGN_UP_PAGE.USERNAME
                                        .minLength,
                                value: ValueConstants.SIGN_UP_PAGE.USERNAME
                                    .minLength,
                            },
                            required: {
                                message:
                                    TextConstants.INVALID.SIGN_UP_PAGE.USERNAME
                                        .required,
                                value: ValueConstants.SIGN_UP_PAGE.USERNAME
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
                            {TextConstants.VALID.SIGN_UP_PAGE.USERNAME}
                        </Form.Control.Feedback>
                    )}
                </Form.Group>
            </Form>
        </Layout>
    );
};
