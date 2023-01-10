import { MillisecondConstants } from "../constants";

/**
 * Generates the date range from the date supplied to it
 *
 * @param date - The date we are analyzing
 */
export const generateDateRange = (date: Date): Date[] => {
    let lowerDate: Date | undefined = new Date(date);
    let upperDate: Date | undefined = new Date(date);
    let foundLower = lowerDate.getDay() === 0;
    let foundUpper = upperDate.getDay() === 7;
    console.log("date = ", date);
    while (!foundLower || !foundUpper) {
        foundLower = lowerDate.getDay() === 0;
        foundUpper = upperDate.getDay() === 7;
        lowerDate = foundLower
            ? lowerDate
            : new Date(lowerDate.getTime() - MillisecondConstants.DAY);
        upperDate = foundUpper
            ? upperDate
            : new Date(upperDate.getTime() - MillisecondConstants.DAY);
    }
    return [lowerDate, upperDate];
};
