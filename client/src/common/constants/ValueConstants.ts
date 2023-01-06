/**
 * Constant values, mainly used for validation
 */
const ValueConstants = {
    LOGIN_PAGE: {
        PASSWORD: {
            maxLength: 35,
            minLength: 7,
            required: true,
        },
        USERNAME: {
            maxLength: 35,
            minLength: 7,
            required: true,
        },
    },
    PROGRAMMINGLANGUAGEMODAL: {
        DESCRIPTION: {
            maxLength: 150,
            minLength: 25,
            required: true,
        },
        LANGUAGE: {
            required: true,
        },
        LEVEL: {
            required: true,
        },
        LINK: {
            maxLength: 200,
            minLength: 1,
        },
        TITLE: {
            maxLength: 75,
            minLength: 1,
            required: true,
        },
        TOTALTIME: {
            max: 99_999,
            min: 1,
            required: true,
        },
        TOTALTIMEMEASUREMENT: {
            required: true,
        },
        TYPE: {
            required: true,
        },
    },
    SIGN_UP_PAGE: {
        EMAIL: {
            maxLength: 100,
            minLength: 1,
        },
        FIRST_NAME: {
            maxLength: 35,
            minLength: 1,
        },
        LAST_NAME: {
            maxLength: 35,
            minLength: 1,
        },
        PASSWORD: {
            maxLength: 35,
            minLength: 7,
            required: true,
        },
        USERNAME: {
            maxLength: 35,
            minLength: 7,
            required: true,
        },
    },
};

export { ValueConstants };
