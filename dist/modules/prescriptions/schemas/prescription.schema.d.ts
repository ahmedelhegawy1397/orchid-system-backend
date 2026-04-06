import { Document, Types } from 'mongoose';
export declare class Prescription extends Document {
    appointmentId?: Types.ObjectId;
    doctorId: Types.ObjectId;
    medication: string;
    strength?: string;
    form?: string;
    dosage: string;
    duration?: string;
    notes?: string;
}
export declare const PrescriptionSchema: import("mongoose").Schema<Prescription, import("mongoose").Model<Prescription, any, any, any, Document<unknown, any, Prescription, any, {}> & Prescription & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Prescription, Document<unknown, {}, import("mongoose").FlatRecord<Prescription>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<Prescription> & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}>;
