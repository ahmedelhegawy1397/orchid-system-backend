import { Document } from 'mongoose';
import { ProcedureCategory } from '../../../enums';
export declare class ProcedurePricing extends Document {
    procedure: string;
    procedureAr: string;
    basePrice: number;
    procedureType?: ProcedureCategory;
}
export declare const ProcedurePricingSchema: import("mongoose").Schema<ProcedurePricing, import("mongoose").Model<ProcedurePricing, any, any, any, Document<unknown, any, ProcedurePricing, any, {}> & ProcedurePricing & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, ProcedurePricing, Document<unknown, {}, import("mongoose").FlatRecord<ProcedurePricing>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<ProcedurePricing> & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
}>;
