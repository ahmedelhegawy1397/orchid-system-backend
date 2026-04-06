import { DailyCloseoutsService } from './daily-closeouts.service';
import { CreateDailyCloseoutDto } from './dto/create-daily-closeout.dto';
import { UpdateDailyCloseoutDto } from './dto/update-daily-closeout.dto';
import { CurrentUserPayload } from '../../common/decorators/current-user.decorator';
export declare class DailyCloseoutsController {
    private readonly dailyCloseoutsService;
    constructor(dailyCloseoutsService: DailyCloseoutsService);
    findAll(date?: string): Promise<(import("mongoose").FlattenMaps<import("./schemas/daily-closeout.schema").DailyCloseout> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    getPreview(date: string, user?: CurrentUserPayload): Promise<{
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
        expenses: (import("mongoose").FlattenMaps<import("../expenses/schemas/expense.schema").Expense> & Required<{
            _id: import("mongoose").Types.ObjectId;
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
    getByDate(date: string, user?: CurrentUserPayload): Promise<Record<string, unknown>>;
    removeByDate(date: string): Promise<void>;
    updateByDate(date: string, dto: UpdateDailyCloseoutDto, user: CurrentUserPayload): Promise<(import("mongoose").FlattenMaps<import("./schemas/daily-closeout.schema").DailyCloseout> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
    create(dto: CreateDailyCloseoutDto, user: CurrentUserPayload): Promise<(import("mongoose").FlattenMaps<import("./schemas/daily-closeout.schema").DailyCloseout> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
}
