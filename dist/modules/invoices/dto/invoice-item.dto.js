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
exports.InvoiceItemDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class InvoiceItemDto {
}
exports.InvoiceItemDto = InvoiceItemDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Consultation fee' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], InvoiceItemDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'رسوم الاستشارة' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], InvoiceItemDto.prototype, "descriptionAr", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Consultation' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], InvoiceItemDto.prototype, "procedure", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'استشارة' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], InvoiceItemDto.prototype, "procedureAr", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 1, minimum: 1, default: 1 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], InvoiceItemDto.prototype, "quantity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 200, minimum: 0 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], InvoiceItemDto.prototype, "unitPrice", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ minimum: 11, description: 'FDI tooth number' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(11),
    __metadata("design:type", Number)
], InvoiceItemDto.prototype, "toothNumber", void 0);
//# sourceMappingURL=invoice-item.dto.js.map