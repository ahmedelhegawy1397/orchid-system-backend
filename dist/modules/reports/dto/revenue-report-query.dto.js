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
exports.RevenueReportQueryDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class RevenueReportQueryDto {
}
exports.RevenueReportQueryDto = RevenueReportQueryDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Period preset: quarterly, week, month, semi_annual, year. Ignored if startDate/endDate provided. Response includes totalSubtotal (pre-discount) and totalRevenue / totalAfterDiscount (post-discount).',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RevenueReportQueryDto.prototype, "period", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Start date (YYYY-MM-DD). Omit to use period or default (last month).' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RevenueReportQueryDto.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'End date (YYYY-MM-DD). Omit to use period or default.' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RevenueReportQueryDto.prototype, "endDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Filter by doctor ID. Omit to include all doctors.',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RevenueReportQueryDto.prototype, "doctorId", void 0);
//# sourceMappingURL=revenue-report-query.dto.js.map