import { Model, Types } from 'mongoose';
import { Prescription } from './schemas/prescription.schema';
import { CreatePrescriptionDto } from './dto/create-prescription.dto';
import { UpdatePrescriptionDto } from './dto/update-prescription.dto';
import { PrescriptionsGateway } from './prescriptions.gateway';
export declare class PrescriptionsService {
    private prescriptionModel;
    private readonly gateway;
    constructor(prescriptionModel: Model<Prescription>, gateway: PrescriptionsGateway);
    findById(id: string): Promise<import("mongoose").FlattenMaps<Prescription> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }>;
    updateById(id: string, dto: UpdatePrescriptionDto): Promise<import("mongoose").FlattenMaps<Prescription> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }>;
    removeById(id: string): Promise<void>;
    findAll(): Promise<(import("mongoose").FlattenMaps<Prescription> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    create(dto: CreatePrescriptionDto): Promise<(import("mongoose").FlattenMaps<Prescription> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
}
