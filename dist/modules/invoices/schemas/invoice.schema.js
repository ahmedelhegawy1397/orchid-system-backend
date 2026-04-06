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
exports.InvoiceSchema = exports.Invoice = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const enums_1 = require("../../../enums");
const invoice_item_schema_1 = require("./invoice-item.schema");
let Invoice = class Invoice extends mongoose_2.Document {
};
exports.Invoice = Invoice;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Patient', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Invoice.prototype, "patientId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Doctor', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Invoice.prototype, "doctorId", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: [invoice_item_schema_1.InvoiceItemSchema],
        required: true,
        validate: {
            validator: (v) => v.length > 0,
            message: 'Invoice must have at least one item',
        },
    }),
    __metadata("design:type", Array)
], Invoice.prototype, "items", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, min: 0 }),
    __metadata("design:type", Number)
], Invoice.prototype, "subtotal", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, min: 0, default: 0 }),
    __metadata("design:type", Number)
], Invoice.prototype, "discount", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, enum: Object.values(enums_1.DiscountType), default: enums_1.DiscountType.Fixed }),
    __metadata("design:type", String)
], Invoice.prototype, "discountType", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, min: 0 }),
    __metadata("design:type", Number)
], Invoice.prototype, "total", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, min: 0, default: 0 }),
    __metadata("design:type", Number)
], Invoice.prototype, "paid", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, min: 0 }),
    __metadata("design:type", Number)
], Invoice.prototype, "remaining", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, enum: Object.values(enums_1.InvoiceStatus), default: enums_1.InvoiceStatus.Unpaid }),
    __metadata("design:type", String)
], Invoice.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 'EGP' }),
    __metadata("design:type", String)
], Invoice.prototype, "currency", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Invoice.prototype, "dueDate", void 0);
exports.Invoice = Invoice = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Invoice);
exports.InvoiceSchema = mongoose_1.SchemaFactory.createForClass(Invoice);
exports.InvoiceSchema.index({ patientId: 1 });
exports.InvoiceSchema.index({ doctorId: 1 });
exports.InvoiceSchema.index({ status: 1 });
exports.InvoiceSchema.index({ createdAt: 1 });
//# sourceMappingURL=invoice.schema.js.map