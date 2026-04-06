import { LabRecordStatus } from '../../../enums';
export declare class QueryLabRecordsDto {
    startDate?: string;
    endDate?: string;
    patientId?: string;
    doctorId?: string;
    status?: LabRecordStatus;
}
