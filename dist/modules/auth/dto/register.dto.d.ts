import { UserRole } from '../../../enums';
export declare class RegisterDto {
    name: string;
    email: string;
    password: string;
    role: UserRole;
    doctorId?: string;
}
