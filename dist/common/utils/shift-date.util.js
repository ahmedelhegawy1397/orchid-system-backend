"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrentClinicTime = getCurrentClinicTime;
exports.getCurrentShiftDate = getCurrentShiftDate;
const luxon_1 = require("luxon");
function getCurrentClinicTime(timezone = 'Africa/Cairo') {
    const now = luxon_1.DateTime.now().setZone(timezone);
    return now.toISO() ?? new Date().toISOString();
}
function getCurrentShiftDate(timezone = 'Africa/Cairo', shiftStartHour = 6) {
    const now = luxon_1.DateTime.now().setZone(timezone);
    if (now.hour < shiftStartHour) {
        return now.minus({ days: 1 }).toFormat('yyyy-MM-dd');
    }
    return now.toFormat('yyyy-MM-dd');
}
//# sourceMappingURL=shift-date.util.js.map