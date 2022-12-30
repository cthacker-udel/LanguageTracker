import type { User } from "@types";
import { BaseService } from "common";
import type { Client } from "pg";
import { EncryptionService } from "../encryption/encryptionService";

/**
 * The User Service, which controls all operations regarding users within the application
 */
export class UserService extends BaseService {
    /**
     * No-arg constructor of the user service, which constructs the service and assigns the table name of USER to the service
     */
    public constructor() {
        super("USER");
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

    public addUser = async (client: Client, user: User): Promise<boolean> => {
        const { firstName, lastName, dob, username, password } = user;

        const generatePassword = EncryptionService.encrypt(password);

        const values = [
            username,
            firstName === undefined ? "" : firstName,
            lastName === undefined ? "" : lastName,
            dob === undefined ? "" : new Date().toDateString(),
            password,
        ];

        const result = await client.query(
            `INSERT INTO USER (username, ${
                firstName === undefined ? "" : "first_name,"
            } ${lastName === undefined ? "" : "last_name,"} ${
                dob === undefined ? "" : "dob,"
            } password, password_salt, password_iterations, last_login, last_modified_by, last_modified_by_date, created_date) VALUES ()`,
        );
    };
}
