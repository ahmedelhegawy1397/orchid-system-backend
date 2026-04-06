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
exports.InvoiceItemSchema = exports.InvoiceItem = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
function validateFDITooth(v) {
    const valid = new Set([11, 12, 13, 14, 15, 16, 17, 18, 21, 22, 23, 24, 25, 26, 27, 28, 31, 32, 33, 34, 35, 36, 37, 38, 41, 42, 43, 44, 45, 46, 47, 48]);
    return valid.has(v);
}
let InvoiceItem = class InvoiceItem extends mongoose_2.Document {
};
exports.InvoiceItem = InvoiceItem;
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], InvoiceItem.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], InvoiceItem.prototype, "descriptionAr", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], InvoiceItem.prototype, "procedure", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], InvoiceItem.prototype, "procedureAr", void 0);
__decorate([
    (0, mongoose_1.Prop)({ min: 1, default: 1 }),
    __metadata("design:type", Number)
], InvoiceItem.prototype, "quantity", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, min: 0 }),
    __metadata("design:type", Number)
], InvoiceItem.prototype, "unitPrice", void 0);
__decorate([
    (0, mongoose_1.Prop)({ min: 0 }),
    __metadata("design:type", Number)
], InvoiceItem.prototype, "total", void 0);
__decorate([
    (0, mongoose_1.Prop)({ validate: { validator: validateFDITooth, message: 'Invalid FDI tooth number' } }),
    __metadata("design:type", Number)
], InvoiceItem.prototype, "toothNumber", void 0);
exports.InvoiceItem = InvoiceItem = __decorate([
    (0, mongoose_1.Schema)({ _id: true })
], InvoiceItem);
exports.InvoiceItemSchema = mongoose_1.SchemaFactory.createForClass(InvoiceItem);
//# sourceMappingURL=invoice-item.schema.js.map