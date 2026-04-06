import { Model } from 'mongoose';
import { PatientTransfer } from './schemas/patient-transfer.schema';
import { Patient } from '../patients/schemas/patient.schema';
import { PatientsGateway } from '../patients/patients.gateway';
export declare class PatientTransfersService {
    private patientTransferModel;
    private patientModel;
    private readonly patientsGateway;
    constructor(patientTransferModel: Model<PatientTransfer>, patientModel: Model<Patient>, patientsGateway: PatientsGateway);
    transfer(patientId: string, toDoctorId: string, reason: string, notes: string | undefined, userId: string): Promise<(import("mongoose").FlattenMaps<PatientTransfer> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
    findByPatient(patientId: string): Promise<(import("mongoose").FlattenMaps<PatientTransfer> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
}
