/* eslint-disable import/first -- disabled as per reason specified below */
// eslint-disable-next-line import/no-namespace -- disabled as specific usage of this dependency requires wildcard import
import * as dotenv from "dotenv";
// eslint-disable-next-line jest/require-hook -- disabled as per reason specified above
dotenv.config();
import express from "express";
import type { Client } from "pg";

import config from "./config.json";

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
        this.app = express();
        this.port = config.env === undefined ? 3001 : config.env;
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(express.json());
    }
}
