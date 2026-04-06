"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvoicePaymentSchema = exports.InvoicePayment = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const enums_1 = require("../../../enums");
let InvoicePayment = class InvoicePayment extends mongoose_2.Document {
};
exports.InvoicePayment = InvoicePayment;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Invoice', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], InvoicePayment.prototype, "invoiceId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Patient', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], InvoicePayment.prototype, "patientId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Doctor', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], InvoicePayment.prototype, "doctorId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, min: 0.01 }),
    __metadata("design:type", Number)
], InvoicePayment.prototype, "amount", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, enum: Object.values(enums_1.PaymentMethod) }),
    __metadata("design:type", String)
], InvoicePayment.prototype, "method", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], InvoicePayment.prototype, "paidAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], InvoicePayment.prototype, "paidDate", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, min: 0 }),
    __metadata("design:type", Number)
], InvoicePayment.prototype, "beforeRemaining", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, min: 0 }),
    __metadata("design:type", Number)
], InvoicePayment.prototype, "afterRemaining", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 'EGP' }),
    __metadata("design:type", String)
], InvoicePayment.prototype, "currency", void 0);
exports.InvoicePayment = InvoicePayment = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], InvoicePayment);
exports.InvoicePaymentSchema = mongoose_1.SchemaFactory.createForClass(InvoicePayment);
exports.InvoicePaymentSchema.index({ paidDate: 1 });
exports.InvoicePaymentSchema.index({ invoiceId: 1 });
exports.InvoicePaymentSchema.index({ patientId: 1 });
exports.InvoicePaymentSchema.index({ doctorId: 1, paidDate: 1 });
//# sourceMappingURL=invoice-payment.schema.js.map