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
exports.DashboardService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const invoice_schema_1 = require("../invoices/schemas/invoice.schema");
const invoice_payment_schema_1 = require("../invoices/schemas/invoice-payment.schema");
const expense_schema_1 = require("../expenses/schemas/expense.schema");
const appointment_schema_1 = require("../appointments/schemas/appointment.schema");
const doctor_schema_1 = require("../doctors/schemas/doctor.schema");
const enums_1 = require("../../enums");
let DashboardService = class DashboardService {
    constructor(invoiceModel, invoicePaymentModel, expenseModel, appointmentModel, doctorModel) {
        this.invoiceModel = invoiceModel;
        this.invoicePaymentModel = invoicePaymentModel;
        this.expenseModel = expenseModel;
        this.appointmentModel = appointmentModel;
        this.doctorModel = doctorModel;
    }
    async getDashboardStats(currentUser, filters) {
        const { date, doctorId } = filters;
        const targetDate = date;
        let filterDoctorId;
        if (doctorId) {
            filterDoctorId = new mongoose_2.Types.ObjectId(doctorId);
            if (currentUser && currentUser.role === enums_1.UserRole.Doctor) {
                if (!currentUser.doctorId || currentUser.doctorId.toString() !== doctorId) {
                    throw new common_1.ForbiddenException('You can only view your own dashboard data');
                }
            }
        }
        else if (currentUser) {
            if (currentUser.role === enums_1.UserRole.Doctor) {
                if (!currentUser.doctorId) {
                    throw new common_1.ForbiddenException('Doctor account must be linked to a doctor profile');
                }
                filterDoctorId = currentUser.doctorId;
            }
        }
        const appointmentQuery = { date: targetDate };
        if (filterDoctorId) {
            appointmentQuery.doctorId = filterDoctorId;
        }
        const revenueQuery = { paidDate: targetDate };
        if (filterDoctorId) {
            revenueQuery.doctorId = filterDoctorId;
        }
        const [appointments, revenue, expenses] = await Promise.all([
            this.getAppointmentsStats(appointmentQuery),
            this.getRevenueStats(revenueQuery),
            this.getExpensesStats(targetDate, currentUser),
        ]);
        return {
            date: targetDate,
            doctorId: filterDoctorId?.toString() || null,
            appointments,
            revenue,
            expenses,
        };
    }
    async getAppointmentsStats(query) {
        const [total, byStatus] = await Promise.all([
            this.appointmentModel.countDocuments(query),
            this.appointmentModel.aggregate([
                { $match: query },
                {
                    $group: {
                        _id: '$status',
                        count: { $sum: 1 },
                    },
                },
            ]),
        ]);
        const statusCounts = {
            scheduled: 0,
            completed: 0,
            cancelled: 0,
            noShow: 0,
            inProgress: 0,
        };
        byStatus.forEach((item) => {
            const status = item._id;
            if (status === enums_1.AppointmentStatus.Scheduled)
                statusCounts.scheduled = item.count;
            else if (status === enums_1.AppointmentStatus.Completed)
                statusCounts.completed = item.count;
            else if (status === enums_1.AppointmentStatus.Cancelled)
                statusCounts.cancelled = item.count;
            else if (status === enums_1.AppointmentStatus.NoShow)
                statusCounts.noShow = item.count;
            else if (status === enums_1.AppointmentStatus.InProgress)
                statusCounts.inProgress = item.count;
        });
        return {
            total,
            byStatus: statusCounts,
        };
    }
    async getRevenueStats(query) {
        const result = await this.invoicePaymentModel.aggregate([
            { $match: query },
            {
                $group: {
                    _id: null,
                    totalPaid: { $sum: '$amount' },
                    paymentCount: { $sum: 1 },
                },
            },
        ]);
        if (result.length === 0) {
            return {
                totalPaid: 0,
                paymentCount: 0,
            };
        }
        return {
            totalPaid: result[0].totalPaid,
            paymentCount: result[0].paymentCount,
        };
    }
    async getExpensesStats(date, currentUser) {
        console.log('getExpensesStats - currentUser:', currentUser ? { email: currentUser.email, role: currentUser.role } : 'undefined');
        console.log('getExpensesStats - date:', date);
        if (!currentUser || (currentUser.role !== enums_1.UserRole.Owner && currentUser.role !== enums_1.UserRole.Assistant)) {
            console.log('getExpensesStats - Access denied: user is not owner or assistant');
            return {
                totalExpenses: 0,
                expenseCount: 0,
                byCategory: [],
            };
        }
        const query = { date };
        const [total, byCategory] = await Promise.all([
            this.expenseModel.aggregate([
                { $match: query },
                {
                    $group: {
                        _id: null,
                        totalExpenses: { $sum: '$amount' },
                        expenseCount: { $sum: 1 },
                    },
                },
            ]),
            this.expenseModel.aggregate([
                { $match: query },
                {
                    $group: {
                        _id: '$category',
                        categoryAr: { $first: '$categoryAr' },
                        total: { $sum: '$amount' },
                        count: { $sum: 1 },
                    },
                },
                { $sort: { total: -1 } },
            ]),
        ]);
        console.log('getExpensesStats - total result:', total);
        console.log('getExpensesStats - byCategory result:', byCategory);
        return {
            totalExpenses: total.length > 0 ? total[0].totalExpenses : 0,
            expenseCount: total.length > 0 ? total[0].expenseCount : 0,
            byCategory: byCategory.map((item) => ({
                category: item._id,
                categoryAr: item.categoryAr,
                total: item.total,
                count: item.count,
            })),
        };
    }
    async getAvailableDoctors() {
        const doctors = await this.doctorModel.find().select('name nameAr specialty specialtyAr color').sort({ name: 1 }).lean();
        return doctors.map((doc) => ({
            _id: doc._id,
            name: doc.name,
            nameAr: doc.nameAr,
            specialty: doc.specialty,
            specialtyAr: doc.specialtyAr,
            color: doc.color,
        }));
    }
};
exports.DashboardService = DashboardService;
exports.DashboardService = DashboardService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(invoice_schema_1.Invoice.name)),
    __param(1, (0, mongoose_1.InjectModel)(invoice_payment_schema_1.InvoicePayment.name)),
    __param(2, (0, mongoose_1.InjectModel)(expense_schema_1.Expense.name)),
    __param(3, (0, mongoose_1.InjectModel)(appointment_schema_1.Appointment.name)),
    __param(4, (0, mongoose_1.InjectModel)(doctor_schema_1.Doctor.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], DashboardService);
//# sourceMappingURL=dashboard.service.js.map