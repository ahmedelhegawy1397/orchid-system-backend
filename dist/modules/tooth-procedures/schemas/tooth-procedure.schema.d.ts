import { Document, Types } from 'mongoose';
import { ProcedureCategory } from '../../../enums';
export declare class ToothProcedure extends Document {
    patientId: Types.ObjectId;
    toothNumber?: number;
    toothNumbers: number[];
    procedure: string;
    procedureAr: string;
    procedureType: ProcedureCategory;
    price: number;
    discount?: number;
    date: string;
    doctorId: Types.ObjectId;
    appointmentId?: Types.ObjectId;
    notes?: string;
    currency: string;
    isPediatric?: boolean;
    isComplete?: boolean;
    isLab?: boolean;
    labManagementId?: string;
}
export declare const ToothProcedureSchema: import("mongoose").Schema<ToothProcedure, import("mongoose").Model<ToothProcedure, any, any, any, Document<unknown, any, ToothProcedure, any, {}> & ToothProcedure & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, ToothProcedure, Document<unknown, {}, import("mongoose").FlatRecord<ToothProcedure>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<ToothProcedure> & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}>;
