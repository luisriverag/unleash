/**
 * Generated by Orval
 * Do not edit manually.
 * See `gen:api` script in package.json
 */

export type PersonalDashboardSchemaProjectsItem = {
    /** The number of features this project has */
    featureCount: number;
    /** An indicator of the [project's health](https://docs.getunleash.io/reference/technical-debt#health-rating) on a scale from 0 to 100 */
    health: number;
    /** The id of the project */
    id: string;
    /** The number of members this project has */
    memberCount: number;
    /** The name of the project */
    name: string;
};