import { Model, Types } from 'mongoose';
import { Doctor } from './schemas/doctor.schema';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { DoctorsGateway } from './doctors.gateway';
export declare class DoctorsService {
    private doctorModel;
    private readonly gateway;
    constructor(doctorModel: Model<Doctor>, gateway: DoctorsGateway);
    findAll(): Promise<(import("mongoose").FlattenMaps<Doctor> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    findOne(id: string): Promise<import("mongoose").FlattenMaps<Doctor> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }>;
    create(dto: CreateDoctorDto): Promise<Doctor & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }>;
    update(id: string, dto: UpdateDoctorDto): Promise<Doctor & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }>;
    remove(id: string): Promise<void>;
}
