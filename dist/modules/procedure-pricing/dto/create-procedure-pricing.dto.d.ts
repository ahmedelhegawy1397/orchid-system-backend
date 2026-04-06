import { ProcedureCategory } from '../../../enums';
export declare class CreateProcedurePricingDto {
    procedure: string;
    procedureAr: string;
    basePrice: number;
    procedureType?: ProcedureCategory;
}
