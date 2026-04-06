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
exports.ExpenseSchema = exports.Expense = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const enums_1 = require("../../../enums");
let Expense = class Expense extends mongoose_2.Document {
};
exports.Expense = Expense;
__decorate([
    (0, mongoose_1.Prop)({ required: true, enum: Object.values(enums_1.ExpenseCategory) }),
    __metadata("design:type", String)
], Expense.prototype, "category", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Expense.prototype, "categoryAr", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Expense.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, min: 0.01 }),
    __metadata("design:type", Number)
], Expense.prototype, "amount", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Expense.prototype, "date", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Expense.prototype, "receiptUrl", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'User', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Expense.prototype, "createdBy", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 'EGP' }),
    __metadata("design:type", String)
], Expense.prototype, "currency", void 0);
exports.Expense = Expense = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Expense);
exports.ExpenseSchema = mongoose_1.SchemaFactory.createForClass(Expense);
exports.ExpenseSchema.index({ date: 1 });
exports.ExpenseSchema.index({ createdBy: 1 });
//# sourceMappingURL=expense.schema.js.map