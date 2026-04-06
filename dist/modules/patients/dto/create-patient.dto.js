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
exports.CreatePatientDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const enums_1 = require("../../../enums");
class CreatePatientDto {
}
exports.CreatePatientDto = CreatePatientDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Ahmed Mohamed' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePatientDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'أحمد محمد', description: 'Arabic name' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePatientDto.prototype, "nameAr", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '+201001234567' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePatientDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: enums_1.PatientGender, example: enums_1.PatientGender.Male }),
    (0, class_validator_1.IsEnum)(enums_1.PatientGender),
    __metadata("design:type", String)
], CreatePatientDto.prototype, "gender", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ minimum: 0, maximum: 150 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(150),
    __metadata("design:type", Number)
], CreatePatientDto.prototype, "age", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '1990-01-15' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePatientDto.prototype, "dateOfBirth", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePatientDto.prototype, "notes", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'MongoDB ObjectId of assigned doctor' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePatientDto.prototype, "assignedDoctorId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreatePatientDto.prototype, "hasCompletedOnboarding", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePatientDto.prototype, "job", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePatientDto.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'e.g. { diabetes: true, allergies: false }' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], CreatePatientDto.prototype, "medicalConditions", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'e.g. { takingMedication: "yes", smoking: "no" }' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], CreatePatientDto.prototype, "questionnaire", void 0);
//# sourceMappingURL=create-patient.dto.js.map