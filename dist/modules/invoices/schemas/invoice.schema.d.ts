import { Document, Types } from 'mongoose';
import { DiscountType, InvoiceStatus } from '../../../enums';
import { InvoiceItem } from './invoice-item.schema';
export declare class Invoice extends Document {
    patientId: Types.ObjectId;
    doctorId: Types.ObjectId;
    items: InvoiceItem[];
    subtotal: number;
    discount: number;
    discountType: DiscountType;
    total: number;
    paid: number;
    remaining: number;
    status: InvoiceStatus;
    currency: string;
    dueDate?: string;
}
export declare const InvoiceSchema: import("mongoose").Schema<Invoice, import("mongoose").Model<Invoice, any, any, any, Document<unknown, any, Invoice, any, {}> & Invoice & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Invoice, Document<unknown, {}, import("mongoose").FlatRecord<Invoice>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<Invoice> & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}>;
