/* eslint-disable no-console -- needed for connecting to database */
// eslint-disable-next-line import/no-namespace -- disabled as specific usage of this dependency requires wildcard import
import * as dotenv from "dotenv";
import express from "express";
import { Client } from "pg";

import config from "./config.json";
import { AppController } from "./controller";

/**
 * Connects the postgres client, since the method to connect is async, we cannot create an async constructor, so therefore we must
 * move it outside the class into an async method
 *
 * @param client - The postgres client we are connecting
 */
const connectPostgresClient = async (client: Client): Promise<void> => {
    await client.connect();
};

/**
 * The main application class, which represents the application from start to finish
 */
class LanguageTrackerApplication {
    /**
     * The application
     */
    public app: express.Application;

    /**
     * The port the application is listening on
     */
    public port: number;

    /**
     * The client that is connected to the postgres database
     */
    public postgresClient: Client;

    /**
     * No-arg constructor that initializes all the fields of the application
     */
    public constructor() {
        dotenv.config();
        this.app = express();
        this.port = config.env === undefined ? 3001 : config.env;
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(express.json());
        this.postgresClient = new Client();
        connectPostgresClient(this.postgresClient)
            .then((_) => {
                console.info("Connection was a success!");
            })
            .catch((error: unknown) => {
                console.error(
                    `Failed to connect to postgres database ${
                        (error as Error).stack
                    }`,
                );
            });
    }

    /**
     * Handles all startup/setup methods and runs the server on the port specified in the constructor
     */
    public start(): void {
        this.addController();
        this.app.listen(this.port, () => {
            console.log(`Listening on port ${this.port}...`);
        });
    }

    /**
     * Adds the controller to the application
     */
    public addController = (): void => {
        this.app.use("/api", new AppController().getRouter());
    };
}

// eslint-disable-next-line jest/require-hook -- disabled
new LanguageTrackerApplication().start();