import type {
    ActivityLanguage,
    ActivityLevel,
    ActivityType,
    TimeMeasurement,
} from "./ActivityEnums";

type ActivityData = {
    description: string;
    language: ActivityLanguage;
    level: ActivityLevel;
    link: string;
    title: string;
    totalTime: number;
    totalTimeMeasurement: TimeMeasurement;
    type?: ActivityType;
};

type APICompliantActivity = {
    activity_level: number;
    activity_type: number;
    description: string;
    language_type: number;
    link: string;
    title: string;
    time_type: number;
    total_time: number;
};

export type { ActivityData, APICompliantActivity };
