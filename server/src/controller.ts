import express, { type Router } from "express";

/**
 * The main controller for the application houses all the route logic and DI-ish implementation
 */
export class AppController {
    // eslint-disable-next-line new-cap -- disabled, express naming should not be overridden
    private readonly router: express.Router = express.Router();

    public getRouter = (): Router => this.router;
}
