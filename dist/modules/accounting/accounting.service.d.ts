import { ConfigService } from '@nestjs/config';
import { Model } from 'mongoose';
import { Invoice } from '../invoices/schemas/invoice.schema';
import { InvoicePayment } from '../invoices/schemas/invoice-payment.schema';
import { Expense } from '../expenses/schemas/expense.schema';
import { LabRecord } from '../lab-management/schemas/lab-record.schema';
import { Doctor } from '../doctors/schemas/doctor.schema';
export declare class AccountingService {
    private invoiceModel;
    private paymentModel;
    private expenseModel;
    private labRecordModel;
    private doctorModel;
    private configService;
    constructor(invoiceModel: Model<Invoice>, paymentModel: Model<InvoicePayment>, expenseModel: Model<Expense>, labRecordModel: Model<LabRecord>, doctorModel: Model<Doctor>, configService: ConfigService);
    getAccountingSummary(query: {
        startDate?: string;
        endDate?: string;
        doctorId?: string;
    }): Promise<{
        collected: number;
        collectedByPaymentMethod: {
            cash: number;
            vodafoneCash: number;
            instapay: number;
        };
        totalRevenue: number;
        expenses: number;
        afterExpenses: number;
        pendingBalance: number;
        pendingInvoices: number;
        totalInvoices: number;
        totalDiscounts: number;
        labFees: number;
        doctorShare: number;
        clinicShare: number;
        availableDays: number[];
    }>;
}
