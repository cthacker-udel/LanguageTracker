/* eslint-disable no-shadow -- happens with enums */
/* eslint-disable no-unused-vars -- happens with enums */
import React, { type ChangeEvent } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";

import {
    ActivityLanguage,
    ActivityLevel,
    ActivityType,
    TimeMeasurement,
} from "../../../@types";
import type { DashboardOverlayKeys } from "../../../pages/Dashboard/Dashboard";
import styles from "./ProgrammingLanguageModal.module.css";

type ProgrammingLanguageModalProperties = {
    display: boolean;
    dashboardKey?: DashboardOverlayKeys;
    programmingLanguageImage: string;
    onClose?: (_key: DashboardOverlayKeys | undefined) => void;
    onSubmit?: (_key: DashboardOverlayKeys | undefined) => void;
    title: string;
};

type ActivityData = {
    description: string;
    language: ActivityLanguage;
    level: ActivityLevel;
    link: string;
    title: string;
    totalTime: number;
    totalTimeMeasurement: TimeMeasurement;
    type: ActivityType;
};

const initialValues: ActivityData = {
    description: "",
    language: ActivityLanguage.NONE,
    level: ActivityLevel.NONE,
    link: "",
    title: "",
    totalTime: 0,
    totalTimeMeasurement: TimeMeasurement.NONE,
    type: ActivityType.NONE,
};

const languages = [
    "Python",
    "Javascript",
    "Typescript",
    "C",
    "C++",
    "CSharp",
    "SQL",
    "Java",
    "HTML",
    "CSS",
];

const languageMapping: { [key: string]: ActivityLanguage } = {
    C: ActivityLanguage.C,
    "C++": ActivityLanguage.CPP,
    CSS: ActivityLanguage.CSS,
    CSharp: ActivityLanguage.CSHARP,
    HTML: ActivityLanguage.HTML,
    Java: ActivityLanguage.JAVA,
    Javascript: ActivityLanguage.JAVASCRIPT,
    Python: ActivityLanguage.PYTHON,
    SQL: ActivityLanguage.SQL,
    Typescript: ActivityLanguage.TYPESCRIPT,
};

/**
 * Common modal to apply to all languages/sections, without having to use a specific modal for each use case
 *
 * @param props - The properties of the Programming Language Modal component
 * @param props.display - Whether the modal should be displayed or not
 * @param props.dashboardKey - The key we are using to display the proper image, title, etc
 * @param props.programmingLanguageImage - The image we are displaying alongside the title
 * @param props.onClose - The callback function that fires when the modal is closed
 * @param props.onSubmit - The callback function that fires when the user clicks the submit button
 * @param props.title - The title of the modal
 * @returns The Programming Language Modal
 */
export const ProgrammingLanguageModal = ({
    display,
    dashboardKey,
    programmingLanguageImage,
    onClose,
    onSubmit,
    title,
}: ProgrammingLanguageModalProperties): JSX.Element => {
    const { register, setValue } = useForm<ActivityData>({
        criteriaMode: "all",
        defaultValues: initialValues,
        mode: "all",
        reValidateMode: "onBlur",
    });
    const [localTitle, setLocalTitle] = React.useState<string>(title);
    const [localImage, setLocalImage] = React.useState<string>(
        programmingLanguageImage,
    );

    const updateLocalFields = React.useCallback(
        (newTitle: string, newImage: string) => {
            setLocalTitle(newTitle);
            setLocalImage(newImage);
        },
        [],
    );

    const clearLocalFields = React.useCallback(() => {
        setLocalTitle("");
        setLocalImage("");
    }, []);

    React.useEffect(() => {
        updateLocalFields(title, programmingLanguageImage);
    }, [title, programmingLanguageImage, updateLocalFields]);

    return (
        <Modal
            onExit={(): void => {
                clearLocalFields();
            }}
            onHide={(): void => {
                if (onClose !== undefined) {
                    onClose(dashboardKey);
                }
            }}
            show={display}
        >
            <Modal.Header closeButton>
                <Modal.Title
                    className={styles.programming_language_modal_title}
                >
                    {localTitle}
                    <img
                        className={styles.programming_language_modal_image}
                        src={localImage}
                    />
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className={styles.programming_language_modal_body}>
                <Form className={styles.programming_language_modal_form}>
                    <Form.Group controlId="activityDescription">
                        <Form.Label>{"Description"}</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            {...register("description")}
                        />
                    </Form.Group>
                    <Form.Group controlId="activityLanguage">
                        <Form.Select
                            onChange={(
                                changedElement: ChangeEvent<HTMLSelectElement>,
                            ): void => {
                                const {
                                    target: { value },
                                } = changedElement;
                                setValue(
                                    "language",
                                    value === "LanguageSelect"
                                        ? ActivityLanguage.NONE
                                        : languageMapping[value],
                                );
                            }}
                        >
                            <option value="LanguageSelect">
                                {"Select a language"}
                            </option>
                            {languages.map((eachLanguage: string) => (
                                <option key={eachLanguage}>
                                    {eachLanguage}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer className={styles.programming_language_modal_footer}>
                <Button
                    onClick={(): void => {
                        if (onClose !== undefined) {
                            onClose(dashboardKey);
                        }
                    }}
                    variant="secondary"
                >
                    {"Cancel"}
                </Button>
                <Button
                    onClick={(): void => {
                        if (onSubmit !== undefined) {
                            onSubmit(dashboardKey);
                        }
                    }}
                    variant="primary"
                >
                    {"Submit"}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
