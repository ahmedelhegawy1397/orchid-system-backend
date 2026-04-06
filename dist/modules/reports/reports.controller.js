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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const reports_service_1 = require("./reports.service");
const revenue_report_query_dto_1 = require("./dto/revenue-report-query.dto");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../../common/guards/roles.guard");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
const enums_1 = require("../../enums");
let ReportsController = class ReportsController {
    constructor(reportsService) {
        this.reportsService = reportsService;
    }
    getRevenue(query) {
        return this.reportsService.getRevenueReport(query);
    }
    getPatientVisitAnalysis(query) {
        return this.reportsService.getPatientVisitAnalysis(query);
    }
};
exports.ReportsController = ReportsController;
__decorate([
    (0, common_1.Get)('revenue'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get revenue report (Owner/Admin only)',
        description: 'totalSubtotal = sum of invoice subtotals (pre-discount). totalRevenue / totalAfterDiscount = sum of invoice totals after discount. procedureBreakdown uses line amounts (item.total or unitPrice × quantity).',
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [revenue_report_query_dto_1.RevenueReportQueryDto]),
    __metadata("design:returntype", void 0)
], ReportsController.prototype, "getRevenue", null);
__decorate([
    (0, common_1.Get)('patient-visit-analysis'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get patient visit analysis (Owner/Admin only)',
        description: 'Analyzes patient visits and categorizes them into: newPatients (first visit in range), returningPatients (2+ visits, last in range), oneTimePatients (1 visit before range), notReturningPatients (2+ visits, last before range). Only counts completed/in-progress appointments.',
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [revenue_report_query_dto_1.RevenueReportQueryDto]),
    __metadata("design:returntype", void 0)
], ReportsController.prototype, "getPatientVisitAnalysis", null);
exports.ReportsController = ReportsController = __decorate([
    (0, swagger_1.ApiTags)('Reports'),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.Controller)('api/reports'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.Owner, enums_1.UserRole.Admin),
    __metadata("design:paramtypes", [reports_service_1.ReportsService])
], ReportsController);
//# sourceMappingURL=reports.controller.js.map