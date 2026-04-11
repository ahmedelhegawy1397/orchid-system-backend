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
exports.ReportsService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const objectid_1 = require("../../common/utils/objectid");
const date_range_util_1 = require("../../common/utils/date-range.util");
const shift_date_util_1 = require("../../common/utils/shift-date.util");
const invoice_payment_schema_1 = require("../invoices/schemas/invoice-payment.schema");
const expense_schema_1 = require("../expenses/schemas/expense.schema");
const invoice_schema_1 = require("../invoices/schemas/invoice.schema");
const enums_1 = require("../../enums");
const procedure_pricing_schema_1 = require("../procedure-pricing/schemas/procedure-pricing.schema");
const appointment_schema_1 = require("../appointments/schemas/appointment.schema");
const doctor_schema_1 = require("../doctors/schemas/doctor.schema");
const lab_record_schema_1 = require("../lab-management/schemas/lab-record.schema");
const reports_gateway_1 = require("./reports.gateway");
const PERIOD = {
    QUARTERLY: 'quarterly',
    WEEK: 'week',
    MONTH: 'month',
    SEMI_ANNUAL: 'semi_annual',
    YEAR: 'year',
};
function invoiceLineAmount(item) {
    if (item.total != null && !Number.isNaN(item.total))
        return item.total;
    const q = item.quantity ?? 1;
    const up = item.unitPrice ?? 0;
    return q * up;
}
let ReportsService = class ReportsService {
    constructor(invoicePaymentModel, expenseModel, invoiceModel, procedurePricingModel, appointmentModel, doctorModel, labRecordModel, configService, gateway) {
        this.invoicePaymentModel = invoicePaymentModel;
        this.expenseModel = expenseModel;
        this.invoiceModel = invoiceModel;
        this.procedurePricingModel = procedurePricingModel;
        this.appointmentModel = appointmentModel;
        this.doctorModel = doctorModel;
        this.labRecordModel = labRecordModel;
        this.configService = configService;
        this.gateway = gateway;
    }
    getWorkdayBounds(startDate, endDate) {
        const tz = this.configService.get('clinicTimezone') ?? 'Africa/Cairo';
        const startHour = this.configService.get('workdayStartHour') ?? 6;
        return (0, date_range_util_1.getWorkdayRangeFromDateRange)(startDate, endDate, tz, startHour);
    }
    resolveDateRange(query) {
        const tz = this.configService.get('clinicTimezone') ?? 'Africa/Cairo';
        const shiftStartHour = this.configService.get('workdayStartHour') ?? 6;
        const today = (0, shift_date_util_1.getCurrentShiftDate)(tz, shiftStartHour);
        let start = query.startDate;
        let end = query.endDate;
        if (query.period === PERIOD.QUARTERLY && !start && !end) {
            end = today;
            const d = new Date(end);
            d.setMonth(d.getMonth() - 3);
            start = start ?? d.toISOString().slice(0, 10);
            return { start, end };
        }
        if (query.period === PERIOD.MONTH && !end) {
            end = today;
            const d = new Date(end);
            d.setMonth(d.getMonth() - 1);
            start = start ?? d.toISOString().slice(0, 10);
            return { start, end };
        }
        if (query.period === PERIOD.WEEK && !end) {
            end = today;
            const d = new Date(end);
            d.setDate(d.getDate() - 7);
            start = start ?? d.toISOString().slice(0, 10);
            return { start, end };
        }
        if (query.period === PERIOD.SEMI_ANNUAL && !end) {
            end = today;
            const d = new Date(end);
            d.setMonth(d.getMonth() - 6);
            start = start ?? d.toISOString().slice(0, 10);
            return { start, end };
        }
        if (query.period === PERIOD.YEAR && !end) {
            end = today;
            const d = new Date(end);
            d.setMonth(0);
            d.setDate(1);
            start = start ?? d.toISOString().slice(0, 10);
            return { start, end };
        }
        if (!start || !end) {
            end = end ?? today;
            const d = new Date(end);
            d.setMonth(d.getMonth() - 1);
            start = start ?? d.toISOString().slice(0, 10);
        }
        return { start, end };
    }
    async getRevenueReport(query) {
        const { start, end } = this.resolveDateRange(query);
        const { start: dayStart, end: dayEnd } = this.getWorkdayBounds(start, end);
        const doctorIdFilter = query.doctorId ? { doctorId: (0, objectid_1.toObjectIdOrThrow)(query.doctorId, 'doctorId') } : {};
        const includeExpenses = !query.doctorId;
        const expensesQuery = includeExpenses
            ? this.expenseModel
                .find({
                $expr: {
                    $and: [
                        { $gte: [{ $substr: [{ $ifNull: ['$date', ''] }, 0, 10] }, start] },
                        { $lte: [{ $substr: [{ $ifNull: ['$date', ''] }, 0, 10] }, end] },
                    ],
                },
            })
                .lean()
            : Promise.resolve([]);
        const labFeesQuery = (async () => {
            const labFilter = {};
            if (query.doctorId) {
                labFilter.doctorId = (0, objectid_1.toObjectIdOrThrow)(query.doctorId, 'doctorId');
            }
            labFilter.date = { $gte: start, $lte: end };
            const labRecords = await this.labRecordModel.find(labFilter).select('price').lean();
            return labRecords.reduce((sum, record) => sum + (record.price || 0), 0);
        })();
        const [invoices, payments, expenses, doctors, appointmentsByDate, labFees] = await Promise.all([
            this.invoiceModel
                .find({ createdAt: { $gte: dayStart, $lt: dayEnd }, ...doctorIdFilter })
                .lean(),
            this.invoicePaymentModel
                .find({ paidDate: { $gte: start, $lte: end }, ...doctorIdFilter })
                .lean(),
            expensesQuery,
            this.doctorModel.find().select('_id clinicSharePercent doctorSharePercent').lean(),
            this.appointmentModel.aggregate([
                { $match: { date: { $gte: start, $lte: end }, ...doctorIdFilter } },
                { $group: { _id: '$date', count: { $sum: 1 } } },
            ]),
            labFeesQuery,
        ]);
        const totalSubtotal = invoices.reduce((sum, inv) => sum + (inv.subtotal ?? 0), 0);
        const totalRevenue = invoices.reduce((sum, inv) => sum + (inv.total ?? 0), 0);
        const totalCollected = payments.reduce((sum, p) => sum + p.amount, 0);
        const totalExpenses = includeExpenses ? expenses.reduce((sum, e) => sum + e.amount, 0) : 0;
        const pendingBalance = invoices.reduce((sum, inv) => sum + (inv.remaining ?? 0), 0);
        const collectedByPaymentMethod = {
            cash: 0,
            card: 0,
            vodafoneCash: 0,
            instapay: 0,
        };
        for (const p of payments) {
            if (p.method === enums_1.PaymentMethod.Cash)
                collectedByPaymentMethod.cash += p.amount;
            else if (p.method === enums_1.PaymentMethod.Card)
                collectedByPaymentMethod.card += p.amount;
            else if (p.method === enums_1.PaymentMethod.VodafoneCash)
                collectedByPaymentMethod.vodafoneCash += p.amount;
            else
                collectedByPaymentMethod.instapay += p.amount;
        }
        let doctorShare = 0;
        let clinicShare = 0;
        if (query.doctorId) {
            const doctor = doctors.find(d => d._id.toString() === query.doctorId);
            if (doctor) {
                const doctorPercent = doctor.doctorSharePercent ?? 80;
                const clinicPercent = doctor.clinicSharePercent ?? 20;
                const doctorShareBeforeLabFees = (totalCollected * doctorPercent) / 100;
                clinicShare = (totalCollected * clinicPercent) / 100;
                doctorShare = doctorShareBeforeLabFees - labFees;
            }
        }
        else if (totalCollected > 0) {
            const doctorMap = new Map(doctors.map(d => [d._id.toString(), d]));
            const paymentsByDoctor = new Map();
            for (const payment of payments) {
                const docId = payment.doctorId?.toString();
                if (docId) {
                    paymentsByDoctor.set(docId, (paymentsByDoctor.get(docId) || 0) + payment.amount);
                }
            }
            let totalDoctorShareBeforeLabFees = 0;
            for (const [docId, collected] of paymentsByDoctor.entries()) {
                const doctor = doctorMap.get(docId);
                if (doctor) {
                    const doctorPercent = doctor.doctorSharePercent ?? 80;
                    const clinicPercent = doctor.clinicSharePercent ?? 20;
                    totalDoctorShareBeforeLabFees += (collected * doctorPercent) / 100;
                    clinicShare += (collected * clinicPercent) / 100;
                }
            }
            doctorShare = totalDoctorShareBeforeLabFees - labFees;
        }
        const procedureBreakdown = {};
        for (const inv of invoices) {
            for (const item of inv.items ?? []) {
                const lineTotal = invoiceLineAmount(item);
                const key = item.procedure;
                if (!procedureBreakdown[key])
                    procedureBreakdown[key] = { count: 0, totalAmount: 0 };
                procedureBreakdown[key].count += item.quantity ?? 1;
                procedureBreakdown[key].totalAmount += lineTotal;
            }
        }
        const expenseBreakdown = includeExpenses
            ? expenses.reduce((acc, e) => {
                if (!acc[e.category])
                    acc[e.category] = { count: 0, totalAmount: 0 };
                acc[e.category].count += 1;
                acc[e.category].totalAmount += e.amount;
                return acc;
            }, {})
            : {};
        const dailyRev = {};
        payments.forEach((p) => (dailyRev[p.paidDate] = (dailyRev[p.paidDate] ?? 0) + p.amount));
        const dailyExp = {};
        if (includeExpenses) {
            expenses.forEach((e) => {
                const dateKey = typeof e.date === 'string' ? e.date.slice(0, 10) : '';
                if (dateKey)
                    dailyExp[dateKey] = (dailyExp[dateKey] ?? 0) + e.amount;
            });
        }
        const dailyApp = {};
        appointmentsByDate.forEach((a) => (dailyApp[a._id] = a.count));
        const allDates = new Set([...Object.keys(dailyRev), ...Object.keys(dailyExp), ...Object.keys(dailyApp)]);
        const dailyBreakdown = [...allDates]
            .filter((d) => d >= start && d <= end)
            .sort()
            .map((date) => ({
            date,
            revenue: dailyRev[date] ?? 0,
            expenses: dailyExp[date] ?? 0,
            appointmentCount: dailyApp[date] ?? 0,
        }));
        const result = {
            totalSubtotal,
            totalRevenue,
            totalAfterDiscount: totalRevenue,
            totalCollected,
            totalExpenses,
            netRevenue: totalCollected - totalExpenses,
            labFees,
            pendingBalance,
            doctorShare,
            clinicShare,
            collectedByPaymentMethod,
            procedureBreakdown: Object.entries(procedureBreakdown).map(([procedure, data]) => ({ procedure, ...data })),
            expenseBreakdown: Object.entries(expenseBreakdown).map(([category, data]) => ({ category, ...data })),
            expenses: expenses,
            dailyBreakdown,
        };
        this.gateway.emitReportGenerated('revenue', query);
        return result;
    }
    async getPatientVisitAnalysis(query) {
        const { start, end } = this.resolveDateRange(query);
        const doctorIdFilter = query.doctorId
            ? { doctorId: (0, objectid_1.toObjectIdOrThrow)(query.doctorId, 'doctorId') }
            : {};
        const completedStatuses = [
            enums_1.AppointmentStatus.Completed,
            enums_1.AppointmentStatus.InProgress
        ];
        const patientVisits = await this.appointmentModel.aggregate([
            {
                $match: {
                    status: { $in: completedStatuses },
                    ...doctorIdFilter
                }
            },
            {
                $group: {
                    _id: '$patientId',
                    totalAppointments: { $sum: 1 },
                    lastAppointmentDate: { $max: '$date' }
                }
            },
            {
                $project: {
                    patientId: '$_id',
                    totalAppointments: 1,
                    lastAppointmentDate: 1,
                    isInSelectedRange: {
                        $and: [
                            { $gte: ['$lastAppointmentDate', start] },
                            { $lte: ['$lastAppointmentDate', end] }
                        ]
                    },
                    isBeforeSelectedRange: {
                        $lt: ['$lastAppointmentDate', start]
                    }
                }
            },
            {
                $group: {
                    _id: null,
                    newPatients: {
                        $sum: {
                            $cond: [
                                {
                                    $and: [
                                        { $eq: ['$totalAppointments', 1] },
                                        { $eq: ['$isInSelectedRange', true] }
                                    ]
                                },
                                1,
                                0
                            ]
                        }
                    },
                    returningPatients: {
                        $sum: {
                            $cond: [
                                {
                                    $and: [
                                        { $gt: ['$totalAppointments', 1] },
                                        { $eq: ['$isInSelectedRange', true] }
                                    ]
                                },
                                1,
                                0
                            ]
                        }
                    },
                    oneTimePatients: {
                        $sum: {
                            $cond: [
                                {
                                    $and: [
                                        { $eq: ['$totalAppointments', 1] },
                                        { $eq: ['$isBeforeSelectedRange', true] }
                                    ]
                                },
                                1,
                                0
                            ]
                        }
                    },
                    notReturningPatients: {
                        $sum: {
                            $cond: [
                                {
                                    $and: [
                                        { $gt: ['$totalAppointments', 1] },
                                        { $eq: ['$isBeforeSelectedRange', true] }
                                    ]
                                },
                                1,
                                0
                            ]
                        }
                    }
                }
            }
        ]);
        const result = patientVisits[0] || {
            newPatients: 0,
            returningPatients: 0,
            oneTimePatients: 0,
            notReturningPatients: 0
        };
        const analysisResult = {
            newPatients: result.newPatients,
            returningPatients: result.returningPatients,
            oneTimePatients: result.oneTimePatients,
            notReturningPatients: result.notReturningPatients,
            totalPatientsInRange: result.newPatients + result.returningPatients,
            totalPatientsNotReturning: result.oneTimePatients + result.notReturningPatients,
            dateRange: { start, end }
        };
        this.gateway.emitReportGenerated('patient-visit-analysis', query);
        return analysisResult;
    }
};
exports.ReportsService = ReportsService;
exports.ReportsService = ReportsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(invoice_payment_schema_1.InvoicePayment.name)),
    __param(1, (0, mongoose_1.InjectModel)(expense_schema_1.Expense.name)),
    __param(2, (0, mongoose_1.InjectModel)(invoice_schema_1.Invoice.name)),
    __param(3, (0, mongoose_1.InjectModel)(procedure_pricing_schema_1.ProcedurePricing.name)),
    __param(4, (0, mongoose_1.InjectModel)(appointment_schema_1.Appointment.name)),
    __param(5, (0, mongoose_1.InjectModel)(doctor_schema_1.Doctor.name)),
    __param(6, (0, mongoose_1.InjectModel)(lab_record_schema_1.LabRecord.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        config_1.ConfigService,
        reports_gateway_1.ReportsGateway])
], ReportsService);
//# sourceMappingURL=reports.service.js.map