import { LabManagementService } from './lab-management.service';
import { CreateLabRecordDto } from './dto/create-lab-record.dto';
import { UpdateLabRecordDto } from './dto/update-lab-record.dto';
import { QueryLabRecordsDto } from './dto/query-lab-records.dto';
export declare class LabManagementController {
    private readonly labManagementService;
    constructor(labManagementService: LabManagementService);
    create(createLabRecordDto: CreateLabRecordDto): Promise<(import("mongoose").FlattenMaps<import("./schemas/lab-record.schema").LabRecord> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
    findAll(query: QueryLabRecordsDto): Promise<{
        records: (import("mongoose").FlattenMaps<import("./schemas/lab-record.schema").LabRecord> & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        })[];
        totalPrice: number;
        count: number;
    }>;
    findOne(id: string): Promise<import("mongoose").FlattenMaps<import("./schemas/lab-record.schema").LabRecord> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    update(id: string, updateLabRecordDto: UpdateLabRecordDto): Promise<(import("mongoose").FlattenMaps<import("./schemas/lab-record.schema").LabRecord> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
