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
};

export { ValueConstants };
