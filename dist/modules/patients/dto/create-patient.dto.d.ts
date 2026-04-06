import { PatientGender } from '../../../enums';
export declare class CreatePatientDto {
    name: string;
    nameAr: string;
    phone: string;
    gender: PatientGender;
    age?: number;
    dateOfBirth?: string;
    notes?: string;
    assignedDoctorId?: string;
    hasCompletedOnboarding?: boolean;
    job?: string;
    address?: string;
    medicalConditions?: Record<string, boolean>;
    questionnaire?: Record<string, string>;
}
