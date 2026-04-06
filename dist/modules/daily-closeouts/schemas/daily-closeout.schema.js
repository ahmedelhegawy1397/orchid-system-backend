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
exports.DailyCloseoutSchema = exports.DailyCloseout = exports.ExpenseSnapshot = exports.UnpaidInvoiceSnapshot = exports.PaymentSnapshot = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let PaymentSnapshot = class PaymentSnapshot {
};
exports.PaymentSnapshot = PaymentSnapshot;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], PaymentSnapshot.prototype, "paymentId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], PaymentSnapshot.prototype, "invoiceId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], PaymentSnapshot.prototype, "patientName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], PaymentSnapshot.prototype, "patientNameAr", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], PaymentSnapshot.prototype, "doctorName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], PaymentSnapshot.prototype, "doctorNameAr", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, min: 0 }),
    __metadata("design:type", Number)
], PaymentSnapshot.prototype, "invoiceSubtotal", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, min: 0 }),
    __metadata("design:type", Number)
], PaymentSnapshot.prototype, "invoiceDiscount", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], PaymentSnapshot.prototype, "invoiceDiscountType", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, min: 0 }),
    __metadata("design:type", Number)
], PaymentSnapshot.prototype, "invoiceTotal", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, min: 0 }),
    __metadata("design:type", Number)
], PaymentSnapshot.prototype, "beforeRemaining", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, min: 0 }),
    __metadata("design:type", Number)
], PaymentSnapshot.prototype, "amount", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, min: 0 }),
    __metadata("design:type", Number)
], PaymentSnapshot.prototype, "afterRemaining", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], PaymentSnapshot.prototype, "method", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], PaymentSnapshot.prototype, "paidAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], PaymentSnapshot.prototype, "paidDate", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], PaymentSnapshot.prototype, "invoiceCreatedAt", void 0);
exports.PaymentSnapshot = PaymentSnapshot = __decorate([
    (0, mongoose_1.Schema)({ _id: false })
], PaymentSnapshot);
const PaymentSnapshotSchema = mongoose_1.SchemaFactory.createForClass(PaymentSnapshot);
let UnpaidInvoiceSnapshot = class UnpaidInvoiceSnapshot {
};
exports.UnpaidInvoiceSnapshot = UnpaidInvoiceSnapshot;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], UnpaidInvoiceSnapshot.prototype, "invoiceId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], UnpaidInvoiceSnapshot.prototype, "patientName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], UnpaidInvoiceSnapshot.prototype, "patientNameAr", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], UnpaidInvoiceSnapshot.prototype, "doctorName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], UnpaidInvoiceSnapshot.prototype, "doctorNameAr", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, min: 0 }),
    __metadata("design:type", Number)
], UnpaidInvoiceSnapshot.prototype, "invoiceSubtotal", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, min: 0 }),
    __metadata("design:type", Number)
], UnpaidInvoiceSnapshot.prototype, "invoiceDiscount", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], UnpaidInvoiceSnapshot.prototype, "invoiceDiscountType", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, min: 0 }),
    __metadata("design:type", Number)
], UnpaidInvoiceSnapshot.prototype, "invoiceTotal", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], UnpaidInvoiceSnapshot.prototype, "invoiceCreatedAt", void 0);
exports.UnpaidInvoiceSnapshot = UnpaidInvoiceSnapshot = __decorate([
    (0, mongoose_1.Schema)({ _id: false })
], UnpaidInvoiceSnapshot);
const UnpaidInvoiceSnapshotSchema = mongoose_1.SchemaFactory.createForClass(UnpaidInvoiceSnapshot);
let ExpenseSnapshot = class ExpenseSnapshot {
};
exports.ExpenseSnapshot = ExpenseSnapshot;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], ExpenseSnapshot.prototype, "expenseId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], ExpenseSnapshot.prototype, "category", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], ExpenseSnapshot.prototype, "categoryAr", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], ExpenseSnapshot.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, min: 0 }),
    __metadata("design:type", Number)
], ExpenseSnapshot.prototype, "amount", void 0);
exports.ExpenseSnapshot = ExpenseSnapshot = __decorate([
    (0, mongoose_1.Schema)({ _id: false })
], ExpenseSnapshot);
const ExpenseSnapshotSchema = mongoose_1.SchemaFactory.createForClass(ExpenseSnapshot);
let DailyCloseout = class DailyCloseout extends mongoose_2.Document {
};
exports.DailyCloseout = DailyCloseout;
__decorate([
    (0, mongoose_1.Prop)({ required: true, unique: true }),
    __metadata("design:type", String)
], DailyCloseout.prototype, "date", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'User', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], DailyCloseout.prototype, "closedBy", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, min: 0, default: 0 }),
    __metadata("design:type", Number)
], DailyCloseout.prototype, "cashCollected", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, min: 0, default: 0 }),
    __metadata("design:type", Number)
], DailyCloseout.prototype, "cardCollected", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, min: 0, default: 0 }),
    __metadata("design:type", Number)
], DailyCloseout.prototype, "transferCollected", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, min: 0, default: 0 }),
    __metadata("design:type", Number)
], DailyCloseout.prototype, "vodafoneCashCollected", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, min: 0, default: 0 }),
    __metadata("design:type", Number)
], DailyCloseout.prototype, "totalCollected", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, min: 0, default: 0 }),
    __metadata("design:type", Number)
], DailyCloseout.prototype, "revenue", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [PaymentSnapshotSchema], default: [] }),
    __metadata("design:type", Array)
], DailyCloseout.prototype, "paymentSnapshot", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [UnpaidInvoiceSnapshotSchema], default: [] }),
    __metadata("design:type", Array)
], DailyCloseout.prototype, "unpaidInvoicesSnapshot", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [ExpenseSnapshotSchema], default: [] }),
    __metadata("design:type", Array)
], DailyCloseout.prototype, "expenseSnapshot", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, min: 0, default: 0 }),
    __metadata("design:type", Number)
], DailyCloseout.prototype, "totalExpenses", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: 0 }),
    __metadata("design:type", Number)
], DailyCloseout.prototype, "finalBalance", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], DailyCloseout.prototype, "closedAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 'EGP' }),
    __metadata("design:type", String)
], DailyCloseout.prototype, "currency", void 0);
exports.DailyCloseout = DailyCloseout = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], DailyCloseout);
exports.DailyCloseoutSchema = mongoose_1.SchemaFactory.createForClass(DailyCloseout);
//# sourceMappingURL=daily-closeout.schema.js.map