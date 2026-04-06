"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizePaymentMethod = normalizePaymentMethod;
const common_1 = require("@nestjs/common");
const enums_1 = require("../../enums");
function normalizePaymentMethod(method) {
    if (!method)
        return undefined;
    const normalized = method
        .trim()
        .toLowerCase()
        .replace(/[\s_-]/g, '');
    if (normalized === 'cash')
        return enums_1.PaymentMethod.Cash;
    if (normalized === 'card')
        return enums_1.PaymentMethod.Card;
    if (normalized === 'instapay' || normalized === 'transfer')
        return enums_1.PaymentMethod.Instapay;
    if (normalized === 'vodafonecash' ||
        normalized === 'vodafonecase' ||
        normalized === 'vodafonecashcase' ||
        normalized === 'vodafone') {
        return enums_1.PaymentMethod.VodafoneCash;
    }
    if (Object.values(enums_1.PaymentMethod).includes(method.trim())) {
        return method.trim();
    }
    throw new common_1.BadRequestException('paymentMethod must be one of: cash, card, vodafone_cash, instapay');
}
//# sourceMappingURL=payment-method.util.js.map