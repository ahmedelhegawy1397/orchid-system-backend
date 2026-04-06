import { PatientsService } from './patients.service';
import { ToothProceduresService } from '../tooth-procedures/tooth-procedures.service';
import { MedicalAlertsService } from '../medical-alerts/medical-alerts.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { UpdateHiddenTeethDto } from './dto/update-hidden-teeth.dto';
import { CreateToothProcedureDto } from '../tooth-procedures/dto/create-tooth-procedure.dto';
import { CreateMedicalAlertDto } from '../medical-alerts/dto/create-medical-alert.dto';
import { PatientNotesService } from '../patient-notes/patient-notes.service';
import { CreatePatientNoteDto } from '../patient-notes/dto/create-patient-note.dto';
import { UpdatePatientNoteDto } from '../patient-notes/dto/update-patient-note.dto';
import { PatientPrescriptionsService } from '../patient-prescriptions/patient-prescriptions.service';
import { CreatePatientPrescriptionDto } from '../patient-prescriptions/dto/create-patient-prescription.dto';
import { UpdatePatientPrescriptionDto } from '../patient-prescriptions/dto/update-patient-prescription.dto';
export declare class PatientsController {
    private readonly patientsService;
    private readonly toothProceduresService;
    private readonly medicalAlertsService;
    private readonly patientNotesService;
    private readonly patientPrescriptionsService;
    constructor(patientsService: PatientsService, toothProceduresService: ToothProceduresService, medicalAlertsService: MedicalAlertsService, patientNotesService: PatientNotesService, patientPrescriptionsService: PatientPrescriptionsService);
    findAll(search?: string, assignedDoctorId?: string, page?: number, limit?: number): Promise<{
        items: Array<Record<string, unknown>>;
        total: number;
        page: number;
        limit: number;
    }>;
    getBirthdays(date?: string): Promise<Record<string, unknown>[]>;
    create(dto: CreatePatientDto): Promise<import("./schemas/patient.schema").Patient & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    findOne(id: string): Promise<Record<string, unknown>>;
    update(id: string, dto: UpdatePatientDto): Promise<import("mongoose").FlattenMaps<import("./schemas/patient.schema").Patient> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    remove(id: string): Promise<void>;
    forceRemove(id: string): Promise<void>;
    getToothProcedures(id: string): Promise<{
        procedures: any[];
        byTooth: Record<number, any[]>;
    }>;
    setHiddenTeeth(id: string, dto: UpdateHiddenTeethDto): Promise<{
        hiddenTeeth: unknown;
    }>;
    addHiddenTooth(id: string, toothNumber: number): Promise<{
        hiddenTeeth: unknown;
    }>;
    removeHiddenTooth(id: string, toothNumber: number): Promise<{
        hiddenTeeth: unknown;
    }>;
    addToothProcedure(id: string, dto: CreateToothProcedureDto): Promise<(import("mongoose").FlattenMaps<import("../tooth-procedures/schemas/tooth-procedure.schema").ToothProcedure> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
    getAlerts(id: string): Promise<(import("mongoose").FlattenMaps<import("../medical-alerts/schemas/medical-alert.schema").MedicalAlert> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    addAlert(id: string, dto: CreateMedicalAlertDto): Promise<import("../medical-alerts/schemas/medical-alert.schema").MedicalAlert & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    getNotes(id: string): Promise<(import("mongoose").FlattenMaps<import("../patient-notes/schemas/patient-note.schema").PatientNote> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    addNote(id: string, dto: CreatePatientNoteDto): Promise<import("../patient-notes/schemas/patient-note.schema").PatientNote & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    updateNote(id: string, noteId: string, dto: UpdatePatientNoteDto): Promise<import("mongoose").FlattenMaps<import("../patient-notes/schemas/patient-note.schema").PatientNote> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    removeNote(id: string, noteId: string): Promise<void>;
    getPrescriptions(id: string): Promise<(import("mongoose").FlattenMaps<import("../patient-prescriptions/schemas/patient-prescription.schema").PatientPrescription> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    addPrescription(id: string, dto: CreatePatientPrescriptionDto): Promise<(import("mongoose").FlattenMaps<import("../patient-prescriptions/schemas/patient-prescription.schema").PatientPrescription> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
    getPrescription(id: string, prescriptionId: string): Promise<import("mongoose").FlattenMaps<import("../patient-prescriptions/schemas/patient-prescription.schema").PatientPrescription> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    updatePrescription(id: string, prescriptionId: string, dto: UpdatePatientPrescriptionDto): Promise<import("mongoose").FlattenMaps<import("../patient-prescriptions/schemas/patient-prescription.schema").PatientPrescription> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    removePrescription(id: string, prescriptionId: string): Promise<void>;
}
