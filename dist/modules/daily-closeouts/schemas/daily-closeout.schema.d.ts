import { Document, Types } from 'mongoose';
export declare class PaymentSnapshot {
    paymentId: Types.ObjectId;
    invoiceId: Types.ObjectId;
    patientName: string;
    patientNameAr: string;
    doctorName: string;
    doctorNameAr: string;
    invoiceSubtotal: number;
    invoiceDiscount: number;
    invoiceDiscountType: string;
    invoiceTotal: number;
    beforeRemaining: number;
    amount: number;
    afterRemaining: number;
    method: string;
    paidAt: string;
    paidDate: string;
    invoiceCreatedAt: string;
}
export declare class UnpaidInvoiceSnapshot {
    invoiceId: Types.ObjectId;
    patientName: string;
    patientNameAr: string;
    doctorName: string;
    doctorNameAr: string;
    invoiceSubtotal: number;
    invoiceDiscount: number;
    invoiceDiscountType: string;
    invoiceTotal: number;
    invoiceCreatedAt: string;
}
export declare class ExpenseSnapshot {
    expenseId: Types.ObjectId;
    category: string;
    categoryAr: string;
    description?: string;
    amount: number;
}
export declare class DailyCloseout extends Document {
    date: string;
    closedBy: Types.ObjectId;
    cashCollected: number;
    cardCollected: number;
    transferCollected: number;
    vodafoneCashCollected: number;
    totalCollected: number;
    revenue: number;
    paymentSnapshot: PaymentSnapshot[];
    unpaidInvoicesSnapshot: UnpaidInvoiceSnapshot[];
    expenseSnapshot: ExpenseSnapshot[];
    totalExpenses: number;
    finalBalance: number;
    closedAt: string;
    currency: string;
}
export declare const DailyCloseoutSchema: import("mongoose").Schema<DailyCloseout, import("mongoose").Model<DailyCloseout, any, any, any, Document<unknown, any, DailyCloseout, any, {}> & DailyCloseout & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, DailyCloseout, Document<unknown, {}, import("mongoose").FlatRecord<DailyCloseout>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<DailyCloseout> & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}>;
