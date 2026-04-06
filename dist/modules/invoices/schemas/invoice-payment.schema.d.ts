import { Document, Types } from 'mongoose';
import { PaymentMethod } from '../../../enums';
export declare class InvoicePayment extends Document {
    invoiceId: Types.ObjectId;
    patientId: Types.ObjectId;
    doctorId: Types.ObjectId;
    amount: number;
    method: PaymentMethod;
    paidAt: string;
    paidDate: string;
    beforeRemaining: number;
    afterRemaining: number;
    currency: string;
}
export declare const InvoicePaymentSchema: import("mongoose").Schema<InvoicePayment, import("mongoose").Model<InvoicePayment, any, any, any, Document<unknown, any, InvoicePayment, any, {}> & InvoicePayment & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, InvoicePayment, Document<unknown, {}, import("mongoose").FlatRecord<InvoicePayment>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<InvoicePayment> & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}>;
