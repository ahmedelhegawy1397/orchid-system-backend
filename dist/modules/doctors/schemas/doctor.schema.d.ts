import { Document, Types } from 'mongoose';
import { DoctorColor, DoctorRole } from '../../../enums';
export declare class Doctor extends Document {
    name: string;
    nameAr: string;
    specialty: string;
    specialtyAr: string;
    color: DoctorColor;
    avatar?: string;
    isOwner: boolean;
    role: DoctorRole;
    clinicSharePercent: number;
    doctorSharePercent: number;
    userId?: Types.ObjectId;
}
export declare const DoctorSchema: import("mongoose").Schema<Doctor, import("mongoose").Model<Doctor, any, any, any, Document<unknown, any, Doctor, any, {}> & Doctor & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Doctor, Document<unknown, {}, import("mongoose").FlatRecord<Doctor>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<Doctor> & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}>;
