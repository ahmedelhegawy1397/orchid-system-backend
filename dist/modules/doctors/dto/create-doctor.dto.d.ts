import { DoctorColor, DoctorRole } from '../../../enums';
export declare class CreateDoctorDto {
    name: string;
    nameAr: string;
    specialty: string;
    specialtyAr: string;
    color: DoctorColor;
    isOwner: boolean;
    role: DoctorRole;
    clinicSharePercent?: number;
    doctorSharePercent?: number;
}
