import type { RouteMapping } from "@types";
import { type BaseController, updateRoutes } from "common";
import type { Router } from "express";
import type { Client } from "pg";

import { UserService } from "../user.service";
import { UserControllerGet } from "./user.controller.get";

/**
 *
 */
export class UserController implements BaseController {
    public ROUTE_PREFIX = "/user";

    public client: Client;

    public userService: UserService;

    public userGet: UserControllerGet;

    /**
     * One-arg constructor for user controller to execute sql queries
     *
     * @param _client - The PSql client we are passing into the constructor in order to utilize sql operations
     */
    public constructor(_client: Client) {
        this.client = _client;
        this.userService = new UserService();
        this.userGet = new UserControllerGet(this.client, this.userService);
    }

    public getRouteMapping = (): RouteMapping => ({
        get: this.userGet.getRoutes(),
    });

    public addRoutes = (_router: Router): void => {
        updateRoutes(_router, this.getRouteMapping(), this.ROUTE_PREFIX);
    };
}
