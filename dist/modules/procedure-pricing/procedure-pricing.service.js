"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcedurePricingService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const procedure_pricing_schema_1 = require("./schemas/procedure-pricing.schema");
const procedure_pricing_gateway_1 = require("./procedure-pricing.gateway");
let ProcedurePricingService = class ProcedurePricingService {
    constructor(procedurePricingModel, gateway) {
        this.procedurePricingModel = procedurePricingModel;
        this.gateway = gateway;
    }
    async findAll() {
        return this.procedurePricingModel.find().sort({ procedure: 1 }).lean();
    }
    async findOne(id) {
        const doc = await this.procedurePricingModel.findById(id).lean();
        if (!doc)
            throw new common_1.NotFoundException('Procedure pricing not found');
        return doc;
    }
    async create(dto) {
        const existing = await this.procedurePricingModel.findOne({ procedure: dto.procedure.trim() });
        if (existing)
            throw new common_1.ConflictException(`Procedure "${dto.procedure}" already exists`);
        const created = await this.procedurePricingModel.create(dto);
        const result = created.toObject();
        this.gateway.emitProcedurePricingCreated(result);
        this.gateway.emitProcedurePricingListUpdated();
        return result;
    }
    async update(id, dto) {
        const doc = await this.procedurePricingModel.findById(id);
        if (!doc)
            throw new common_1.NotFoundException('Procedure pricing not found');
        if (dto.procedure !== undefined) {
            const duplicate = await this.procedurePricingModel.findOne({
                procedure: dto.procedure.trim(),
                _id: { $ne: new mongoose_2.Types.ObjectId(id) },
            });
            if (duplicate)
                throw new common_1.ConflictException(`Procedure "${dto.procedure}" already exists`);
        }
        Object.assign(doc, dto);
        await doc.save();
        const result = doc.toObject();
        this.gateway.emitProcedurePricingUpdated(result);
        this.gateway.emitProcedurePricingListUpdated();
        return result;
    }
    async remove(id) {
        const result = await this.procedurePricingModel.findByIdAndDelete(id);
        if (!result)
            throw new common_1.NotFoundException('Procedure pricing not found');
        this.gateway.emitProcedurePricingDeleted(id);
        this.gateway.emitProcedurePricingListUpdated();
    }
    async bulkUpdate(items) {
        await this.procedurePricingModel.deleteMany({});
        const inserted = await this.procedurePricingModel.insertMany(items);
        this.gateway.emitProcedurePricingBulkUpdated(inserted.length);
        this.gateway.emitProcedurePricingListUpdated();
        return inserted;
    }
};
exports.ProcedurePricingService = ProcedurePricingService;
exports.ProcedurePricingService = ProcedurePricingService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(procedure_pricing_schema_1.ProcedurePricing.name)),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => procedure_pricing_gateway_1.ProcedurePricingGateway))),
    __metadata("design:paramtypes", [mongoose_2.Model,
        procedure_pricing_gateway_1.ProcedurePricingGateway])
], ProcedurePricingService);
//# sourceMappingURL=procedure-pricing.service.js.map