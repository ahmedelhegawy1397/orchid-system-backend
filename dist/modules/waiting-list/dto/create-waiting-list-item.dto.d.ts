import { WaitingUrgency } from '../../../enums';
export declare class CreateWaitingListItemDto {
    patientId: string;
    doctorId?: string;
    preferredDate: string;
    preferredTimeRange?: string;
    urgency?: WaitingUrgency;
    notes?: string;
    duration?: number;
}
