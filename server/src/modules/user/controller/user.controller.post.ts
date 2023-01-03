import type { Route, User } from "@types";
import type { Request, Response } from "express";
import type { Client } from "pg";

import type { BaseControllerSpec } from "../../../../common";
import { Logger } from "../../../../common/log/Logger";
import type { UserService } from "../user.service";

/**
 *
 */
export class UserControllerPost implements BaseControllerSpec<UserService> {
    /**
     * The user service instance
     */
    public service: UserService;

    /**
     * The postgres client
     */
    public client: Client;

    /**
     * Instantiates a new instance of the UserControllerPost class
     *
     * @param _client - The client we are working with
     * @param service - The service we are working with
     */
    public constructor(_client: Client, service: UserService) {
        this.service = service;
        this.client = _client;
    }

    public addUser = async (
        request: Request,
        response: Response,
    ): Promise<void> => {
        const failureMessage = "Failed to add user";
        try {
            const { username, password } = request.body as Partial<User>;
            if (username === undefined || password === undefined) {
                response.status(400);
                response.send(
                    "Failed to add user, please supply required fields",
                );
            } else {
                const addResult = await this.service.addUser(
                    this.client,
                    request.body as User,
                );
                if (addResult) {
                    response.status(204);
                    response.send({});
                } else {
                    response.status(400);
                    response.send({ failureMessage });
                }
            }
        } catch (error: unknown) {
            Logger.error(failureMessage, error);
            response.status(400);
            response.send({ failureMessage });
        }
    };

    public login = async (
        request: Request,
        response: Response,
    ): Promise<void> => {
        const failureMessage = "Failed to login";
        try {
            const { username, password } = request.body as Partial<User>;
            if (username === undefined || password === undefined) {
                response.status(400);
                response.send({ failureMessage });
            } else {
                const loginResult = await this.service.login(
                    this.client,
                    username,
                    password,
                );
                if (loginResult) {
                    response.status(204);
                    response.send({});
                } else {
                    response.status(400);
                    response.send({ failureMessage });
                }
            }
        } catch (error: unknown) {
            Logger.error(failureMessage, error);
            response.status(400);
            response.send({ failureMessage });
        }
    };

    public getRoutes = (): Route[] => [
        ["addUser", this.addUser],
        ["login", this.login],
    ];
}
