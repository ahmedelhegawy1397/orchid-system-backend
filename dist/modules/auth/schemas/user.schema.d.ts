import { Document, Types } from 'mongoose';
import { UserRole } from '../../../enums';
export declare class User extends Document {
    name: string;
    email: string;
    passwordHash: string;
    role: UserRole;
    doctorId?: Types.ObjectId;
    permissions: string[];
    avatar?: string;
}
export declare const UserSchema: import("mongoose").Schema<User, import("mongoose").Model<User, any, any, any, Document<unknown, any, User, any, {}> & User & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, User, Document<unknown, {}, import("mongoose").FlatRecord<User>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<User> & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}>;
