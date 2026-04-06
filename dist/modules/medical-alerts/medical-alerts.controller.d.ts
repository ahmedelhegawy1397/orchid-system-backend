import { MedicalAlertsService } from './medical-alerts.service';
export declare class MedicalAlertsController {
    private readonly medicalAlertsService;
    constructor(medicalAlertsService: MedicalAlertsService);
    remove(id: string): Promise<void>;
}
