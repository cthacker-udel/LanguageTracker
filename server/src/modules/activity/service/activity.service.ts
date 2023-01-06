/* eslint-disable @typescript-eslint/no-explicit-any -- disabled */

import type { Activity } from "@types";
import { BaseService } from "common";
import { InsertPSqlQueryConstructor } from "common/helpers/psqlQueryConstructor/InsertPsqlQueryConstructor";
import type { Client } from "pg";

/**
 *
 */
export class ActivityService extends BaseService {
    /**
     *
     */
    public constructor() {
        super("ACTIVITY");
    }

    /**
     * Added an activity to the database
     *
     * @param client - postgresql client
     * @param activity - The activity we are adding
     * @returns Whether the activity was added successfully or not
     */
    public addActivity = async (
        client: Client,
        activity: Activity,
    ): Promise<boolean> => {
        const insertQueryConstructor = new InsertPSqlQueryConstructor(
            this.TABLE_NAME,
        );
        for (const eachKey of Object.keys(activity)) {
            insertQueryConstructor.addField(eachKey);
            insertQueryConstructor.addFieldValue(
                eachKey,
                (activity as { [key: string]: any })[eachKey],
            );
        }
        const insertResult = await client.query(
            insertQueryConstructor.toString(),
        );
        return insertResult.rowCount > 0;
    };
}
