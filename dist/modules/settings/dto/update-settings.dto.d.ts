export declare class WorkingHoursDayDto {
    open?: string;
    close?: string;
    isOpen?: boolean;
}
export declare class UpdateSettingsDto {
    name?: string;
    nameAr?: string;
    address?: string;
    phone?: string;
    email?: string;
    workingHours?: Record<string, WorkingHoursDayDto>;
    appointmentDurations?: number[];
    sterilizationBuffer?: number;
    clinicSharePercentage?: number;
    currency?: string;
}
