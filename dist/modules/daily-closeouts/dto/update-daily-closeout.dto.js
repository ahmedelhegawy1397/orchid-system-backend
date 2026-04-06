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
exports.UpdateDailyCloseoutDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class UpdateDailyCloseoutDto {
}
exports.UpdateDailyCloseoutDto = UpdateDailyCloseoutDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Cash collected amount' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], UpdateDailyCloseoutDto.prototype, "cashCollected", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Card collected amount' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], UpdateDailyCloseoutDto.prototype, "cardCollected", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Transfer collected amount' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], UpdateDailyCloseoutDto.prototype, "transferCollected", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Vodafone Cash collected amount' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], UpdateDailyCloseoutDto.prototype, "vodafoneCashCollected", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Total collected amount' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], UpdateDailyCloseoutDto.prototype, "totalCollected", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Revenue from invoices created that day' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], UpdateDailyCloseoutDto.prototype, "revenue", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Total expenses amount' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], UpdateDailyCloseoutDto.prototype, "totalExpenses", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Final balance (totalCollected - totalExpenses)' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateDailyCloseoutDto.prototype, "finalBalance", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'If true, re-fetch expenses for this date and update expense snapshot' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UpdateDailyCloseoutDto.prototype, "refreshExpenseSnapshot", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'If true, re-fetch payments for this date and update payment snapshot' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UpdateDailyCloseoutDto.prototype, "refreshPaymentSnapshot", void 0);
//# sourceMappingURL=update-daily-closeout.dto.js.map