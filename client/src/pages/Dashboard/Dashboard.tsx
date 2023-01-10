/* eslint-disable @typescript-eslint/indent -- disabled */
/* eslint-disable camelcase -- disabled */
import React from "react";
import { Button, Image, OverlayTrigger } from "react-bootstrap";
import type { OverlayTriggerRenderProps } from "react-bootstrap/esm/OverlayTrigger";
import GridLoader from "react-spinners/GridLoader";
import {
    Area,
    AreaChart,
    Bar,
    CartesianGrid,
    ComposedChart,
    Legend,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import useSwr from "swr";

import type {
    ActivityChartData,
    ActivityData,
    ActivityType,
    APICompliantActivity,
} from "../../@types";
import {
    type ActivityBucket,
    bucketizeActivities,
    capitalize,
    databasetiseActivity,
    getUsername,
    ProgrammingLanguageModal,
} from "../../common";
import { ServerSideApi } from "../../common/api";
import { convertApiActivities } from "../../common/helpers/convertApiActivities";
import { renderTooltip } from "../../common/helpers/renderTooltip";
import codewarsLogo from "./codewarslogo.svg";
import styles from "./Dashboard.module.css";
import edabitLogo from "./edabitlogo.png";
import languagesGif from "./languages.gif";
import leetcodeLogo from "./leetcodelogo.png";

type DashboardOverlays = {
    codewars: boolean;
    edabit: boolean;
    languages: boolean;
    leetcode: boolean;
};

type DashboardOverlayKeys = "codewars" | "edabit" | "languages" | "leetcode";

const initialOverlays: DashboardOverlays = {
    codewars: false,
    edabit: false,
    languages: false,
    leetcode: false,
};

/**
 * Dashboard component
 *
 * @returns Dashboard component, which houses all the logic for starting your account in the language tracker
 */
const Dashboard = (): JSX.Element => {
    const { data: activities, isLoading } = useSwr<APICompliantActivity[]>(
        `/api/activity/dashboard?currentday='${new Date().toDateString()}'`,
    );

    console.log(isLoading);

    const [activityBucket, setActivityBucket] = React.useState<ActivityBucket>(
        bucketizeActivities(activities ?? []),
    );

    const [codewarsActivities, setCodewarsActivities] = React.useState<
        ActivityChartData[]
    >([]);
    const [edabitActivities, setEdabitActivities] = React.useState<
        ActivityChartData[]
    >([]);
    const [leetcodeActivities, setLeetcodeActivities] = React.useState<
        ActivityChartData[]
    >([]);
    const [languagesActivities, setLanguagesActivities] = React.useState<
        ActivityChartData[]
    >([]);

    const [overlays, setOverlays] =
        React.useState<DashboardOverlays>(initialOverlays);

    const triggerOverlay = React.useCallback(
        (trigger: DashboardOverlayKeys) => {
            setOverlays((oldOverlays) => {
                oldOverlays[trigger] = !oldOverlays[trigger];
                return { ...oldOverlays };
            });
        },
        [],
    );

    const gatherValidDashboardOverlayKey = React.useCallback(() => {
        const validEntry = (
            Object.entries(overlays) as [DashboardOverlayKeys, boolean][]
        ).filter((eachOverlay) => eachOverlay[1]);
        if (validEntry.length > 0) {
            return validEntry[0][0];
        }
        return undefined;
    }, [overlays]);

    const gatherImageFromValidDashboardOverlayKey = React.useCallback(() => {
        const validKey = gatherValidDashboardOverlayKey();
        const images = [codewarsLogo, edabitLogo, leetcodeLogo, languagesGif];
        const indexMapping: { [key: string]: number } = {
            codewars: 0,
            edabit: 1,
            languages: 3,
            leetcode: 2,
        };
        if (validKey !== undefined) {
            return images[indexMapping[validKey]];
        }
        return undefined;
    }, [gatherValidDashboardOverlayKey]);

    /**
     * Creates the add button that displays when the user hovers over the language
     *
     * @param link - The link we are navigating to when the user clicks the button
     * @returns The add button
     */
    const createAddButton = React.useCallback(
        (key: DashboardOverlayKeys): JSX.Element => (
            <Button
                onClick={(): void => {
                    triggerOverlay(key);
                }}
                variant="outline-light"
            >
                <i className="fa-solid fa-plus" />
            </Button>
        ),
        [triggerOverlay],
    );

    React.useEffect(() => {
        const mainLayout: HTMLDivElement | null =
            document.querySelector("#main_layout");
        if (mainLayout !== null) {
            mainLayout.style.backgroundColor = "#16171b";
            mainLayout.style.padding = "1em";
        }

        return () => {
            if (mainLayout !== null) {
                mainLayout.style.backgroundColor = "";
                mainLayout.style.padding = "";
            }
        };
    }, []);

    React.useEffect(() => {
        if (activityBucket !== undefined) {
            setCodewarsActivities(
                convertApiActivities(activityBucket.codewars),
            );
            setEdabitActivities(convertApiActivities(activityBucket.edabit));
            setLeetcodeActivities(
                convertApiActivities(activityBucket.leetcode),
            );
            setLanguagesActivities(
                convertApiActivities(activityBucket.languages),
            );
        }
    }, [activityBucket]);

    return (
        <>
            <div className={styles.dashboard_title}>
                {"Language Tracker Dashboard"}
            </div>
            <div className={styles.dashboard_content}>
                <div className={styles.programming_section}>
                    <OverlayTrigger
                        delay={{ hide: 1000, show: 250 }}
                        overlay={(
                            properties: OverlayTriggerRenderProps,
                        ): JSX.Element =>
                            renderTooltip(
                                properties,
                                createAddButton("codewars"),
                            )
                        }
                        placement="right"
                    >
                        <div className={styles.programming_problems}>
                            <div
                                className={
                                    styles.programming_problems_logo_container
                                }
                            >
                                <Image
                                    className={styles.site_logo}
                                    src={codewarsLogo}
                                />
                            </div>
                            <span
                                className={styles.programming_problems_solved}
                            >
                                {"Codewars"}
                            </span>
                        </div>
                    </OverlayTrigger>
                    {isLoading ? (
                        <div
                            className={
                                styles.programming_problems_loading_graphs
                            }
                        >
                            <GridLoader color="#8884d1" size={25} />
                        </div>
                    ) : (
                        <div className={styles.programming_problems_graphs}>
                            <ResponsiveContainer
                                height="100%"
                                minHeight={undefined}
                                width="50%"
                            >
                                <AreaChart
                                    data={codewarsActivities}
                                    height={250}
                                    width={500}
                                >
                                    <XAxis dataKey="day" />
                                    <YAxis />
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <Legend
                                        formatter={(value): string =>
                                            `${value} (seconds)`
                                        }
                                    />
                                    <Tooltip />
                                    <Area
                                        dataKey="totalTime"
                                        fill="rgba(0, 0, 0, .25)"
                                        fillOpacity={1}
                                        stroke="#8884d8"
                                        type="monotone"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                            <ResponsiveContainer
                                height="100%"
                                minHeight={undefined}
                                width="50%"
                            >
                                <ComposedChart
                                    data={codewarsActivities}
                                    height={250}
                                    width={700}
                                >
                                    <XAxis dataKey="day" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <CartesianGrid stroke="#f5f5f5" />
                                    <Area
                                        dataKey="averageTime"
                                        fill="#8884d8"
                                        stroke="#8884d8"
                                        type="monotone"
                                    />
                                    <Bar
                                        barSize={20}
                                        dataKey="numberProblems"
                                        fill="#413ea0"
                                    />
                                </ComposedChart>
                            </ResponsiveContainer>
                        </div>
                    )}
                </div>
                <div className={styles.programming_section}>
                    <OverlayTrigger
                        delay={{ hide: 1000, show: 250 }}
                        overlay={(
                            properties: OverlayTriggerRenderProps,
                        ): JSX.Element =>
                            renderTooltip(properties, createAddButton("edabit"))
                        }
                        placement="right"
                    >
                        <div className={styles.programming_problems}>
                            <div
                                className={
                                    styles.programming_problems_logo_container
                                }
                            >
                                <Image
                                    className={styles.site_logo}
                                    src={edabitLogo}
                                />
                            </div>
                            <span
                                className={styles.programming_problems_solved}
                            >
                                {"Edabit"}
                            </span>
                        </div>
                    </OverlayTrigger>
                    <div className={styles.programming_problems_graphs}>
                        <ResponsiveContainer
                            height="100%"
                            minHeight={undefined}
                            width="50%"
                        >
                            <AreaChart
                                data={edabitActivities}
                                height={250}
                                width={500}
                            >
                                <XAxis dataKey="day" />
                                <YAxis />
                                <CartesianGrid strokeDasharray="3 3" />
                                <Legend
                                    formatter={(value): string =>
                                        `${value} (seconds)`
                                    }
                                />
                                <Tooltip />
                                <Area
                                    dataKey="totalTime"
                                    fill="rgba(0, 0, 0, .25)"
                                    fillOpacity={1}
                                    stroke="#8884d8"
                                    type="monotone"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                        <ResponsiveContainer
                            height="100%"
                            minHeight={undefined}
                            width="50%"
                        >
                            <ComposedChart
                                data={edabitActivities}
                                height={250}
                                width={700}
                            >
                                <XAxis dataKey="day" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <CartesianGrid stroke="#f5f5f5" />
                                <Area
                                    dataKey="averageTime"
                                    fill="#8884d8"
                                    stroke="#8884d8"
                                    type="monotone"
                                />
                                <Bar
                                    barSize={20}
                                    dataKey="numberProblems"
                                    fill="#413ea0"
                                />
                            </ComposedChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                <div className={styles.programming_section}>
                    <OverlayTrigger
                        delay={{ hide: 1000, show: 250 }}
                        overlay={(
                            properties: OverlayTriggerRenderProps,
                        ): JSX.Element =>
                            renderTooltip(
                                properties,
                                createAddButton("leetcode"),
                            )
                        }
                        placement="right"
                    >
                        <div className={styles.programming_problems}>
                            <div
                                className={
                                    styles.programming_problems_logo_container
                                }
                            >
                                <Image
                                    className={styles.site_logo}
                                    src={leetcodeLogo}
                                />
                            </div>
                            <span
                                className={styles.programming_problems_solved}
                            >
                                {"Leetcode"}
                            </span>
                        </div>
                    </OverlayTrigger>
                    <div className={styles.programming_problems_graphs}>
                        <ResponsiveContainer
                            height="100%"
                            minHeight={undefined}
                            width="50%"
                        >
                            <AreaChart
                                data={leetcodeActivities}
                                height={250}
                                width={500}
                            >
                                <XAxis dataKey="day" />
                                <YAxis />
                                <CartesianGrid strokeDasharray="3 3" />
                                <Legend
                                    formatter={(value): string =>
                                        `${value} (seconds)`
                                    }
                                />
                                <Tooltip />
                                <Area
                                    dataKey="totalTime"
                                    fill="rgba(0, 0, 0, .25)"
                                    fillOpacity={1}
                                    stroke="#8884d8"
                                    type="monotone"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                        <ResponsiveContainer
                            height="100%"
                            minHeight={undefined}
                            width="50%"
                        >
                            <ComposedChart
                                data={leetcodeActivities}
                                height={250}
                                width={700}
                            >
                                <XAxis dataKey="day" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <CartesianGrid stroke="#f5f5f5" />
                                <Area
                                    dataKey="averageTime"
                                    fill="#8884d8"
                                    stroke="#8884d8"
                                    type="monotone"
                                />
                                <Bar
                                    barSize={20}
                                    dataKey="numberProblems"
                                    fill="#413ea0"
                                />
                            </ComposedChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                <div className={styles.programming_section}>
                    <OverlayTrigger
                        delay={{ hide: 1000, show: 250 }}
                        overlay={(
                            properties: OverlayTriggerRenderProps,
                        ): JSX.Element =>
                            renderTooltip(
                                properties,
                                createAddButton("leetcode"),
                            )
                        }
                        placement="right"
                    >
                        <div className={styles.programming_problems}>
                            <div
                                className={
                                    styles.programming_problems_logo_container
                                }
                            >
                                <Image
                                    className={styles.site_logo}
                                    src={languagesGif}
                                />
                            </div>
                            <span
                                className={styles.programming_problems_solved}
                            >
                                {"Languages"}
                            </span>
                        </div>
                    </OverlayTrigger>
                    <div className={styles.programming_problems_graphs}>
                        <ResponsiveContainer
                            height="100%"
                            minHeight={undefined}
                            width="50%"
                        >
                            <AreaChart
                                data={languagesActivities}
                                height={250}
                                width={500}
                            >
                                <XAxis dataKey="day" />
                                <YAxis />
                                <CartesianGrid strokeDasharray="3 3" />
                                <Legend
                                    formatter={(value): string =>
                                        `${value} (seconds)`
                                    }
                                />
                                <Tooltip />
                                <Area
                                    dataKey="totalTime"
                                    fill="rgba(0, 0, 0, .25)"
                                    fillOpacity={1}
                                    stroke="#8884d8"
                                    type="monotone"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                        <ResponsiveContainer
                            height="100%"
                            minHeight={undefined}
                            width="50%"
                        >
                            <ComposedChart
                                data={languagesActivities}
                                height={250}
                                width={700}
                            >
                                <XAxis dataKey="day" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <CartesianGrid stroke="#f5f5f5" />
                                <Area
                                    dataKey="averageTime"
                                    fill="#8884d8"
                                    stroke="#8884d8"
                                    type="monotone"
                                />
                                <Bar
                                    barSize={20}
                                    dataKey="numberProblems"
                                    fill="#413ea0"
                                />
                            </ComposedChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
            <ProgrammingLanguageModal
                dashboardKey={gatherValidDashboardOverlayKey()}
                display={Object.values(overlays).some(Boolean)}
                onClose={(key: DashboardOverlayKeys | undefined): void => {
                    if (key !== undefined) {
                        triggerOverlay(key);
                    }
                }}
                onSubmit={async (
                    key: ActivityType,
                    values: Partial<ActivityData>,
                ): Promise<void> => {
                    const validDashboardKey = gatherValidDashboardOverlayKey();
                    if (validDashboardKey !== undefined) {
                        triggerOverlay(validDashboardKey);
                    }
                    const username = getUsername(document);
                    const addActivityResult =
                        await ServerSideApi.post<Response>(
                            "/activity/addActivity",
                            {
                                ...databasetiseActivity({
                                    ...values,
                                    type: key,
                                } as ActivityData),
                                username,
                            },
                        );
                    if (addActivityResult.status === 204) {
                        console.log("Success!");
                    }
                }}
                programmingLanguageImage={gatherImageFromValidDashboardOverlayKey()}
                title={`Add ${capitalize(
                    gatherValidDashboardOverlayKey(),
                )} Activity`}
            />
        </>
    );
};

export { type DashboardOverlayKeys, type DashboardOverlays, Dashboard };
