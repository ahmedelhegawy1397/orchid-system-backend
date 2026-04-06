import { Document, Types } from 'mongoose';
export declare class PatientPrescription extends Document {
    patientId: Types.ObjectId;
    appointmentId?: Types.ObjectId;
    doctorId: Types.ObjectId;
    medication: string;
    strength?: string;
    form?: string;
    dosage: string;
    duration: string;
    datePrescribed: string;
    notes?: string;
    status: string;
}
export declare const PatientPrescriptionSchema: import("mongoose").Schema<PatientPrescription, import("mongoose").Model<PatientPrescription, any, any, any, Document<unknown, any, PatientPrescription, any, {}> & PatientPrescription & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, PatientPrescription, Document<unknown, {}, import("mongoose").FlatRecord<PatientPrescription>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<PatientPrescription> & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}>;
