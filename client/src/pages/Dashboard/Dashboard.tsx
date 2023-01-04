/* eslint-disable react/jsx-sort-props -- disabled */
/* eslint-disable no-unused-vars -- disabled */
import React from "react";
import { Image } from "react-bootstrap";
import {
    Area,
    AreaChart,
    Bar,
    CartesianGrid,
    ComposedChart,
    Legend,
    Line,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

import codewarsLogo from "./codewarslogo.svg";
import styles from "./Dashboard.module.css";
import dashboardBackground from "./dashboardbg.gif";
import edabitLogo from "./edabitlogo.png";
import languagesGif from "./languages.gif";
import leetcodeLogo from "./leetcodelogo.png";

/**
 * Dashboard component
 *
 * @returns Dashboard component, which houses all the logic for starting your account in the language tracker
 */
export const Dashboard = (): JSX.Element => {
    React.useEffect(() => {
        const mainLayout: HTMLDivElement | null =
            document.querySelector("#main_layout");
        if (mainLayout !== null) {
            mainLayout.style.backgroundImage = `url(${dashboardBackground})`;
            mainLayout.style.backgroundSize = "cover";
            mainLayout.style.backgroundBlendMode = "lighten";
            mainLayout.style.backgroundColor = "rgba(255, 255, 255, 0.33)";
            mainLayout.style.backgroundRepeat = "repeat-y";
        }

        return () => {
            if (mainLayout !== null) {
                mainLayout.style.backgroundImage = "";
                mainLayout.style.backgroundSize = "";
                mainLayout.style.backgroundBlendMode = "";
                mainLayout.style.backgroundColor = "";
                mainLayout.style.backgroundRepeat = "";
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
                        <span className={styles.programming_problems_solved}>
                            {"Codewars"}
                        </span>
                    </div>
                    <div className={styles.programming_problems_graphs}>
                        <ResponsiveContainer
                            height="100%"
                            width="50%"
                            minHeight={undefined}
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
                                    type="monotone"
                                    dataKey="totalTime"
                                    stroke="#8884d8"
                                    fillOpacity={1}
                                    fill="rgba(0, 0, 0, .25)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                        <ResponsiveContainer
                            height="100%"
                            width="50%"
                            minHeight={undefined}
                        >
                            <ComposedChart
                                width={700}
                                height={250}
                                data={chartData}
                            >
                                <XAxis dataKey="day" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <CartesianGrid stroke="#f5f5f5" />
                                <Area
                                    type="monotone"
                                    dataKey="averageTime"
                                    fill="#8884d8"
                                    stroke="#8884d8"
                                />
                                <Bar
                                    dataKey="numberProblems"
                                    barSize={20}
                                    fill="#413ea0"
                                />
                            </ComposedChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                <div className={styles.programming_section}>
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
                        <span className={styles.programming_problems_solved}>
                            {"Edabit"}
                        </span>
                    </div>
                    <div className={styles.programming_problems_graphs}>
                        <ResponsiveContainer
                            height="100%"
                            width="50%"
                            minHeight={undefined}
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
                                    type="monotone"
                                    dataKey="totalTime"
                                    stroke="#8884d8"
                                    fillOpacity={1}
                                    fill="rgba(0, 0, 0, .25)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                        <ResponsiveContainer
                            height="100%"
                            width="50%"
                            minHeight={undefined}
                        >
                            <ComposedChart
                                width={700}
                                height={250}
                                data={chartData}
                            >
                                <XAxis dataKey="day" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <CartesianGrid stroke="#f5f5f5" />
                                <Area
                                    type="monotone"
                                    dataKey="averageTime"
                                    fill="#8884d8"
                                    stroke="#8884d8"
                                />
                                <Bar
                                    dataKey="numberProblems"
                                    barSize={20}
                                    fill="#413ea0"
                                />
                            </ComposedChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                <div className={styles.programming_section}>
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
                        <span className={styles.programming_problems_solved}>
                            {"Leetcode"}
                        </span>
                    </div>
                    <div className={styles.programming_problems_graphs}>
                        <ResponsiveContainer
                            height="100%"
                            width="50%"
                            minHeight={undefined}
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
                                    type="monotone"
                                    dataKey="totalTime"
                                    stroke="#8884d8"
                                    fillOpacity={1}
                                    fill="rgba(0, 0, 0, .25)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                        <ResponsiveContainer
                            height="100%"
                            width="50%"
                            minHeight={undefined}
                        >
                            <ComposedChart
                                width={700}
                                height={250}
                                data={chartData}
                            >
                                <XAxis dataKey="day" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <CartesianGrid stroke="#f5f5f5" />
                                <Area
                                    type="monotone"
                                    dataKey="averageTime"
                                    fill="#8884d8"
                                    stroke="#8884d8"
                                />
                                <Bar
                                    dataKey="numberProblems"
                                    barSize={20}
                                    fill="#413ea0"
                                />
                            </ComposedChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                <div className={styles.programming_section}>
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
                        <span className={styles.programming_problems_solved}>
                            {"Languages"}
                        </span>
                    </div>
                    <div className={styles.programming_problems_graphs}>
                        <ResponsiveContainer
                            height="100%"
                            width="50%"
                            minHeight={undefined}
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
                                    type="monotone"
                                    dataKey="totalTime"
                                    stroke="#8884d8"
                                    fillOpacity={1}
                                    fill="rgba(0, 0, 0, .25)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                        <ResponsiveContainer
                            height="100%"
                            width="50%"
                            minHeight={undefined}
                        >
                            <ComposedChart
                                width={700}
                                height={250}
                                data={chartData}
                            >
                                <XAxis dataKey="day" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <CartesianGrid stroke="#f5f5f5" />
                                <Area
                                    type="monotone"
                                    dataKey="averageTime"
                                    fill="#8884d8"
                                    stroke="#8884d8"
                                />
                                <Bar
                                    dataKey="numberProblems"
                                    barSize={20}
                                    fill="#413ea0"
                                />
                            </ComposedChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </>
    );
};
