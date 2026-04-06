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
exports.CreateToothProcedureDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const enums_1 = require("../../../enums");
class CreateToothProcedureDto {
}
exports.CreateToothProcedureDto = CreateToothProcedureDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'MongoDB ObjectId of doctor' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateToothProcedureDto.prototype, "doctorId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'FDI tooth number(s). Can be a single number, an array of up to 2 numbers, or omitted entirely.',
        oneOf: [
            { type: 'number', example: 16, minimum: 11, maximum: 48 },
            { type: 'array', items: { type: 'number', minimum: 11, maximum: 48 }, maxItems: 2, example: [16, 26] },
        ],
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateIf)((o) => o.toothNumber !== undefined && o.toothNumber !== null),
    __metadata("design:type", Object)
], CreateToothProcedureDto.prototype, "toothNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Composite Filling' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateToothProcedureDto.prototype, "procedure", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'حشوة كومبوزيت' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateToothProcedureDto.prototype, "procedureAr", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: enums_1.ProcedureCategory,
        description: 'Static procedure type: diagnostic, preventive, restorative, endodontic, prosthetic, surgical, orthodontic, cosmetic, other',
    }),
    (0, class_validator_1.IsEnum)(enums_1.ProcedureCategory),
    __metadata("design:type", String)
], CreateToothProcedureDto.prototype, "procedureType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 500, minimum: 0 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateToothProcedureDto.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 0, minimum: 0, description: 'Discount amount' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateToothProcedureDto.prototype, "discount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2025-03-15' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateToothProcedureDto.prototype, "date", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'MongoDB ObjectId of appointment' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateToothProcedureDto.prototype, "appointmentId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateToothProcedureDto.prototype, "notes", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'EGP' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateToothProcedureDto.prototype, "currency", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: true, description: 'Whether this is a pediatric (baby) tooth procedure' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateToothProcedureDto.prototype, "isPediatric", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: false, description: 'Whether this procedure is completed' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateToothProcedureDto.prototype, "isComplete", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: false, description: 'Whether this procedure requires lab work' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateToothProcedureDto.prototype, "isLab", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Lab Management ID reference' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateToothProcedureDto.prototype, "labManagementId", void 0);
//# sourceMappingURL=create-tooth-procedure.dto.js.map