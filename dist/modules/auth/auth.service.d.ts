import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Model, Types } from 'mongoose';
import { User } from './schemas/user.schema';
import { Doctor } from '../doctors/schemas/doctor.schema';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateUserPasswordDto } from './dto/update-user-password.dto';
import { UserRole } from '../../enums';
import { AuthGateway } from './auth.gateway';
export declare class AuthService {
    private userModel;
    private doctorModel;
    private jwtService;
    private configService;
    private readonly authGateway;
    constructor(userModel: Model<User>, doctorModel: Model<Doctor>, jwtService: JwtService, configService: ConfigService, authGateway: AuthGateway);
    login(dto: LoginDto): Promise<{
        token: string;
        user: {
            id: Types.ObjectId;
            name: string;
            email: string;
            role: UserRole;
            doctorId: Types.ObjectId | undefined;
            avatar: string | undefined;
            permissions: {
                canViewAllDoctors: boolean;
                canViewExpenses: boolean;
                canFilterByDoctor: boolean;
            };
        };
        doctor: (import("mongoose").FlattenMaps<Doctor> & Required<{
            _id: Types.ObjectId;
        }> & {
            __v: number;
        }) | undefined;
    }>;
    getMe(userId: string): Promise<import("mongoose").FlattenMaps<User> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }>;
    listUsers(): Promise<(import("mongoose").FlattenMaps<User> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    register(dto: RegisterDto): Promise<{
        token: string;
        user: {
            id: Types.ObjectId;
            name: string;
            email: string;
            role: UserRole;
            doctorId: Types.ObjectId | undefined;
            avatar: string | undefined;
            permissions: {
                canViewAllDoctors: boolean;
                canViewExpenses: boolean;
                canFilterByDoctor: boolean;
            };
        };
        doctor: (import("mongoose").FlattenMaps<Doctor> & Required<{
            _id: Types.ObjectId;
        }> & {
            __v: number;
        }) | undefined;
    }>;
    updateUser(userId: string, dto: UpdateUserDto): Promise<(import("mongoose").FlattenMaps<User> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
    updateUserPassword(userId: string, dto: UpdateUserPasswordDto): Promise<{
        message: string;
    }>;
    deleteUser(userId: string, currentUserId: string): Promise<{
        message: string;
    }>;
}
