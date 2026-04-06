import { Document, Types } from 'mongoose';
import { PatientGender } from '../../../enums';
export declare class Patient extends Document {
    name: string;
    nameAr: string;
    phone: string;
    age?: number;
    email?: string;
    dateOfBirth?: string;
    gender: PatientGender;
    notes?: string;
    lastVisit?: string;
    assignedDoctorId?: Types.ObjectId;
    hasCompletedOnboarding: boolean;
    job?: string;
    address?: string;
    medicalConditions?: Record<string, boolean>;
    questionnaire?: Record<string, string>;
    hiddenTeeth: number[];
}
export declare const PatientSchema: import("mongoose").Schema<Patient, import("mongoose").Model<Patient, any, any, any, Document<unknown, any, Patient, any, {}> & Patient & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Patient, Document<unknown, {}, import("mongoose").FlatRecord<Patient>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<Patient> & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}>;
