import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateUserPasswordDto } from './dto/update-user-password.dto';
import { type CurrentUserPayload } from '../../common/decorators';
import { UserRole } from '../../enums';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(dto: RegisterDto): Promise<{
        token: string;
        user: {
            id: import("mongoose").Types.ObjectId;
            name: string;
            email: string;
            role: UserRole;
            doctorId: import("mongoose").Types.ObjectId | undefined;
            avatar: string | undefined;
            permissions: {
                canViewAllDoctors: boolean;
                canViewExpenses: boolean;
                canFilterByDoctor: boolean;
            };
        };
        doctor: (import("mongoose").FlattenMaps<import("../doctors/schemas/doctor.schema").Doctor> & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        }) | undefined;
    }>;
    login(dto: LoginDto): Promise<{
        token: string;
        user: {
            id: import("mongoose").Types.ObjectId;
            name: string;
            email: string;
            role: UserRole;
            doctorId: import("mongoose").Types.ObjectId | undefined;
            avatar: string | undefined;
            permissions: {
                canViewAllDoctors: boolean;
                canViewExpenses: boolean;
                canFilterByDoctor: boolean;
            };
        };
        doctor: (import("mongoose").FlattenMaps<import("../doctors/schemas/doctor.schema").Doctor> & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        }) | undefined;
    }>;
    me(user: CurrentUserPayload): Promise<import("mongoose").FlattenMaps<import("./schemas/user.schema").User> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    listUsers(): Promise<(import("mongoose").FlattenMaps<import("./schemas/user.schema").User> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    updateUser(id: string, dto: UpdateUserDto): Promise<(import("mongoose").FlattenMaps<import("./schemas/user.schema").User> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
    updateUserPassword(id: string, dto: UpdateUserPasswordDto): Promise<{
        message: string;
    }>;
    deleteUser(id: string, currentUser: CurrentUserPayload): Promise<{
        message: string;
    }>;
}
