import express, { type Router } from "express";
import type { Client } from "pg";

import { UserController } from "./modules/user/controller/user.controller";

/**
 * The main controller for the application houses all the route logic and DI-ish implementation
 */
export class AppController {
    // eslint-disable-next-line new-cap -- disabled, express naming should not be overridden
    private readonly router: express.Router = express.Router();

    private readonly userController: UserController;

    /**
     * Constructs the app controller which will be used for instantiating all the controller classes
     *
     * @param _client - The postgres client
     */
    public constructor(_client: Client) {
        this.userController = new UserController(_client);

        this.userController.addRoutes(this.router);
    }

    public getRouter = (): Router => this.router;
}
