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
exports.UpdateInvoiceDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const invoice_item_dto_1 = require("./invoice-item.dto");
const enums_1 = require("../../../enums");
class UpdateInvoiceDto {
}
exports.UpdateInvoiceDto = UpdateInvoiceDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: [invoice_item_dto_1.InvoiceItemDto] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => invoice_item_dto_1.InvoiceItemDto),
    __metadata("design:type", Array)
], UpdateInvoiceDto.prototype, "items", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Discount amount', example: 50 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], UpdateInvoiceDto.prototype, "discount", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: enums_1.DiscountType, description: 'Discount type', example: enums_1.DiscountType.Fixed }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(enums_1.DiscountType),
    __metadata("design:type", String)
], UpdateInvoiceDto.prototype, "discountType", void 0);
//# sourceMappingURL=update-invoice.dto.js.map