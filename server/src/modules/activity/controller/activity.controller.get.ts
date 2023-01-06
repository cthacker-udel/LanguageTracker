/* eslint-disable @typescript-eslint/brace-style -- disabled */
/* eslint-disable brace-style -- disabled */
/* eslint-disable @typescript-eslint/indent -- disabled */

import type { Route } from "@types";
import { BaseControllerSpec, Logger } from "common";
import { Request, Response } from "express";
import type { Client } from "pg";

import type { ActivityService } from "../service/activity.service";

/**
 *
 */
export class ActivityControllerGet
    implements BaseControllerSpec<ActivityService>
{
    public service: ActivityService;

    public client: Client;

    /**
     * Instantiates an instance of the ActivityControllerPost class
     *
     * @param _client - The postgresql client
     * @param service - The instantiated service
     */
    public constructor(_client: Client, service: ActivityService) {
        this.service = service;
        this.client = _client;
    }

    public findActivity = async (
        request: Request,
        response: Response,
    ): Promise<void> => {
        const failureMessage = "Failed searching for activity";
        try {
            const { id } = request.query;
        } catch (error: unknown) {
            Logger.error("Error while searching for activity", error);
            response.status(400);
            response.send({ failureMessage });
        }
    };

    public getRoutes = (): Route[] => [["findActivity", this.findActivity]];
}
