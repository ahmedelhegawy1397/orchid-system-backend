import { Document, Types } from 'mongoose';
export declare class PatientTransfer extends Document {
    patientId: Types.ObjectId;
    fromDoctorId: Types.ObjectId;
    toDoctorId: Types.ObjectId;
    reason: string;
    notes?: string;
    transferredAt: string;
    transferredBy: Types.ObjectId;
}
export declare const PatientTransferSchema: import("mongoose").Schema<PatientTransfer, import("mongoose").Model<PatientTransfer, any, any, any, Document<unknown, any, PatientTransfer, any, {}> & PatientTransfer & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, PatientTransfer, Document<unknown, {}, import("mongoose").FlatRecord<PatientTransfer>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<PatientTransfer> & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}>;
