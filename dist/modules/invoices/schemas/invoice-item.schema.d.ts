import { Document } from 'mongoose';
export declare class InvoiceItem extends Document {
    description?: string;
    descriptionAr?: string;
    procedure: string;
    procedureAr: string;
    quantity: number;
    unitPrice: number;
    total?: number;
    toothNumber?: number;
}
export declare const InvoiceItemSchema: import("mongoose").Schema<InvoiceItem, import("mongoose").Model<InvoiceItem, any, any, any, Document<unknown, any, InvoiceItem, any, {}> & InvoiceItem & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, InvoiceItem, Document<unknown, {}, import("mongoose").FlatRecord<InvoiceItem>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<InvoiceItem> & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
}>;
