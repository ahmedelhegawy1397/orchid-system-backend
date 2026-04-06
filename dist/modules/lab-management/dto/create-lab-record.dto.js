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
exports.CreateLabRecordDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateLabRecordDto {
}
exports.CreateLabRecordDto = CreateLabRecordDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'MongoDB ObjectId of doctor' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateLabRecordDto.prototype, "doctorId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'MongoDB ObjectId of patient' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateLabRecordDto.prototype, "patientId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Array of tooth numbers', example: [11, 12, 13] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsNumber)({}, { each: true }),
    __metadata("design:type", Array)
], CreateLabRecordDto.prototype, "teethNumbers", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Number of teeth', example: 3 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateLabRecordDto.prototype, "toothCount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Procedure name', example: 'Crown' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateLabRecordDto.prototype, "procedure", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Price', example: 1500, minimum: 0 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateLabRecordDto.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Additional notes' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateLabRecordDto.prototype, "notes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Date in YYYY-MM-DD format', example: '2026-04-03' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateLabRecordDto.prototype, "date", void 0);
//# sourceMappingURL=create-lab-record.dto.js.map