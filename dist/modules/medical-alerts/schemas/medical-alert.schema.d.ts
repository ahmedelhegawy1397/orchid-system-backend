import { Document, Types } from 'mongoose';
import { AlertSeverity, AlertType } from '../../../enums';
export declare class MedicalAlert extends Document {
    patientId: Types.ObjectId;
    type: AlertType;
    description: string;
    severity: AlertSeverity;
}
export declare const MedicalAlertSchema: import("mongoose").Schema<MedicalAlert, import("mongoose").Model<MedicalAlert, any, any, any, Document<unknown, any, MedicalAlert, any, {}> & MedicalAlert & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, MedicalAlert, Document<unknown, {}, import("mongoose").FlatRecord<MedicalAlert>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<MedicalAlert> & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}>;
