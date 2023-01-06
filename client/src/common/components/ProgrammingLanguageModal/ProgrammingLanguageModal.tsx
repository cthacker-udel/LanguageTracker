/* eslint-disable @typescript-eslint/indent -- disabled */
/* eslint-disable no-shadow -- happens with enums */
/* eslint-disable no-unused-vars -- happens with enums */

import React, { type ChangeEvent } from "react";
import { Button, Form, InputGroup, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";

import {
    ActivityLanguage,
    ActivityLevel,
    ActivityType,
    TimeMeasurement,
} from "../../../@types";
import type { DashboardOverlayKeys } from "../../../pages/Dashboard/Dashboard";
import { TextConstants, ValueConstants } from "../../constants";
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
    "None",
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
    None: ActivityLanguage.NONE,
    Python: ActivityLanguage.PYTHON,
    SQL: ActivityLanguage.SQL,
    Typescript: ActivityLanguage.TYPESCRIPT,
};

const levels = [
    "None",
    "Very Easy",
    "Easy",
    "Easy-Medium",
    "Medium",
    "Medium-Hard",
    "Hard",
    "Very Hard",
    "Insane",
];

const levelMapping: { [key: string]: ActivityLevel } = {
    Easy: ActivityLevel.EASY,
    "Easy-Medium": ActivityLevel.EASYMEDIUM,
    Hard: ActivityLevel.HARD,
    Insane: ActivityLevel.INSANE,
    Medium: ActivityLevel.MEDIUM,
    "Medium-Hard": ActivityLevel.MEDIUMHARD,
    None: ActivityLevel.NONE,
    "Very Easy": ActivityLevel.VERYEASY,
    "Very Hard": ActivityLevel.VERYHARD,
};

const timeMeasurements = ["Seconds", "Minutes", "Hours"];

const timeMeasurementMapping: { [key: string]: TimeMeasurement } = {
    Hours: TimeMeasurement.HOURS,
    Minutes: TimeMeasurement.MINUTES,
    Seconds: TimeMeasurement.SECONDS,
};

const activityTypes = ["Codewars", "Edabit", "Leetcode", "Languages"];

