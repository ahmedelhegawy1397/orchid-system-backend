import { ProcedureCategory } from '../../../enums';
export declare class CreateToothProcedureDto {
    doctorId: string;
    toothNumber?: number | number[];
    procedure: string;
    procedureAr: string;
    procedureType: ProcedureCategory;
    price: number;
    discount?: number;
    date: string;
    appointmentId?: string;
    notes?: string;
    currency?: string;
    isPediatric?: boolean;
    isComplete?: boolean;
    isLab?: boolean;
    labManagementId?: string;
}
