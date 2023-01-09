/* eslint-disable no-shadow -- does not work with enums */
/* eslint-disable no-unused-vars -- does not work with enums */

enum ActivityLevel {
    NONE = -1,
    VERYEASY = 1,
    EASY = 2,
    EASYMEDIUM = 3,
    MEDIUM = 4,
    MEDIUMHARD = 5,
    HARD = 6,
    VERYHARD = 7,
    INSANE = 8,
}

enum TimeMeasurement {
    NONE = -1,
    SECONDS = 1,
    MINUTES = 2,
    HOURS = 3,
}

enum ActivityType {
    NONE = -1,
    CODEWARS = 1,
    EDABIT = 2,
    LEETCODE = 3,
    LANGUAGES = 4,
}

enum ActivityLanguage {
    NONE = -1,
    PYTHON = 1,
    JAVASCRIPT = 2,
    TYPESCRIPT = 3,
    C = 4,
    CPP = 5,
    CSHARP = 6,
    SQL = 7,
    JAVA = 8,
    HTML = 9,
    CSS = 10,
}

export { ActivityLanguage, ActivityLevel, ActivityType, TimeMeasurement };
