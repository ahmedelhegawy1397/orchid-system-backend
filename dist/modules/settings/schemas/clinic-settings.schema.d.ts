import { Document } from 'mongoose';
export declare class WorkingHoursDay {
    open: string;
    close: string;
    isOpen: boolean;
}
export declare class ClinicSettings extends Document {
    name: string;
    nameAr: string;
    address?: string;
    phone?: string;
    email?: string;
    workingHours: Map<string, WorkingHoursDay>;
    appointmentDurations: number[];
    sterilizationBuffer: number;
    clinicSharePercentage: number;
    currency: string;
}
export declare const ClinicSettingsSchema: import("mongoose").Schema<ClinicSettings, import("mongoose").Model<ClinicSettings, any, any, any, Document<unknown, any, ClinicSettings, any, {}> & ClinicSettings & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, ClinicSettings, Document<unknown, {}, import("mongoose").FlatRecord<ClinicSettings>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<ClinicSettings> & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
}>;
