import { ConfigService } from '@nestjs/config';
import { Model, Types } from 'mongoose';
import { Invoice } from './schemas/invoice.schema';
import { InvoicePayment } from './schemas/invoice-payment.schema';
import { Expense } from '../expenses/schemas/expense.schema';
import { IdempotentRequest } from './schemas/idempotent-request.schema';
import { InvoiceDuplicateCheck } from './schemas/invoice-duplicate-check.schema';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { AccountingGateway } from '../accounting/accounting.gateway';
import { DashboardGateway } from '../dashboard/dashboard.gateway';
import { DailyCloseoutsGateway } from '../daily-closeouts/daily-closeouts.gateway';
export declare class InvoicesService {
    private invoiceModel;
    private paymentModel;
    private expenseModel;
    private idempotentRequestModel;
    private duplicateCheckModel;
    private configService;
    private accountingGateway;
    private dashboardGateway;
    private dailyCloseoutsGateway;
    private readonly logger;
    constructor(invoiceModel: Model<Invoice>, paymentModel: Model<InvoicePayment>, expenseModel: Model<Expense>, idempotentRequestModel: Model<IdempotentRequest>, duplicateCheckModel: Model<InvoiceDuplicateCheck>, configService: ConfigService, accountingGateway: AccountingGateway, dashboardGateway: DashboardGateway, dailyCloseoutsGateway: DailyCloseoutsGateway);
    findAll(query: {
        patientId?: string;
        doctorId?: string;
        status?: string;
        includePayments?: boolean;
        startDate?: string;
        endDate?: string;
        page?: number;
        limit?: number;
    }, doctorIdFilter?: string): Promise<Record<string, unknown>>;
    findOne(id: string, doctorIdFilter?: string): Promise<Record<string, unknown>>;
    create(body: CreateInvoiceDto, userId?: string, idempotencyKey?: string, requestId?: string): Promise<import("mongoose").FlattenMaps<Record<string, unknown>> | (import("mongoose").FlattenMaps<Invoice> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
    private generateIdempotencyKey;
    private generateContentHash;
    update(id: string, body: UpdateInvoiceDto, doctorIdFilter?: string): Promise<(import("mongoose").FlattenMaps<Invoice> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
    remove(id: string, doctorIdFilter?: string): Promise<void>;
    listPayments(invoiceId: string, doctorIdFilter?: string): Promise<(import("mongoose").FlattenMaps<InvoicePayment> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    addPayment(invoiceId: string, amount: number, method: string, doctorIdFilter?: string): Promise<(import("mongoose").FlattenMaps<InvoicePayment> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
    deletePayment(invoiceId: string, paymentId: string, doctorIdFilter?: string): Promise<void>;
    updatePayment(invoiceId: string, paymentId: string, newAmount: number, newMethod: string, doctorIdFilter?: string): Promise<InvoicePayment & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }>;
}
