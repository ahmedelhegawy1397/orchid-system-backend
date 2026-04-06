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
exports.CreateWaitingListItemDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const enums_1 = require("../../../enums");
class CreateWaitingListItemDto {
}
exports.CreateWaitingListItemDto = CreateWaitingListItemDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'MongoDB ObjectId of patient' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateWaitingListItemDto.prototype, "patientId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'MongoDB ObjectId of doctor' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateWaitingListItemDto.prototype, "doctorId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2025-03-20' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateWaitingListItemDto.prototype, "preferredDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '09:00-12:00' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateWaitingListItemDto.prototype, "preferredTimeRange", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: enums_1.WaitingUrgency }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(enums_1.WaitingUrgency),
    __metadata("design:type", String)
], CreateWaitingListItemDto.prototype, "urgency", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateWaitingListItemDto.prototype, "notes", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ minimum: 10, maximum: 240 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(10),
    (0, class_validator_1.Max)(240),
    __metadata("design:type", Number)
], CreateWaitingListItemDto.prototype, "duration", void 0);
//# sourceMappingURL=create-waiting-list-item.dto.js.map