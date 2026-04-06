export declare function getWorkdayRange(date: string, tz: string, startHour?: number): {
    start: Date;
    end: Date;
};
export declare function getWorkdayRangeFromDateRange(startDate: string, endDate: string, tz: string, startHour?: number): {
    start: Date;
    end: Date;
};
export declare function getWorkdayDateFromUtc(utcDate: Date, tz: string, startHour?: number): string;
