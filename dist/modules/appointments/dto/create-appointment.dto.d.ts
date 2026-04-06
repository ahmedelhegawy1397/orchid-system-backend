import { BillingMode } from '../../../enums';
export declare class CreateAppointmentDto {
    patientId: string;
    doctorId: string;
    date: string;
    startTime: string;
    duration: number;
    billingMode?: BillingMode;
    procedure?: string;
    procedureAr?: string;
    notes?: string;
    sterilizationBuffer?: number;
    toothNumber?: number;
}
