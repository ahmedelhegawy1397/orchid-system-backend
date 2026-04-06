import { Model, Types } from 'mongoose';
import { Appointment } from './schemas/appointment.schema';
import { Patient } from '../patients/schemas/patient.schema';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { AppointmentsGateway } from './appointments.gateway';
import { DashboardGateway } from '../dashboard/dashboard.gateway';
import { PatientsGateway } from '../patients/patients.gateway';
export declare class AppointmentsService {
    private appointmentModel;
    private patientModel;
    private appointmentsGateway;
    private dashboardGateway;
    private patientsGateway;
    constructor(appointmentModel: Model<Appointment>, patientModel: Model<Patient>, appointmentsGateway: AppointmentsGateway, dashboardGateway: DashboardGateway, patientsGateway: PatientsGateway);
    findAll(query: {
        date?: string;
        doctorId?: string;
        patientId?: string;
        status?: string;
    }, doctorIdFilter?: string): Promise<(import("mongoose").FlattenMaps<Appointment> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    create(dto: CreateAppointmentDto): Promise<(import("mongoose").FlattenMaps<Appointment> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
    update(id: string, dto: UpdateAppointmentDto, doctorIdFilter?: string): Promise<(import("mongoose").FlattenMaps<Appointment> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
    cancel(id: string, doctorIdFilter?: string): Promise<Appointment & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }>;
    remove(id: string, doctorIdFilter?: string): Promise<{
        deleted: boolean;
        id: string;
    }>;
}
