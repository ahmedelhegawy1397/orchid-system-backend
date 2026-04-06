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
exports.CreateAppointmentDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const enums_1 = require("../../../enums");
class CreateAppointmentDto {
}
exports.CreateAppointmentDto = CreateAppointmentDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'MongoDB ObjectId of patient' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAppointmentDto.prototype, "patientId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'MongoDB ObjectId of doctor' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAppointmentDto.prototype, "doctorId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2025-03-15' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAppointmentDto.prototype, "date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '09:00', description: 'Start time HH:mm' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAppointmentDto.prototype, "startTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 30, minimum: 10, maximum: 240 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(10),
    (0, class_validator_1.Max)(240),
    __metadata("design:type", Number)
], CreateAppointmentDto.prototype, "duration", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: enums_1.BillingMode }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(enums_1.BillingMode),
    __metadata("design:type", String)
], CreateAppointmentDto.prototype, "billingMode", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Consultation' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAppointmentDto.prototype, "procedure", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'استشارة' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAppointmentDto.prototype, "procedureAr", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAppointmentDto.prototype, "notes", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ minimum: 0, default: 0 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateAppointmentDto.prototype, "sterilizationBuffer", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ minimum: 11, maximum: 48, description: 'FDI tooth number' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(11),
    (0, class_validator_1.Max)(48),
    __metadata("design:type", Number)
], CreateAppointmentDto.prototype, "toothNumber", void 0);
//# sourceMappingURL=create-appointment.dto.js.map