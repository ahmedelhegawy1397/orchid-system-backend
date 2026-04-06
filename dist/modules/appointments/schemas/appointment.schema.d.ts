import { Document, Types } from 'mongoose';
import { AppointmentStatus, BillingMode } from '../../../enums';
export declare class Appointment extends Document {
    patientId: Types.ObjectId;
    doctorId: Types.ObjectId;
    billingMode?: BillingMode;
    date: string;
    startTime: string;
    endTime: string;
    duration: number;
    status: AppointmentStatus;
    procedure?: string;
    procedureAr?: string;
    notes?: string;
    sterilizationBuffer: number;
    toothNumber?: number;
    treatmentAdded: boolean;
}
export declare const AppointmentSchema: import("mongoose").Schema<Appointment, import("mongoose").Model<Appointment, any, any, any, Document<unknown, any, Appointment, any, {}> & Appointment & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Appointment, Document<unknown, {}, import("mongoose").FlatRecord<Appointment>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<Appointment> & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}>;
