import { Document, Types } from 'mongoose';
import { LabRecordStatus } from '../../../enums';
export declare class LabRecord extends Document {
    doctorId: Types.ObjectId;
    patientId: Types.ObjectId;
    teethNumbers: number[];
    toothCount: number;
    procedure: string;
    price: number;
    notes?: string;
    date: string;
    status: LabRecordStatus;
    completedAt?: string | null;
}
export declare const LabRecordSchema: import("mongoose").Schema<LabRecord, import("mongoose").Model<LabRecord, any, any, any, Document<unknown, any, LabRecord, any, {}> & LabRecord & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, LabRecord, Document<unknown, {}, import("mongoose").FlatRecord<LabRecord>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<LabRecord> & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}>;
