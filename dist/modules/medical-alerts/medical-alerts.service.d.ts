import { Model } from 'mongoose';
import { MedicalAlert } from './schemas/medical-alert.schema';
import { CreateMedicalAlertDto } from './dto/create-medical-alert.dto';
export declare class MedicalAlertsService {
    private medicalAlertModel;
    constructor(medicalAlertModel: Model<MedicalAlert>);
    findByPatient(patientId: string): Promise<(import("mongoose").FlattenMaps<MedicalAlert> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    create(patientId: string, dto: CreateMedicalAlertDto): Promise<MedicalAlert & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    remove(id: string): Promise<void>;
}
