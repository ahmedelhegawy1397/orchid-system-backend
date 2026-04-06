import { Model } from 'mongoose';
import { LabRecord } from './schemas/lab-record.schema';
import { CreateLabRecordDto } from './dto/create-lab-record.dto';
import { UpdateLabRecordDto } from './dto/update-lab-record.dto';
import { QueryLabRecordsDto } from './dto/query-lab-records.dto';
import { LabManagementGateway } from './lab-management.gateway';
export declare class LabManagementService {
    private labRecordModel;
    private labManagementGateway;
    constructor(labRecordModel: Model<LabRecord>, labManagementGateway: LabManagementGateway);
    create(dto: CreateLabRecordDto): Promise<(import("mongoose").FlattenMaps<LabRecord> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
    findAll(query: QueryLabRecordsDto): Promise<{
        records: (import("mongoose").FlattenMaps<LabRecord> & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        })[];
        totalPrice: number;
        count: number;
    }>;
    findOne(id: string): Promise<import("mongoose").FlattenMaps<LabRecord> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    update(id: string, dto: UpdateLabRecordDto): Promise<(import("mongoose").FlattenMaps<LabRecord> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
