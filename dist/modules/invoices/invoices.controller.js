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
exports.InvoicesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const invoices_service_1 = require("./invoices.service");
const create_invoice_dto_1 = require("./dto/create-invoice.dto");
const update_invoice_dto_1 = require("./dto/update-invoice.dto");
const add_payment_dto_1 = require("./dto/add-payment.dto");
const invoice_filter_query_dto_1 = require("./dto/invoice-filter-query.dto");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../../common/guards/roles.guard");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
const current_user_decorator_1 = require("../../common/decorators/current-user.decorator");
const idempotency_key_decorator_1 = require("../../common/decorators/idempotency-key.decorator");
const enums_1 = require("../../enums");
let InvoicesController = class InvoicesController {
    constructor(invoicesService) {
        this.invoicesService = invoicesService;
    }
    findAll(query, user) {
        const doctorIdFilter = user?.role === enums_1.UserRole.Doctor ? user?.doctorId : undefined;
        return this.invoicesService.findAll(query, doctorIdFilter);
    }
    async create(dto, user, idempotencyKey, req) {
        if (user?.role === enums_1.UserRole.Doctor && user?.doctorId) {
            if (dto.doctorId && dto.doctorId !== user.doctorId) {
                throw new common_1.ForbiddenException('Doctors can only create invoices for themselves');
            }
            dto = { ...dto, doctorId: user.doctorId };
        }
        const requestId = req?.requestId;
        return this.invoicesService.create(dto, user?.id, idempotencyKey, requestId);
    }
    update(id, dto, user) {
        const doctorIdFilter = user?.role === enums_1.UserRole.Doctor ? user?.doctorId : undefined;
        return this.invoicesService.update(id, dto, doctorIdFilter);
    }
    async remove(id, user) {
        const doctorIdFilter = user?.role === enums_1.UserRole.Doctor ? user?.doctorId : undefined;
        await this.invoicesService.remove(id, doctorIdFilter);
    }
    listPayments(id, user) {
        const doctorIdFilter = user?.role === enums_1.UserRole.Doctor ? user?.doctorId : undefined;
        return this.invoicesService.listPayments(id, doctorIdFilter);
    }
    addPayment(id, dto, user) {
        const doctorIdFilter = user?.role === enums_1.UserRole.Doctor ? user?.doctorId : undefined;
        return this.invoicesService.addPayment(id, dto.amount, dto.method ?? 'cash', doctorIdFilter);
    }
    async deletePayment(invoiceId, paymentId, user) {
        const doctorIdFilter = user?.role === enums_1.UserRole.Doctor ? user?.doctorId : undefined;
        await this.invoicesService.deletePayment(invoiceId, paymentId, doctorIdFilter);
    }
    updatePayment(invoiceId, paymentId, dto, user) {
        const doctorIdFilter = user?.role === enums_1.UserRole.Doctor ? user?.doctorId : undefined;
        return this.invoicesService.updatePayment(invoiceId, paymentId, dto.amount, dto.method ?? 'cash', doctorIdFilter);
    }
};
exports.InvoicesController = InvoicesController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'List invoices with optional filters' }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [invoice_filter_query_dto_1.InvoiceFilterQueryDto, Object]),
    __metadata("design:returntype", void 0)
], InvoicesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create an invoice' }),
    (0, swagger_1.ApiHeader)({ name: 'X-Idempotency-Key', required: false, description: 'Optional idempotency key to prevent duplicate invoice creation' }),
    (0, swagger_1.ApiBody)({ type: create_invoice_dto_1.CreateInvoiceDto }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __param(2, (0, idempotency_key_decorator_1.IdempotencyKey)()),
    __param(3, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_invoice_dto_1.CreateInvoiceDto, Object, String, Object]),
    __metadata("design:returntype", Promise)
], InvoicesController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update invoice by ID' }),
    (0, swagger_1.ApiBody)({ type: update_invoice_dto_1.UpdateInvoiceDto }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_invoice_dto_1.UpdateInvoiceDto, Object]),
    __metadata("design:returntype", void 0)
], InvoicesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete invoice by ID' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], InvoicesController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)(':id/payments'),
    (0, swagger_1.ApiOperation)({ summary: 'List payments for invoice' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], InvoicesController.prototype, "listPayments", null);
__decorate([
    (0, common_1.Post)(':id/payments'),
    (0, swagger_1.ApiOperation)({ summary: 'Add payment to invoice' }),
    (0, swagger_1.ApiBody)({ type: add_payment_dto_1.AddPaymentDto }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, add_payment_dto_1.AddPaymentDto, Object]),
    __metadata("design:returntype", void 0)
], InvoicesController.prototype, "addPayment", null);
__decorate([
    (0, common_1.Delete)(':invoiceId/payments/:paymentId'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a payment from invoice' }),
    __param(0, (0, common_1.Param)('invoiceId')),
    __param(1, (0, common_1.Param)('paymentId')),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], InvoicesController.prototype, "deletePayment", null);
__decorate([
    (0, common_1.Patch)(':invoiceId/payments/:paymentId'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a payment amount or method' }),
    (0, swagger_1.ApiBody)({ type: add_payment_dto_1.AddPaymentDto }),
    __param(0, (0, common_1.Param)('invoiceId')),
    __param(1, (0, common_1.Param)('paymentId')),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, add_payment_dto_1.AddPaymentDto, Object]),
    __metadata("design:returntype", void 0)
], InvoicesController.prototype, "updatePayment", null);
exports.InvoicesController = InvoicesController = __decorate([
    (0, swagger_1.ApiTags)('Invoices'),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.Controller)('api/invoices'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.Owner, enums_1.UserRole.Doctor, enums_1.UserRole.Assistant, enums_1.UserRole.Admin),
    __metadata("design:paramtypes", [invoices_service_1.InvoicesService])
], InvoicesController);
//# sourceMappingURL=invoices.controller.js.map