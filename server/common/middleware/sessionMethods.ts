import type { Request, Response } from "express";

import type { User } from "../../@types";
import { EncryptionService } from "../../src/modules/encryption/encryptionService";

const CONSTANTS = {
    COOKIE_KEY: "ltcookie",
    THREE_HOURS_IN_MS: 10_800_000,
};

/**
 * Generates the stringified cookie
 *
 * @param cookie - The cookie to attach to the payload
 * @param expiration - The expiration which
 * @returns
 */
const generateStringifiedCookie = (cookie: string, expiration: Date): string =>
    `${
        CONSTANTS.COOKIE_KEY
    }=${cookie}; Expires=${expiration.toString()}; Path=/`;

/**
 * Generates cookie expiration time
 *
 * @returns The new cookie expiration
 */
const generateCookieExpiration = (): Date =>
    new Date(Date.now() + CONSTANTS.THREE_HOURS_IN_MS);

/**
 * Generates cookie expiration date in the past according to RFC-6265 https://www.rfc-editor.org/rfc/rfc6265.html
 *
 * @returns The new cookie expiration date, which is in the past so therefore cookie is then deleted
 */
const generateCookieDeletionExpiration = (): Date =>
    new Date(Date.now() - CONSTANTS.THREE_HOURS_IN_MS);

/**
 * Validates the session of the request passed into the function
 *
 * @param request - The request to validate
 * @returns Whether or not the session is valid
 */
const sessionValidator = (request: Request): boolean => {
    console.log("validating", request);
    return false;
};

/**
 * Checks if the session exists in the request
 *
 * @param request - The request to check if the session exists on the request
 * @returns Whether or not the session exists
 */
const doesSessionExist = (request: Request): boolean =>
    // eslint-disable-next-line no-restricted-syntax -- disabled
    ("cookie" in request.headers &&
        request.headers?.cookie?.includes(`${CONSTANTS.COOKIE_KEY}=`)) ??
    false;

/**
 * Adds a session to the response if no session already exists
 *
 * @param request - The request to add the session to
 * @param response - The response to add the session to
 * @returns Whether the session was successfully added to the response
 */
const addSession = (request: Request, response: Response): boolean => {
    console.log(request.url);
    if (doesSessionExist(request) || !request.url.includes("login")) {
        return false;
    }
    const { username, password } = request.body as Partial<User>;
    if (username === undefined || password === undefined) {
        return false;
    }

    const encryptedSession = EncryptionService.sessionEncryption(
        username,
        password,
    );

    response.setHeader(
        "Set-Cookie",
        generateStringifiedCookie(encryptedSession, generateCookieExpiration()),
    );

    return true;
};

/**
 * Rejects the session of the request passed into the function
 *
 * @param response - The response to populate the remove cookie methods
 * @returns Whether or not the rejection was successful
 */
const rejectSession = (request: Request, response: Response): boolean => {
    if (doesSessionExist(request)) {
        response.setHeader(
            "Set-Cookie",
            `${
                CONSTANTS.COOKIE_KEY
            }=deleted; Expires=${generateCookieDeletionExpiration().toString()}`,
        );
    }
    return false;
};

export {
    addSession,
    CONSTANTS,
    doesSessionExist,
    rejectSession,
    sessionValidator,
};
