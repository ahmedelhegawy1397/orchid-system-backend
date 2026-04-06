import { Model, Types } from 'mongoose';
import { PatientPrescription } from './schemas/patient-prescription.schema';
import { CreatePatientPrescriptionDto } from './dto/create-patient-prescription.dto';
import { UpdatePatientPrescriptionDto } from './dto/update-patient-prescription.dto';
import { PatientsGateway } from '../patients/patients.gateway';
export declare class PatientPrescriptionsService {
    private patientPrescriptionModel;
    private readonly patientsGateway;
    constructor(patientPrescriptionModel: Model<PatientPrescription>, patientsGateway: PatientsGateway);
    findByPatient(patientId: string): Promise<(import("mongoose").FlattenMaps<PatientPrescription> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    create(patientId: string, dto: CreatePatientPrescriptionDto): Promise<(import("mongoose").FlattenMaps<PatientPrescription> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
    findOne(patientId: string, prescriptionId: string): Promise<import("mongoose").FlattenMaps<PatientPrescription> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }>;
    update(patientId: string, prescriptionId: string, dto: UpdatePatientPrescriptionDto): Promise<import("mongoose").FlattenMaps<PatientPrescription> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }>;
    remove(patientId: string, prescriptionId: string): Promise<void>;
    deleteByPatient(patientId: string): Promise<void>;
}
