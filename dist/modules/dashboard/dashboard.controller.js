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
exports.DashboardController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const dashboard_service_1 = require("./dashboard.service");
const dashboard_filter_query_dto_1 = require("./dto/dashboard-filter-query.dto");
const current_user_decorator_1 = require("../../common/decorators/current-user.decorator");
const public_decorator_1 = require("../../common/decorators/public.decorator");
let DashboardController = class DashboardController {
    constructor(dashboardService) {
        this.dashboardService = dashboardService;
    }
    getDashboardStats(user, filters) {
        return this.dashboardService.getDashboardStats(user, filters);
    }
    getAvailableDoctors() {
        return this.dashboardService.getAvailableDoctors();
    }
};
exports.DashboardController = DashboardController;
__decorate([
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.Get)('stats'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get dashboard statistics',
        description: `
      Returns appointments, revenue, and expenses for a specific date with optional doctor filtering.
      
      Required Parameters:
      - date: YYYY-MM-DD format (required)
      
      Optional Parameters:
      - doctorId: Filter by specific doctor (optional)
      
      Note: Requires authentication. Expenses are only visible to Owner and Assistant roles.
    `,
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Dashboard statistics retrieved successfully',
        schema: {
            example: {
                date: '2024-03-30',
                doctorId: '507f1f77bcf86cd799439011',
                appointments: {
                    total: 12,
                    byStatus: {
                        scheduled: 5,
                        completed: 4,
                        cancelled: 2,
                        noShow: 1,
                        inProgress: 0,
                    },
                },
                revenue: {
                    totalPaid: 12000,
                    paymentCount: 8,
                },
                expenses: {
                    totalExpenses: 2500,
                    expenseCount: 5,
                    byCategory: [
                        {
                            category: 'lab',
                            categoryAr: 'معمل',
                            total: 1500,
                            count: 2,
                        },
                        {
                            category: 'materials',
                            categoryAr: 'مواد',
                            total: 800,
                            count: 2,
                        },
                    ],
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad Request - date is required' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dashboard_filter_query_dto_1.DashboardFilterQueryDto]),
    __metadata("design:returntype", void 0)
], DashboardController.prototype, "getDashboardStats", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('doctors'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get available doctors for filtering',
        description: `
      Returns list of all doctors (public endpoint).
    `,
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'List of available doctors',
        schema: {
            example: [
                {
                    _id: '507f1f77bcf86cd799439011',
                    name: 'Dr. Ahmed Hassan',
                    nameAr: 'د. أحمد حسن',
                    specialty: 'Orthodontist',
                    specialtyAr: 'تقويم أسنان',
                    color: 'emerald',
                },
                {
                    _id: '507f1f77bcf86cd799439012',
                    name: 'Dr. Sara Mohamed',
                    nameAr: 'د. سارة محمد',
                    specialty: 'General Dentist',
                    specialtyAr: 'طبيب أسنان عام',
                    color: 'orchid',
                },
            ],
        },
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DashboardController.prototype, "getAvailableDoctors", null);
exports.DashboardController = DashboardController = __decorate([
    (0, swagger_1.ApiTags)('Dashboard'),
    (0, common_1.Controller)('dashboard'),
    __metadata("design:paramtypes", [dashboard_service_1.DashboardService])
], DashboardController);
//# sourceMappingURL=dashboard.controller.js.map