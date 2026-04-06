import { Types } from 'mongoose';
export declare function isValidObjectId(id: unknown): id is string;
export declare function toObjectIdOrUndefined(id: unknown): Types.ObjectId | undefined;
export declare function toObjectIdOrThrow(id: unknown, fieldName?: string): Types.ObjectId;
