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
exports.InvoiceFilterQueryDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class InvoiceFilterQueryDto {
}
exports.InvoiceFilterQueryDto = InvoiceFilterQueryDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Filter by patient ID.' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], InvoiceFilterQueryDto.prototype, "patientId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Filter by doctor ID. Omit to include invoices for all doctors (Owner/Admin only).',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], InvoiceFilterQueryDto.prototype, "doctorId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Filter by invoice status (e.g. paid, unpaid, partial).' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], InvoiceFilterQueryDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Start date for filter (YYYY-MM-DD). Invoices created on or after this date.' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], InvoiceFilterQueryDto.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'End date for filter (YYYY-MM-DD). Invoices created on or before this date. Use same as startDate for a single day.' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], InvoiceFilterQueryDto.prototype, "endDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Include payments in each invoice object.' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => (value === undefined ? undefined : value === 'true' || value === true)),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], InvoiceFilterQueryDto.prototype, "includePayments", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Page number for pagination (1-based).', default: 1 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => (value !== undefined && value !== '' ? parseInt(value, 10) : undefined)),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], InvoiceFilterQueryDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Items per page. Max 100.', default: 20 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => (value !== undefined && value !== '' ? parseInt(value, 10) : undefined)),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(100),
    __metadata("design:type", Number)
], InvoiceFilterQueryDto.prototype, "limit", void 0);
//# sourceMappingURL=invoice-filter-query.dto.js.map