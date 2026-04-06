import { PrescriptionsService } from './prescriptions.service';
import { CreatePrescriptionDto } from './dto/create-prescription.dto';
import { UpdatePrescriptionDto } from './dto/update-prescription.dto';
export declare class PrescriptionsController {
    private readonly prescriptionsService;
    constructor(prescriptionsService: PrescriptionsService);
    findAll(): Promise<(import("mongoose").FlattenMaps<import("./schemas/prescription.schema").Prescription> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    create(dto: CreatePrescriptionDto): Promise<(import("mongoose").FlattenMaps<import("./schemas/prescription.schema").Prescription> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
    findOne(id: string): Promise<import("mongoose").FlattenMaps<import("./schemas/prescription.schema").Prescription> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    update(id: string, dto: UpdatePrescriptionDto): Promise<import("mongoose").FlattenMaps<import("./schemas/prescription.schema").Prescription> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    remove(id: string): Promise<void>;
}
