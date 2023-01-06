/* eslint-disable no-confusing-arrow -- disabled */
/* eslint-disable arrow-body-style -- disabled */
/* eslint-disable @typescript-eslint/no-explicit-any -- disabled */

/**
 *
 */
export class InsertPSqlQueryConstructor {
    protected tableName = "";

    protected fields: { [key: string]: any } = {};

    /**
     * Updates the internal table name of the query constructor
     *
     * @param newTableName - the new table name we will be using
     */
    public constructor(newTableName: string) {
        this.tableName = newTableName;
    }

    public addField = (newField: string): this => {
        this.fields[newField] = "";
        return this;
    };

    public addFieldValue = <T>(fieldKey: string, fieldValue: T): this => {
        this.fields[fieldKey] = fieldValue;
        return this;
    };

    public toString = (): string => {
        return `INSERT INTO "${this.tableName}"(${Object.keys(this.fields).join(
            ",",
        )}) VALUES (${Object.values(this.fields)
            .map((eachField: any) =>
                typeof eachField === "string" ? eachField : String(eachField),
            )
            .join(",")})`;
    };
}
