import { Model, Types } from 'mongoose';
import { Patient } from './schemas/patient.schema';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { Appointment } from '../appointments/schemas/appointment.schema';
import { Invoice } from '../invoices/schemas/invoice.schema';
import { InvoicePayment } from '../invoices/schemas/invoice-payment.schema';
import { ToothProcedure } from '../tooth-procedures/schemas/tooth-procedure.schema';
import { MedicalAlert } from '../medical-alerts/schemas/medical-alert.schema';
import { WaitingListItem } from '../waiting-list/schemas/waiting-list-item.schema';
import { PatientNotesService } from '../patient-notes/patient-notes.service';
import { PatientPrescriptionsService } from '../patient-prescriptions/patient-prescriptions.service';
import { PatientsGateway } from './patients.gateway';
export declare class PatientsService {
    private patientModel;
    private appointmentModel;
    private invoiceModel;
    private invoicePaymentModel;
    private toothProcedureModel;
    private medicalAlertModel;
    private waitingListModel;
    private patientNotesService;
    private patientPrescriptionsService;
    private patientsGateway;
    constructor(patientModel: Model<Patient>, appointmentModel: Model<Appointment>, invoiceModel: Model<Invoice>, invoicePaymentModel: Model<InvoicePayment>, toothProcedureModel: Model<ToothProcedure>, medicalAlertModel: Model<MedicalAlert>, waitingListModel: Model<WaitingListItem>, patientNotesService: PatientNotesService, patientPrescriptionsService: PatientPrescriptionsService, patientsGateway: PatientsGateway);
    findBirthdays(date?: string): Promise<Record<string, unknown>[]>;
    findAll(query: {
        search?: string;
        assignedDoctorId?: string;
        page?: number;
        limit?: number;
    }): Promise<{
        items: Array<Record<string, unknown>>;
        total: number;
        page: number;
        limit: number;
    }>;
    create(dto: CreatePatientDto): Promise<Patient & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }>;
    findOne(id: string): Promise<Record<string, unknown>>;
    update(id: string, dto: UpdatePatientDto): Promise<import("mongoose").FlattenMaps<Patient> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }>;
    setHiddenTeeth(id: string, teeth: number[]): Promise<{
        hiddenTeeth: unknown;
    }>;
    addHiddenTooth(id: string, toothNumber: number): Promise<{
        hiddenTeeth: unknown;
    }>;
    removeHiddenTooth(id: string, toothNumber: number): Promise<{
        hiddenTeeth: unknown;
    }>;
    remove(id: string): Promise<void>;
    forceRemove(id: string): Promise<void>;
}
