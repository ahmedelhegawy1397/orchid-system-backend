import { Model } from 'mongoose';
import { ToothProcedure } from './schemas/tooth-procedure.schema';
import { CreateToothProcedureDto } from './dto/create-tooth-procedure.dto';
import { UpdateToothProcedureDto } from './dto/update-tooth-procedure.dto';
import { PatientsGateway } from '../patients/patients.gateway';
export declare class ToothProceduresService {
    private toothProcedureModel;
    private patientsGateway;
    constructor(toothProcedureModel: Model<ToothProcedure>, patientsGateway: PatientsGateway);
    findByPatient(patientId: string): Promise<{
        procedures: any[];
        byTooth: Record<number, any[]>;
    }>;
    create(patientId: string, dto: CreateToothProcedureDto): Promise<(import("mongoose").FlattenMaps<ToothProcedure> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
    update(id: string, dto: UpdateToothProcedureDto): Promise<(import("mongoose").FlattenMaps<ToothProcedure> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
    remove(id: string): Promise<void>;
}
