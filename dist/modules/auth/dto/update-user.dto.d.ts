import { UserRole } from '../../../enums';
export declare class UpdateUserDto {
    name?: string;
    email?: string;
    role?: UserRole;
    doctorId?: string;
}
