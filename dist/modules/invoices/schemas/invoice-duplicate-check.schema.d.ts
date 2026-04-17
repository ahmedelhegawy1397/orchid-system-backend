import { Document, Types } from 'mongoose';
export declare class InvoiceDuplicateCheck extends Document {
    contentHash: string;
    invoiceId: Types.ObjectId;
    patientId: Types.ObjectId;
    doctorId: Types.ObjectId;
    total: number;
    createdAt: Date;
}
export declare const InvoiceDuplicateCheckSchema: import("mongoose").Schema<InvoiceDuplicateCheck, import("mongoose").Model<InvoiceDuplicateCheck, any, any, any, Document<unknown, any, InvoiceDuplicateCheck, any, {}> & InvoiceDuplicateCheck & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, InvoiceDuplicateCheck, Document<unknown, {}, import("mongoose").FlatRecord<InvoiceDuplicateCheck>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<InvoiceDuplicateCheck> & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}>;
