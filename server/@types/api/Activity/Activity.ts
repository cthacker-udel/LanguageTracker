import type {
    ActivityLanguage,
    ActivityLevel,
    ActivityType,
    TimeMeasurement,
} from "./ActivityEnums";

export type Activity = {
    description: string;
    language: ActivityLanguage;
    level: ActivityLevel;
    link: string;
    title: string;
    totalTime: number;
    totalTimeMeasurement: TimeMeasurement;
    type: ActivityType;
};
