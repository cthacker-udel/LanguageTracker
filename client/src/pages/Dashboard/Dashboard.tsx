import React from "react";

import styles from "./Dashboard.module.css";
import dashboardBackground from "./dashboardbg.gif";

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
        }

        return () => {
            if (mainLayout !== null) {
                mainLayout.style.backgroundImage = "";
                mainLayout.style.backgroundSize = "";
                mainLayout.style.backgroundBlendMode = "";
                mainLayout.style.backgroundColor = "";
            }
        };
    }, []);

    return (
        <div>
            <div className={styles.dashboard_title}>
                {"Language Tracker Dashboard"}
            </div>
            <div className={styles.dashboard_content}>
                <div className={styles.codewars_problems}>
                    {"Codewars problems"}
                </div>
                <div className={styles.edabit_problems}>
                    {"Edabit problems"}
                </div>
                <div className={styles.leetcode_problems}>
                    {"Leetcode problems"}
                </div>
                <div className={styles.average_time_per_problem}>
                    {"Average time per problem"}
                </div>
            </div>
            <div className={styles.dashboard_middle_content}>
                {"Average problems completed per day"}
            </div>
            <div className={styles.dashboard_footer}>
                <div className={styles.average_codewars_completed}>
                    {"Average codewars completed"}
                </div>
                <div className={styles.average_edabit_completed}>
                    {"Average edabit completed"}
                </div>
                <div className={styles.average_leetcode_completed}>
                    {"Average leetcode completed"}
                </div>
            </div>
        </div>
    );
};
