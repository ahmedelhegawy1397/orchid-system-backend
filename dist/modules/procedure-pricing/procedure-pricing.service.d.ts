import { Model, Types } from 'mongoose';
import { ProcedurePricing } from './schemas/procedure-pricing.schema';
import { CreateProcedurePricingDto } from './dto/create-procedure-pricing.dto';
import { UpdateProcedurePricingDto } from './dto/update-procedure-pricing.dto';
import { ProcedurePricingGateway } from './procedure-pricing.gateway';
type ProcedurePricingItem = {
    procedure: string;
    procedureAr: string;
    basePrice: number;
    procedureType?: string;
};
export declare class ProcedurePricingService {
    private procedurePricingModel;
    private readonly gateway;
    constructor(procedurePricingModel: Model<ProcedurePricing>, gateway: ProcedurePricingGateway);
    findAll(): Promise<(import("mongoose").FlattenMaps<ProcedurePricing> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    findOne(id: string): Promise<import("mongoose").FlattenMaps<ProcedurePricing> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }>;
    create(dto: CreateProcedurePricingDto): Promise<ProcedurePricing & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }>;
    update(id: string, dto: UpdateProcedurePricingDto): Promise<ProcedurePricing & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }>;
    remove(id: string): Promise<void>;
    bulkUpdate(items: ProcedurePricingItem[]): Promise<import("mongoose").MergeType<import("mongoose").Document<unknown, {}, ProcedurePricing, {}, {}> & ProcedurePricing & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, Omit<ProcedurePricingItem, "_id">>[]>;
}
export {};
