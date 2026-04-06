import { ConfigService } from '@nestjs/config';
import { Strategy } from 'passport-jwt';
import { Model } from 'mongoose';
import { User } from '../schemas/user.schema';
export interface JwtPayload {
    sub: string;
    email: string;
    role: string;
    doctorId?: string;
}
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private configService;
    private userModel;
    constructor(configService: ConfigService, userModel: Model<User>);
    validate(payload: JwtPayload): Promise<{
        id: string;
        email: string;
        role: import("../../../enums").UserRole;
        doctorId: string | undefined;
    }>;
}
export {};
