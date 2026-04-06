import { ProcedurePricingService } from './procedure-pricing.service';
import { BulkUpdateProcedurePricingDto } from './dto/bulk-update-procedure-pricing.dto';
import { CreateProcedurePricingDto } from './dto/create-procedure-pricing.dto';
import { UpdateProcedurePricingDto } from './dto/update-procedure-pricing.dto';
import { ProcedureCategory } from '../../enums';
export declare class ProcedurePricingController {
    private readonly procedurePricingService;
    constructor(procedurePricingService: ProcedurePricingService);
    findAll(): Promise<(import("mongoose").FlattenMaps<import("./schemas/procedure-pricing.schema").ProcedurePricing> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    getProcedureTypes(): {
        procedureTypes: ProcedureCategory[];
    };
    findOne(id: string): Promise<import("mongoose").FlattenMaps<import("./schemas/procedure-pricing.schema").ProcedurePricing> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    create(dto: CreateProcedurePricingDto): Promise<import("./schemas/procedure-pricing.schema").ProcedurePricing & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    update(id: string, dto: UpdateProcedurePricingDto): Promise<import("./schemas/procedure-pricing.schema").ProcedurePricing & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    remove(id: string): Promise<void>;
    bulkUpdate(dto: BulkUpdateProcedurePricingDto): Promise<import("mongoose").MergeType<import("mongoose").Document<unknown, {}, import("./schemas/procedure-pricing.schema").ProcedurePricing, {}, {}> & import("./schemas/procedure-pricing.schema").ProcedurePricing & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, Omit<{
        procedure: string;
        procedureAr: string;
        basePrice: number;
        procedureType?: string;
    }, "_id">>[]>;
}
