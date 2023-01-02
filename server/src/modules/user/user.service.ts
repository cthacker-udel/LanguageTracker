/* eslint-disable max-statements -- disabled */
/* eslint-disable camelcase -- disabled */
import type { Client } from "pg";

import type { EncryptionData, User } from "../../../@types";
import { BaseService, convertDateToSqlCompliant } from "../../../common";
import { EncryptionService } from "../encryption/encryptionService";

/**
 * The User Service, which controls all operations regarding users within the application
 */
export class UserService extends BaseService {
    /**
     * No-arg constructor of the user service, which constructs the service and assigns the table name of USER to the service
     */
    public constructor() {
        super("USER_DATA");
    }

    /**
     * Finds a user via the username passed in
     *
     * @param client - The postgres client we are utilizing to find the user
     * @param username - The username we are searching for
     * @returns Whether or not the user exists
     */
    public findUserByUsername = async (
        client: Client,
        username: string,
    ): Promise<Partial<User> | undefined> => {
        const result = await client.query(
            `SELECT first_name, last_name, dob, user_id, email from ${this.TABLE_NAME} WHERE username='${username}'`,
        );
        return result.rowCount > 0 ? result.rows[0] : undefined;
    };

    /**
     * Searches for a user within the database given the first name
     *
     * @param client - The postgres client
     * @param firstName - The first name we are searching for
     * @returns The partial user that is found from searching in the database
     */
    public findUsersByFirstName = async (
        client: Client,
        firstName: string,
    ): Promise<Partial<User[]> | undefined> => {
        const result = await client.query(
            `SELECT first_name, last_name, dob, user_id, email from ${this.TABLE_NAME} WHERE first_name='${firstName}'`,
        );
        return result.rowCount > 0 ? result.rows : undefined;
    };

    /**
     * Searches for a user within the database given the last name
     *
     * @param client - The postgres client
     * @param lastName - The last name we are searching for
     * @returns The partial user that is found searching in the database
     */
    public findUsersByLastName = async (
        client: Client,
        lastName: string,
    ): Promise<Partial<User[]> | undefined> => {
        const result = await client.query(
            `SELECT first_name, last_name, dob, user_id, email from ${this.TABLE_NAME} WHERE last_name='${lastName}'`,
        );
        return result.rowCount > 0 ? result.rows : undefined;
    };

    /**
     * Searches for a user within the database given the user id
     *
     * @param client - The postgres client
     * @param userId - The user id we are searching for
     * @returns The partial user that is found searching in the database
     */
    public findUserByUserId = async (
        client: Client,
        userId: number,
    ): Promise<Partial<User> | undefined> => {
        const result = await client.query(
            `SELECT first_name, last_name, dob, user_id, email from ${this.TABLE_NAME} WHERE user_id=${userId}`,
        );
        return result.rowCount > 0 ? result.rows[0] : undefined;
    };

    /**
     * Searches for a user within the database given the email
     *
     * @param client - The postgres client
     * @param email - The email we are searching for
     * @returns The partial user that is found searching in the database
     */
    public findUserByEmail = async (
        client: Client,
        email: string,
    ): Promise<Partial<User> | undefined> => {
        const result = await client.query(
            `SELECT first_name, last_name, dob, user_id, email from ${this.TABLE_NAME} WHERE email='${email}'`,
        );
        return result.rowCount > 0 ? result.rows[0] : undefined;
    };

    public doesUserExist = async (
        client: Client,
        username: string,
    ): Promise<boolean> => {
        const result = await this.findUserByUsername(client, username);
        return result !== undefined;
    };

    public addUser = async (client: Client, user: User): Promise<boolean> => {
        const isExisting = await this.doesUserExist(client, user.username);

        if (isExisting) {
            return false;
        }

        const { firstName, lastName, dob, email, username, password } = user;

        const { hash_result: hashResult, ..._rest } =
            EncryptionService.encrypt(password);

        let values = [`'${username}'`];

        if (firstName !== undefined) {
            values.push(`'${firstName}'`);
        }

        if (lastName !== undefined) {
            values.push(`'${lastName}'`);
        }

        if (dob !== undefined) {
            values.push(convertDateToSqlCompliant(dob));
        }

        if (email !== undefined) {
            values.push(`'${email}'`);
        }

        values = [
            ...values,
            `'${hashResult}'`,
            convertDateToSqlCompliant(new Date()),
            convertDateToSqlCompliant(new Date()),
            convertDateToSqlCompliant(new Date()),
        ];

        const query = `INSERT INTO ${this.TABLE_NAME} (username, ${
            firstName === undefined ? "" : "first_name,"
        } ${lastName === undefined ? "" : "last_name,"} ${
            dob === undefined ? "" : "dob,"
        } ${
            email === undefined ? "" : "email,"
        } password, last_login, last_modified_by_date, created_date) VALUES (${values.join(
            ", ",
        )});`;

        const result = await client.query(query);

        if (result.rowCount > 0) {
            const foundRow = await this.findUserByUsername(client, username);
            if (foundRow !== undefined) {
                const { user_id } = foundRow;
                const encryptionQuery = `INSERT INTO "ENCRYPTION_DATA" (user_id, caesar_rotations, pbkdf2_iterations, pbkdf2_salt, sha_iterations, sha_salt) VALUES (${user_id}, ${Object.values(
                    _rest,
                )
                    .map((eachValue) => `'${eachValue}'`)
                    .join(", ")});`;
                const encryptionResult = await client.query(encryptionQuery);
                if (encryptionResult.rowCount > 0) {
                    const findEncryptionRowQuery =
                        await this.findUserEncryptionData(client, user_id);
                    const updateEncryptionIdQuery = `UPDATE ${this.TABLE_NAME} SET encryption_id=${findEncryptionRowQuery?.encryption_id} WHERE user_id=${user_id}`;
                    const updateEncryptionIdQueryResult = await client.query(
                        updateEncryptionIdQuery,
                    );
                    return updateEncryptionIdQueryResult.rowCount > 0;
                }
                const deleteUserQuery = `DELETE FROM ${this.TABLE_NAME} WHERE user_id=${user_id}`;
                const deleteResult = await client.query(deleteUserQuery);
                return !(deleteResult.rowCount === 1);
            }
            return false;
        }
        return false;
    };

    /**
     * Finds the encryption data associated with the user
     *
     * @param client - The client we are using to execute the query to find the encryption data
     * @param user_id - The user id we are using to locate the encryption data
     */
    // eslint-disable-next-line class-methods-use-this -- disabled
    private readonly findUserEncryptionData = async (
        client: Client,
        user_id: number | undefined,
    ): Promise<Partial<EncryptionData | undefined>> => {
        if (user_id !== undefined) {
            const query = `SELECT encryption_id, user_id, pbkdf2_salt, pbkdf2_iterations, sha_salt, caesar_rotations FROM "ENCRYPTION_DATA" WHERE user_id=${user_id}`;
            const result = await client.query(query);
            return result.rows[0] as Partial<EncryptionData>;
        }
        return undefined;
    };
}