const activityTypeMapping: { [key: string]: ActivityType } = {
    Codewars: ActivityType.CODEWARS,
    Edabit: ActivityType.EDABIT,
    Languages: ActivityType.LANGUAGES,
    Leetcode: ActivityType.LEETCODE,
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
    const { formState, register, setError, setValue, watch } =
        useForm<ActivityData>({
            criteriaMode: "all",
            defaultValues: initialValues,
            mode: "all",
            reValidateMode: "onBlur",
        });

    const { ref: languageReference, ...languageRegisterRest } = register(
        "language",
        {
            required: {
                message:
                    TextConstants.INVALID.PROGRAMMINGLANGUAGEMODAL.LANGUAGE
                        .required,
                value: ValueConstants.PROGRAMMINGLANGUAGEMODAL.LANGUAGE
                    .required,
            },
            valueAsNumber: true,
        },
    );

    const { ref: difficultyLevelReference, ...difficultyLevelRegisterRest } =
        register("level", {
            required: {
                message:
                    TextConstants.INVALID.PROGRAMMINGLANGUAGEMODAL.LEVEL
                        .required,
                value: ValueConstants.PROGRAMMINGLANGUAGEMODAL.LEVEL.required,
            },
            valueAsNumber: true,
        });

    const [languageValue, difficultyLevelValue] = watch(["language", "level"]);

    const { dirtyFields, errors, touchedFields } = formState;

    console.log(touchedFields, difficultyLevelValue);

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
            <Modal.Body>
                <Form className={styles.programming_language_modal_form}>
                    <Form.Group controlId="activityDescription">
                        <Form.Label>{"Description"}</Form.Label>
                        <Form.Control
                            as="textarea"
                            isInvalid={
                                errors.description !== undefined &&
                                dirtyFields.description
                            }
                            isValid={
                                !errors.description && dirtyFields.description
                            }
                            placeholder="Enter activity description"
                            rows={3}
                            {...register("description", {
                                maxLength: {
                                    message:
                                        TextConstants.INVALID
                                            .PROGRAMMINGLANGUAGEMODAL
                                            .DESCRIPTION.maxLength,
                                    value: ValueConstants
                                        .PROGRAMMINGLANGUAGEMODAL.DESCRIPTION
                                        .maxLength,
                                },
                                minLength: {
                                    message:
                                        TextConstants.INVALID
                                            .PROGRAMMINGLANGUAGEMODAL
                                            .DESCRIPTION.minLength,
                                    value: ValueConstants
                                        .PROGRAMMINGLANGUAGEMODAL.DESCRIPTION
                                        .minLength,
                                },
                                required: {
                                    message:
                                        TextConstants.INVALID
                                            .PROGRAMMINGLANGUAGEMODAL
                                            .DESCRIPTION.required,
                                    value: ValueConstants
                                        .PROGRAMMINGLANGUAGEMODAL.DESCRIPTION
                                        .required,
                                },
                            })}
                        />
                        {errors.description !== undefined && (
                            <Form.Control.Feedback type="invalid">
                                {errors.description.message}
                            </Form.Control.Feedback>
                        )}
                        {dirtyFields.description &&
                            errors.description === undefined && (
                                <Form.Control.Feedback type="valid">
                                    {
                                        TextConstants.VALID
                                            .PROGRAMMINGLANGUAGEMODAL
                                            .DESCRIPTION
                                    }
                                </Form.Control.Feedback>
                            )}
                    </Form.Group>
                    <Form.Group controlId="activityLink">
                        <Form.Label>{"Link"}</Form.Label>
                        <InputGroup>
                            <InputGroup.Text>
                                <i className="fa-solid fa-link" />
                            </InputGroup.Text>
                            <Form.Control
                                isInvalid={errors.link && dirtyFields.link}
                                isValid={!errors.link && dirtyFields.link}
                                placeholder="Enter activity link"
                                type="text"
                                {...register("link", {
                                    maxLength: {
                                        message:
                                            TextConstants.INVALID
                                                .PROGRAMMINGLANGUAGEMODAL.LINK
                                                .maxLength,
                                        value: ValueConstants
                                            .PROGRAMMINGLANGUAGEMODAL.LINK
                                            .maxLength,
                                    },
                                    minLength: {
                                        message:
                                            TextConstants.INVALID
                                                .PROGRAMMINGLANGUAGEMODAL.LINK
                                                .minLength,
                                        value: ValueConstants
                                            .PROGRAMMINGLANGUAGEMODAL.LINK
                                            .minLength,
                                    },
                                })}
                            />
                            {errors.link !== undefined && (
                                <Form.Control.Feedback type="invalid">
                                    {errors.link.message}
                                </Form.Control.Feedback>
                            )}
                            {errors.link === undefined && (
                                <Form.Control.Feedback type="valid">
                                    {
                                        TextConstants.VALID
                                            .PROGRAMMINGLANGUAGEMODAL.LINK
                                    }
                                </Form.Control.Feedback>
                            )}
                        </InputGroup>
                    </Form.Group>
                    <Form.Group controlId="activityTitle">
                        <Form.Label>{"Title"}</Form.Label>
                        <InputGroup>
                            <InputGroup.Text>
                                <i className="fa-solid fa-heading" />
                            </InputGroup.Text>
                            <Form.Control
                                placeholder="Enter activity title"
                                type="text"
                                {...register("title", {
                                    maxLength: {
                                        message:
                                            TextConstants.INVALID
                                                .PROGRAMMINGLANGUAGEMODAL.TITLE
                                                .maxLength,
                                        value: ValueConstants
                                            .PROGRAMMINGLANGUAGEMODAL.TITLE
                                            .maxLength,
                                    },
                                    minLength: {
                                        message:
                                            TextConstants.INVALID
                                                .PROGRAMMINGLANGUAGEMODAL.TITLE
                                                .minLength,
                                        value: ValueConstants
                                            .PROGRAMMINGLANGUAGEMODAL.TITLE
                                            .minLength,
                                    },
                                    required: {
                                        message:
                                            TextConstants.INVALID
                                                .PROGRAMMINGLANGUAGEMODAL.TITLE
                                                .required,
                                        value: ValueConstants
                                            .PROGRAMMINGLANGUAGEMODAL.TITLE
                                            .required,
                                    },
                                })}
                            />
                        </InputGroup>
                    </Form.Group>
                    <Form.Group controlId="activityTotalTime">
                        <Form.Label>{"Total Time"}</Form.Label>
                        <InputGroup>
                            <InputGroup.Text>
                                <i className="fa-solid fa-clock" />
                            </InputGroup.Text>
                            <Form.Control
                                type="number"
                                {...register("totalTime", {
                                    max: {
                                        message:
                                            TextConstants.INVALID
                                                .PROGRAMMINGLANGUAGEMODAL
                                                .TOTALTIME.max,
                                        value: ValueConstants
                                            .PROGRAMMINGLANGUAGEMODAL.TOTALTIME
                                            .max,
                                    },
                                    min: {
                                        message:
                                            TextConstants.INVALID
                                                .PROGRAMMINGLANGUAGEMODAL
                                                .TOTALTIME.min,
                                        value: ValueConstants
                                            .PROGRAMMINGLANGUAGEMODAL.TOTALTIME
                                            .min,
                                    },
                                    required: {
                                        message:
                                            TextConstants.INVALID
                                                .PROGRAMMINGLANGUAGEMODAL
                                                .TOTALTIME.required,
                                        value: ValueConstants
                                            .PROGRAMMINGLANGUAGEMODAL.TOTALTIME
                                            .required,
                                    },
                                })}
                            />
                            {errors.totalTime && dirtyFields.totalTime && (
                                <Form.Control.Feedback type="invalid">
                                    {errors.totalTime.message}
                                </Form.Control.Feedback>
                            )}
                            {!errors.totalTime && dirtyFields.totalTime && (
                                <Form.Control.Feedback type="valid">
                                    {
                                        TextConstants.VALID
                                            .PROGRAMMINGLANGUAGEMODAL.TOTALTIME
                                    }
                                </Form.Control.Feedback>
                            )}
                        </InputGroup>
                    </Form.Group>
                    <Form.Group controlId="activityLanguage">
                        <Form.Select
                            isInvalid={
                                touchedFields.language &&
                                languageValue === ActivityLanguage.NONE
                            }
                            isValid={!errors.language && dirtyFields.language}
                            {...languageRegisterRest}
                            onClick={(): void => {
                                if (languageValue === ActivityLanguage.NONE) {
                                    setError("language", {
                                        message:
                                            TextConstants.INVALID
                                                .PROGRAMMINGLANGUAGEMODAL
                                                .LANGUAGE.required,
                                        type: "required",
                                    });
                                }
                            }}
                            ref={languageReference}
                        >
                            {languages.map(
                                (eachLanguage: string): JSX.Element => (
                                    <option
                                        key={eachLanguage}
                                        value={languageMapping[eachLanguage]}
                                    >
                                        {eachLanguage === "None"
                                            ? "Select a Language"
                                            : eachLanguage}
                                    </option>
                                ),
                            )}
                        </Form.Select>
                        {touchedFields.language &&
                            languageValue === ActivityLanguage.NONE && (
                                <Form.Control.Feedback type="invalid">
                                    {
                                        TextConstants.INVALID
                                            .PROGRAMMINGLANGUAGEMODAL.LANGUAGE
                                            .required
                                    }
                                </Form.Control.Feedback>
                            )}
                        {touchedFields.language &&
                            languageValue !== ActivityLanguage.NONE && (
                                <Form.Control.Feedback type="valid">
                                    {
                                        TextConstants.VALID
                                            .PROGRAMMINGLANGUAGEMODAL.LANGUAGE
                                    }
                                </Form.Control.Feedback>
                            )}
                    </Form.Group>
                    <Form.Group controlId="activityLevel">
                        <Form.Select
                            isInvalid={
                                touchedFields.level &&
                                difficultyLevelValue === ActivityLevel.NONE
                            }
                            isValid={
                                touchedFields.level &&
                                difficultyLevelValue !== ActivityLevel.NONE
                            }
                            ref={difficultyLevelReference}
                            {...difficultyLevelRegisterRest}
                            onClick={(): void => {
                                if (
                                    difficultyLevelValue === ActivityLevel.NONE
                                ) {
                                    setError("level", {
                                        message:
                                            TextConstants.INVALID
                                                .PROGRAMMINGLANGUAGEMODAL.LEVEL
                                                .required,
                                        type: "required",
                                    });
                                }
                            }}
                        >
                            {levels.map(
                                (eachLevel: string): JSX.Element => (
                                    <option
                                        key={eachLevel}
                                        value={levelMapping[eachLevel]}
                                    >
                                        {eachLevel === "None"
                                            ? "Select a Difficulty Level"
                                            : eachLevel}
                                    </option>
                                ),
                            )}
                        </Form.Select>
                        {touchedFields.level &&
                            difficultyLevelValue === ActivityLevel.NONE && (
                                <Form.Control.Feedback type="invalid">
                                    {
                                        TextConstants.INVALID
                                            .PROGRAMMINGLANGUAGEMODAL.LEVEL
                                            .required
                                    }
                                </Form.Control.Feedback>
                            )}
                        {touchedFields.level &&
                            difficultyLevelValue !== ActivityLevel.NONE && (
                                <Form.Control.Feedback type="valid">
                                    {
                                        TextConstants.VALID
                                            .PROGRAMMINGLANGUAGEMODAL.LEVEL
                                    }
                                </Form.Control.Feedback>
                            )}
                    </Form.Group>
                    <Form.Group controlId="activityTimeMeasurement">
                        <Form.Select
                            onChange={(
                                changedElement: ChangeEvent<HTMLSelectElement>,
                            ): void => {
                                const {
                                    target: { value },
                                } = changedElement;
                                setValue(
                                    "totalTimeMeasurement",
                                    value === "SelectTimeMeasurement"
                                        ? TimeMeasurement.NONE
                                        : timeMeasurementMapping[value],
                                );
                            }}
                        >
                            <option value="SelectTimeMeasurement">
                                {"Select Time Measurement"}
                            </option>
                            {timeMeasurements.map(
                                (eachTimeMeasurement: string): JSX.Element => (
                                    <option key={eachTimeMeasurement}>
                                        {eachTimeMeasurement}
                                    </option>
                                ),
                            )}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group controlId="activityType">
                        <Form.Select
                            onChange={(
                                changedElement: ChangeEvent<HTMLSelectElement>,
                            ): void => {
                                const {
                                    target: { value },
                                } = changedElement;
                                setValue(
                                    "type",
                                    value === "TypeSelect"
                                        ? ActivityType.NONE
                                        : activityTypeMapping[value],
                                );
                            }}
                        >
                            <option value="TypeSelect">
                                {"Select Activity Type"}
                            </option>
                            {activityTypes.map(
                                (eachType: string): JSX.Element => (
                                    <option key={eachType}>{eachType}</option>
                                ),
                            )}
                        </Form.Select>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
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
