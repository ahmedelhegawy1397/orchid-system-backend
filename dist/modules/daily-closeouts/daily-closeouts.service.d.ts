import { ConfigService } from '@nestjs/config';
import { Model, Types } from 'mongoose';
import { DailyCloseout } from './schemas/daily-closeout.schema';
import { UpdateDailyCloseoutDto } from './dto/update-daily-closeout.dto';
import { Invoice } from '../invoices/schemas/invoice.schema';
import { InvoicePayment } from '../invoices/schemas/invoice-payment.schema';
import { Expense } from '../expenses/schemas/expense.schema';
import { Doctor } from '../doctors/schemas/doctor.schema';
import { UserRole } from '../../enums';
import { DailyCloseoutsGateway } from './daily-closeouts.gateway';
type RoleFilter = {
    role: UserRole;
    userId: string;
    doctorId?: string;
};
export declare class DailyCloseoutsService {
    private dailyCloseoutModel;
    private invoiceModel;
    private invoicePaymentModel;
    private expenseModel;
    private doctorModel;
    private configService;
    private readonly gateway;
    constructor(dailyCloseoutModel: Model<DailyCloseout>, invoiceModel: Model<Invoice>, invoicePaymentModel: Model<InvoicePayment>, expenseModel: Model<Expense>, doctorModel: Model<Doctor>, configService: ConfigService, gateway: DailyCloseoutsGateway);
    private getWorkdayBounds;
    private paymentFilter;
    private expenseFilter;
    findAll(date?: string): Promise<(import("mongoose").FlattenMaps<DailyCloseout> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    getByDate(date: string, roleFilter?: RoleFilter): Promise<Record<string, unknown>>;
    getPreview(date: string, roleFilter?: RoleFilter): Promise<{
        date: string;
        payments: {
            paymentId: any;
            invoiceId: any;
            patientName: any;
            patientNameAr: any;
            doctorName: any;
            doctorNameAr: any;
            invoiceSubtotal: any;
            invoiceTotal: any;
            invoiceDiscount: any;
            invoiceDiscountType: any;
            beforeRemaining: any;
            amount: any;
            afterRemaining: any;
            method: any;
            paidAt: any;
            invoiceCreatedAt: any;
        }[];
        unpaidInvoices: {
            invoiceId: any;
            patientName: any;
            patientNameAr: any;
            doctorName: any;
            doctorNameAr: any;
            invoiceSubtotal: any;
            invoiceTotal: any;
            invoiceDiscount: any;
            invoiceDiscountType: any;
            invoiceCreatedAt: any;
        }[];
        expenses: (import("mongoose").FlattenMaps<Expense> & Required<{
            _id: Types.ObjectId;
        }> & {
            __v: number;
        })[];
        revenue: any;
        cashCollected: number;
        cardCollected: number;
        transferCollected: number;
        vodafoneCashCollected: number;
        totalCollected: number;
        totalExpenses: number;
        finalBalance: number;
    }>;
    removeByDate(date: string): Promise<void>;
    updateByDate(date: string, dto: UpdateDailyCloseoutDto, roleFilter?: RoleFilter): Promise<(import("mongoose").FlattenMaps<DailyCloseout> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
    create(date: string, closedBy: string, roleFilter?: RoleFilter): Promise<(import("mongoose").FlattenMaps<DailyCloseout> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
}
export {};
