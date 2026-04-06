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
exports.CreateInvoiceDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const enums_1 = require("../../../enums");
const invoice_item_dto_1 = require("./invoice-item.dto");
class CreateInvoiceDto {
}
exports.CreateInvoiceDto = CreateInvoiceDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'MongoDB ObjectId of patient' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateInvoiceDto.prototype, "patientId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'MongoDB ObjectId of doctor' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateInvoiceDto.prototype, "doctorId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [invoice_item_dto_1.InvoiceItemDto], description: 'At least one item required' }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => invoice_item_dto_1.InvoiceItemDto),
    __metadata("design:type", Array)
], CreateInvoiceDto.prototype, "items", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ minimum: 0 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateInvoiceDto.prototype, "discount", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: enums_1.DiscountType }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(enums_1.DiscountType),
    __metadata("design:type", String)
], CreateInvoiceDto.prototype, "discountType", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ minimum: 0 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateInvoiceDto.prototype, "paid", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'cash', description: 'cash | card | vodafone_cash | instapay' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateInvoiceDto.prototype, "paymentMethod", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'EGP' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateInvoiceDto.prototype, "currency", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '2025-04-15' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateInvoiceDto.prototype, "dueDate", void 0);
//# sourceMappingURL=create-invoice.dto.js.map