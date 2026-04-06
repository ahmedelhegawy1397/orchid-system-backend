import { LabRecordStatus } from '../../../enums';
export declare class UpdateLabRecordDto {
    doctorId?: string;
    patientId?: string;
    teethNumbers?: number[];
    toothCount?: number;
    procedure?: string;
    price?: number;
    notes?: string;
    date?: string;
    status?: LabRecordStatus;
    completedAt?: string | null;
}
