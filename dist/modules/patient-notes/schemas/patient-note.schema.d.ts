import { Document, Types } from 'mongoose';
export declare class PatientNote extends Document {
    patientId: Types.ObjectId;
    content: string;
}
export declare const PatientNoteSchema: import("mongoose").Schema<PatientNote, import("mongoose").Model<PatientNote, any, any, any, Document<unknown, any, PatientNote, any, {}> & PatientNote & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, PatientNote, Document<unknown, {}, import("mongoose").FlatRecord<PatientNote>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<PatientNote> & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}>;
