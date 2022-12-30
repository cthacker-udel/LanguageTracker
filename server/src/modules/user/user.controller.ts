import type { RouteMapping, User } from "@types";
import { type BaseController, updateRoutes } from "common";
import { Logger } from "common/log/Logger";
import type { Request, Response, Router } from "express";
import type { Client } from "pg";

import { UserService } from "./user.service";

/**
 *
 */
export class UserController implements BaseController {
    public ROUTE_PREFIX = "/user";

    public client: Client;

    public userService: UserService;

    /**
     * One-arg constructor for user controller to execute sql queries
     *
     * @param _client - The PSql client we are passing into the constructor in order to utilize sql operations
     */
    public constructor(_client: Client) {
        this.client = _client;
        this.userService = new UserService();
    }

    /**
     * GET request finding the user by field labeled after "By"
     *
     * @param request - The request the user is sending to the server
     * @param response - The response the user is receiving from the server
     */
    public findUserByUsername = async (
        request: Request,
        response: Response,
    ): Promise<void> => {
        try {
            const { username } = request.query;
            if (username === undefined) {
                response.status(400);
                response.send("Must supply username with request to find user");
            } else {
                const foundUser: Partial<User> | undefined =
                    await this.userService.findUserByUsername(
                        this.client,
                        username as string,
                    );
                if (foundUser === undefined) {
                    response.status(400);
                    response.send("Unable to find user via username");
                } else {
                    response.status(200);
                    response.send(foundUser);
                }
            }
        } catch (error: unknown) {
            Logger.error("Error while searching for username", error);
            response.status(400);
            response.send("Error searching for user via username");
        }
    };

    /**
     * GET request finding the user by field labeled after "By"
     *
     * @param request - The request the user is sending to the server
     * @param response - The response the user is receiving from the server
     */
    public findUserByFirstName = async (
        request: Request,
        response: Response,
    ): Promise<void> => {
        try {
            const { firstName } = request.query;
            if (firstName === undefined) {
                response.status(400);
                response.send(
                    "Must supply firstName with request to find user",
                );
            } else {
                const foundUser: Partial<User[]> | undefined =
                    await this.userService.findUsersByFirstName(
                        this.client,
                        firstName as string,
                    );
                if (foundUser === undefined) {
                    response.status(400);
                    response.send("Unable to find user via firstName");
                } else {
                    response.status(200);
                    response.send(foundUser);
                }
            }
        } catch (error: unknown) {
            Logger.error("Error while searching for firstName", error);
            response.status(400);
            response.send("Error searching for user via firstName");
        }
    };

    /**
     * GET request finding the user by field labeled after "By"
     *
     * @param request - The request the user is sending to the server
     * @param response - The response the user is receiving from the server
     */
    public findUserByLastName = async (
        request: Request,
        response: Response,
    ): Promise<void> => {
        try {
            const { lastName } = request.query;
            if (lastName === undefined) {
                response.status(400);
                response.send("Must supply lastName with request to find user");
            } else {
                const foundUser: Partial<User[]> | undefined =
                    await this.userService.findUsersByLastName(
                        this.client,
                        lastName as string,
                    );
                if (foundUser === undefined) {
                    response.status(400);
                    response.send("Unable to find user via lastName");
                } else {
                    response.status(200);
                    response.send(foundUser);
                }
            }
        } catch (error: unknown) {
            Logger.error("Error while searching for lastName", error);
            response.status(400);
            response.send("Error searching for user via lastName");
        }
    };

    /**
     * GET request finding the user by field labeled after "By"
     *
     * @param request - The request the user is sending to the server
     * @param response - The response the user is receiving from the server
     */
    public findUserByEmail = async (
        request: Request,
        response: Response,
    ): Promise<void> => {
        try {
            const { email } = request.query;
            if (email === undefined) {
                response.status(400);
                response.send("Must supply email with request to find user");
            } else {
                const foundUser: Partial<User> | undefined =
                    await this.userService.findUserByEmail(
                        this.client,
                        email as string,
                    );
                if (foundUser === undefined) {
                    response.status(400);
                    response.send("Unable to find user via email");
                } else {
                    response.status(200);
                    response.send(foundUser);
                }
            }
        } catch (error: unknown) {
            Logger.error("Error while searching for email", error);
            response.status(400);
            response.send("Error searching for user via email");
        }
    };

    /**
     * GET request finding the user by field labeled after "By"
     *
     * @param request - The request the user is sending to the server
     * @param response - The response the user is receiving from the server
     */
    public findUserByUserId = async (
        request: Request,
        response: Response,
    ): Promise<void> => {
        try {
            const { userId } = request.query;
            if (userId === undefined) {
                response.status(400);
                response.send("Must supply userId with request to find user");
            } else {
                const foundUser: Partial<User> | undefined =
                    await this.userService.findUserByUserId(
                        this.client,
                        Number.parseInt(userId as string, 10),
                    );
                if (foundUser === undefined) {
                    response.status(400);
                    response.send("Unable to find user via userId");
                } else {
                    response.status(200);
                    response.send(foundUser);
                }
            }
        } catch (error: unknown) {
            Logger.error("Error while searching for userId", error);
            response.status(400);
            response.send("Error searching for user via userId");
        }
    };

    public getRouteMapping = (): RouteMapping => ({
        get: [
            ["findByUsername", this.findUserByUsername],
            ["findByFirstName", this.findUserByFirstName],
            ["findByLastName", this.findUserByLastName],
            ["findByEmail", this.findUserByEmail],
            ["findByUserId", this.findUserByUserId],
        ],
    });

    public addRoutes = (_router: Router): void => {
        updateRoutes(_router, this.getRouteMapping(), this.ROUTE_PREFIX);
    };
}
