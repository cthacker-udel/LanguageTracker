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
