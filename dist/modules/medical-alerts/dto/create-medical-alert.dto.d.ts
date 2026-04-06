import { AlertType, AlertSeverity } from '../../../enums';
export declare class CreateMedicalAlertDto {
    type: AlertType;
    description: string;
    severity: AlertSeverity;
}
