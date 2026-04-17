import { Document } from 'mongoose';
export declare class IdempotentRequest extends Document {
    idempotencyKey: string;
    endpoint: string;
    requestBody: Record<string, unknown>;
    response: Record<string, unknown>;
    statusCode: number;
    userId: string;
    createdAt: Date;
}
export declare const IdempotentRequestSchema: import("mongoose").Schema<IdempotentRequest, import("mongoose").Model<IdempotentRequest, any, any, any, Document<unknown, any, IdempotentRequest, any, {}> & IdempotentRequest & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, IdempotentRequest, Document<unknown, {}, import("mongoose").FlatRecord<IdempotentRequest>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<IdempotentRequest> & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
}>;
