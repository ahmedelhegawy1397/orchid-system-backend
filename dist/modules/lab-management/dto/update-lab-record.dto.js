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
exports.UpdateLabRecordDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const enums_1 = require("../../../enums");
class UpdateLabRecordDto {
}
exports.UpdateLabRecordDto = UpdateLabRecordDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'MongoDB ObjectId of doctor' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateLabRecordDto.prototype, "doctorId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'MongoDB ObjectId of patient' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateLabRecordDto.prototype, "patientId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Array of tooth numbers', example: [11, 12, 13] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsNumber)({}, { each: true }),
    __metadata("design:type", Array)
], UpdateLabRecordDto.prototype, "teethNumbers", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Number of teeth', example: 3 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], UpdateLabRecordDto.prototype, "toothCount", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Procedure name', example: 'Crown' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateLabRecordDto.prototype, "procedure", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Price', example: 1500, minimum: 0 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], UpdateLabRecordDto.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Additional notes' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateLabRecordDto.prototype, "notes", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Date in YYYY-MM-DD format', example: '2026-04-03' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateLabRecordDto.prototype, "date", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Lab record status',
        enum: enums_1.LabRecordStatus,
        example: enums_1.LabRecordStatus.Pending
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(enums_1.LabRecordStatus),
    __metadata("design:type", String)
], UpdateLabRecordDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Completion date in YYYY-MM-DD format',
        example: '2026-04-05'
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Object)
], UpdateLabRecordDto.prototype, "completedAt", void 0);
//# sourceMappingURL=update-lab-record.dto.js.map