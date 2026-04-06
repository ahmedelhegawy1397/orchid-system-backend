"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWorkdayRange = getWorkdayRange;
exports.getWorkdayRangeFromDateRange = getWorkdayRangeFromDateRange;
exports.getWorkdayDateFromUtc = getWorkdayDateFromUtc;
const luxon_1 = require("luxon");
function getWorkdayRange(date, tz, startHour = 6) {
    const startLocal = luxon_1.DateTime.fromISO(date, { zone: tz }).set({ hour: startHour, minute: 0, second: 0, millisecond: 0 });
    const endLocal = startLocal.plus({ days: 1 });
    return {
        start: startLocal.toUTC().toJSDate(),
        end: endLocal.toUTC().toJSDate(),
    };
}
function getWorkdayRangeFromDateRange(startDate, endDate, tz, startHour = 6) {
    const startLocal = luxon_1.DateTime.fromISO(startDate, { zone: tz }).set({
        hour: startHour,
        minute: 0,
        second: 0,
        millisecond: 0,
    });
    const endLocal = luxon_1.DateTime.fromISO(endDate, { zone: tz })
        .plus({ days: 1 })
        .set({ hour: startHour, minute: 0, second: 0, millisecond: 0 });
    return {
        start: startLocal.toUTC().toJSDate(),
        end: endLocal.toUTC().toJSDate(),
    };
}
function getWorkdayDateFromUtc(utcDate, tz, startHour = 6) {
    const dt = luxon_1.DateTime.fromJSDate(utcDate, { zone: 'utc' }).setZone(tz);
    const localDate = dt.toISODate();
    if (!localDate)
        return dt.toFormat('yyyy-MM-dd');
    const dayStart = luxon_1.DateTime.fromISO(localDate, { zone: tz }).set({
        hour: startHour,
        minute: 0,
        second: 0,
        millisecond: 0,
    });
    if (dt < dayStart) {
        const prev = luxon_1.DateTime.fromISO(localDate, { zone: tz }).minus({ days: 1 });
        return prev.toFormat('yyyy-MM-dd');
    }
    return localDate;
}
//# sourceMappingURL=date-range.util.js.map