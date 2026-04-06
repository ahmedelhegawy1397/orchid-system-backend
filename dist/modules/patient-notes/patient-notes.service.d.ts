import { Model } from 'mongoose';
import { PatientNote } from './schemas/patient-note.schema';
import { CreatePatientNoteDto } from './dto/create-patient-note.dto';
import { UpdatePatientNoteDto } from './dto/update-patient-note.dto';
import { PatientsGateway } from '../patients/patients.gateway';
export declare class PatientNotesService {
    private patientNoteModel;
    private readonly patientsGateway;
    constructor(patientNoteModel: Model<PatientNote>, patientsGateway: PatientsGateway);
    findByPatient(patientId: string): Promise<(import("mongoose").FlattenMaps<PatientNote> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    create(patientId: string, dto: CreatePatientNoteDto): Promise<PatientNote & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    update(patientId: string, noteId: string, dto: UpdatePatientNoteDto): Promise<import("mongoose").FlattenMaps<PatientNote> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    remove(patientId: string, noteId: string): Promise<void>;
    deleteByPatient(patientId: string): Promise<void>;
}
