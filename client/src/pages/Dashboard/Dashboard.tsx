import React from "react";
import { Button, Image, OverlayTrigger } from "react-bootstrap";
import type { OverlayTriggerRenderProps } from "react-bootstrap/esm/OverlayTrigger";
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

import { capitalize, ProgrammingLanguageModal } from "../../common";
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
                    console.log("clicking");
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

    const chartData = [
        {
            averageTime: 350,
            day: "Monday",
            numberProblems: 70,
            totalTime: 28_000,
        },
        {
            averageTime: 700,
            day: "Tuesday",
            numberProblems: 25,
            totalTime: 17_500,
        },
        {
            averageTime: 1000,
            day: "Wednesday",
            numberProblems: 30,
            totalTime: 30_000,
        },
        {
            averageTime: 850,
            day: "Thursday",
            numberProblems: 45,
            totalTime: 38_250,
        },
        {
            averageTime: 250,
            day: "Friday",
            numberProblems: 50,
            totalTime: 12_500,
        },
        {
            averageTime: 700,
            day: "Saturday",
            numberProblems: 75,
            totalTime: 52_500,
        },
        {
            averageTime: 800,
            day: "Sunday",
            numberProblems: 80,
            totalTime: 64_000,
        },
    ];

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
                    <div className={styles.programming_problems_graphs}>
                        <ResponsiveContainer
                            height="100%"
                            minHeight={undefined}
                            width="50%"
                        >
                            <AreaChart
                                data={chartData}
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
                                data={chartData}
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
                                data={chartData}
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
                                data={chartData}
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
                                data={chartData}
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
                                data={chartData}
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
                                data={chartData}
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
                                data={chartData}
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
                    console.log("firing onClose");
                    if (key !== undefined) {
                        triggerOverlay(key);
                    }
                }}
                onSubmit={(key: DashboardOverlayKeys | undefined): void => {
                    if (key !== undefined) {
                        triggerOverlay(key);
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
