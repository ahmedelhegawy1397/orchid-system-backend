"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.computeStatus = computeStatus;
exports.applyDiscount = applyDiscount;
exports.normalizeMethod = normalizeMethod;
const enums_1 = require("../../enums");
function computeStatus(paid, total) {
    if (paid >= total || total === 0)
        return enums_1.InvoiceStatus.Paid;
    if (paid > 0)
        return enums_1.InvoiceStatus.Partial;
    return enums_1.InvoiceStatus.Unpaid;
}
function applyDiscount(subtotal, discount, type) {
    if (type === enums_1.DiscountType.Percentage) {
        return Math.max(0, subtotal - (subtotal * discount) / 100);
    }
    return Math.max(0, subtotal - discount);
}
function normalizeMethod(m) {
    if (m === 'transfer')
        return enums_1.PaymentMethod.Instapay;
    return Object.values(enums_1.PaymentMethod).includes(m)
        ? m
        : enums_1.PaymentMethod.Cash;
}
//# sourceMappingURL=invoice-helpers.js.map