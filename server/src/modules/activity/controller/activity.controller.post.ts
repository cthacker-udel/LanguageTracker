/* eslint-disable @typescript-eslint/brace-style -- disabled */
/* eslint-disable brace-style -- disabled */
/* eslint-disable @typescript-eslint/indent -- disabled */
import type { Activity, Route } from "@types";
import { type BaseControllerSpec, Logger } from "common";
import type { Request, Response } from "express";
import type { Client } from "pg";

import type { ActivityService } from "../service/activity.service";

/**
 *
 */
export class ActivityControllerPost
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

    public addActivity = async (
        request: Request,
        response: Response,
    ): Promise<void> => {
        const failureMessage = "Failed to add an activity";
        try {
            const {
                description,
                language,
                level,
                title,
                totalTime,
                totalTimeMeasurement,
                type,
            } = request.body as Activity;
            if (
                title === undefined ||
                description === undefined ||
                level === undefined ||
                totalTime === undefined ||
                totalTimeMeasurement === undefined ||
                type === undefined ||
                language === undefined
            ) {
                response.status(400);
                response.send({ failureMessage });
            } else {
                const addingActivityResult = await this.service.addActivity(
                    this.client,
                    request.body as Activity,
                );
                if (addingActivityResult) {
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

    public getRoutes = (): Route[] => [["addActivity", this.addActivity]];
}
