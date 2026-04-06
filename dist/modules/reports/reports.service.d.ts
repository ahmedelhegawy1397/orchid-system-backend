import { ConfigService } from '@nestjs/config';
import { Model } from 'mongoose';
import { InvoicePayment } from '../invoices/schemas/invoice-payment.schema';
import { Expense } from '../expenses/schemas/expense.schema';
import { Invoice } from '../invoices/schemas/invoice.schema';
import { ProcedurePricing } from '../procedure-pricing/schemas/procedure-pricing.schema';
import { Appointment } from '../appointments/schemas/appointment.schema';
import { Doctor } from '../doctors/schemas/doctor.schema';
import { LabRecord } from '../lab-management/schemas/lab-record.schema';
import { ReportsGateway } from './reports.gateway';
export type RevenueReportQuery = {
    startDate?: string;
    endDate?: string;
    doctorId?: string;
    period?: string;
};
type BreakdownItem = {
    count: number;
    totalAmount: number;
};
export type RevenueReportResult = {
    totalSubtotal: number;
    totalRevenue: number;
    totalAfterDiscount: number;
    totalCollected: number;
    totalExpenses: number;
    netRevenue: number;
    labFees: number;
    pendingBalance: number;
    doctorShare: number;
    clinicShare: number;
    collectedByPaymentMethod: {
        cash: number;
        card: number;
        vodafoneCash: number;
        instapay: number;
    };
    procedureBreakdown: Array<BreakdownItem & {
        procedure: string;
    }>;
    expenseBreakdown: Array<BreakdownItem & {
        category: string;
    }>;
    expenses: Array<Record<string, unknown>>;
    dailyBreakdown: Array<{
        date: string;
        revenue: number;
        expenses: number;
        appointmentCount: number;
    }>;
};
export type PatientVisitAnalysisResult = {
    newPatients: number;
    returningPatients: number;
    oneTimePatients: number;
    notReturningPatients: number;
    totalPatientsInRange: number;
    totalPatientsNotReturning: number;
    dateRange: {
        start: string;
        end: string;
    };
};
export declare class ReportsService {
    private invoicePaymentModel;
    private expenseModel;
    private invoiceModel;
    private procedurePricingModel;
    private appointmentModel;
    private doctorModel;
    private labRecordModel;
    private configService;
    private readonly gateway;
    constructor(invoicePaymentModel: Model<InvoicePayment>, expenseModel: Model<Expense>, invoiceModel: Model<Invoice>, procedurePricingModel: Model<ProcedurePricing>, appointmentModel: Model<Appointment>, doctorModel: Model<Doctor>, labRecordModel: Model<LabRecord>, configService: ConfigService, gateway: ReportsGateway);
    private getWorkdayBounds;
    private resolveDateRange;
    getRevenueReport(query: RevenueReportQuery): Promise<RevenueReportResult>;
    getPatientVisitAnalysis(query: RevenueReportQuery): Promise<PatientVisitAnalysisResult>;
}
export {};
