import type { RouteMapping } from "@types";
import { type BaseController, updateRoutes } from "common";
import type { Router } from "express";
import type { Client } from "pg";

import { ActivityService } from "../service/activity.service";
import { ActivityControllerGet } from "./activity.controller.get";
import { ActivityControllerPost } from "./activity.controller.post";

/**
 *
 */
export class ActivityController implements BaseController {
    public ROUTE_PREFIX = "/activity";

    public client: Client;

    public activityService: ActivityService;

    public activityGet: ActivityControllerGet;

    public activityPost: ActivityControllerPost;

    /**
     * One-arg constructor that takes in the postgresql client, and instantiates necessary services from that value
     *
     * @param _client - The psql client
     */
    public constructor(_client: Client) {
        this.client = _client;
        this.activityService = new ActivityService();
        this.activityGet = new ActivityControllerGet(
            this.client,
            this.activityService,
        );
        this.activityPost = new ActivityControllerPost(
            this.client,
            this.activityService,
        );
    }

    public getRouteMapping = (): RouteMapping => ({
        get: [],
        post: [],
    });

    public addRoutes = (_router: Router): void => {
        updateRoutes(_router, this.getRouteMapping(), this.ROUTE_PREFIX);
    };
}
