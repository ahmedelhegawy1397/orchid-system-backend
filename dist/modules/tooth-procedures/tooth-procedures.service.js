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
exports.ToothProceduresService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const objectid_1 = require("../../common/utils/objectid");
const tooth_procedure_schema_1 = require("./schemas/tooth-procedure.schema");
const patients_gateway_1 = require("../patients/patients.gateway");
let ToothProceduresService = class ToothProceduresService {
    constructor(toothProcedureModel, patientsGateway) {
        this.toothProcedureModel = toothProcedureModel;
        this.patientsGateway = patientsGateway;
    }
    async findByPatient(patientId) {
        const procedures = await this.toothProcedureModel
            .find({ patientId: (0, objectid_1.toObjectIdOrThrow)(patientId, 'patientId') })
            .populate('doctorId', 'name nameAr')
            .sort({ date: -1 })
            .lean();
        const proceduresWithDefaults = procedures.map(p => ({
            ...p,
            isPediatric: p.isPediatric ?? false,
        }));
        const byTooth = {};
        for (const p of proceduresWithDefaults) {
            const nums = (p.toothNumbers && p.toothNumbers.length > 0)
                ? p.toothNumbers
                : p.toothNumber != null ? [p.toothNumber] : [];
            for (const num of nums) {
                if (!byTooth[num])
                    byTooth[num] = [];
                byTooth[num].push(p);
            }
        }
        return { procedures: proceduresWithDefaults, byTooth };
    }
    async create(patientId, dto) {
        const appointmentId = dto.appointmentId ? (0, objectid_1.toObjectIdOrUndefined)(dto.appointmentId) : undefined;
        if (dto.appointmentId && !appointmentId) {
            throw new common_1.BadRequestException('appointmentId must be a valid MongoDB ObjectId (24 hex characters)');
        }
        let toothNumbers = [];
        if (dto.toothNumber !== undefined && dto.toothNumber !== null) {
            toothNumbers = Array.isArray(dto.toothNumber) ? dto.toothNumber : [dto.toothNumber];
        }
        const { toothNumber, procedureType, ...rest } = dto;
        const procedure = await this.toothProcedureModel.create({
            ...rest,
            toothNumbers,
            procedureType,
            patientId: (0, objectid_1.toObjectIdOrThrow)(patientId, 'patientId'),
            doctorId: (0, objectid_1.toObjectIdOrThrow)(dto.doctorId, 'doctorId'),
            appointmentId,
            currency: dto.currency ?? 'EGP',
            isPediatric: dto.isPediatric ?? false,
            isComplete: dto.isComplete ?? false,
            isLab: dto.isLab ?? false,
        });
        const populatedProcedure = await this.toothProcedureModel.findById(procedure._id).populate('doctorId', 'name nameAr').lean();
        this.patientsGateway.emitProcedureAdded(patientId, populatedProcedure);
        return populatedProcedure;
    }
    async update(id, dto) {
        const idObj = (0, objectid_1.toObjectIdOrThrow)(id, 'id');
        const procedure = await this.toothProcedureModel.findById(idObj);
        if (!procedure)
            throw new common_1.NotFoundException('Tooth procedure not found');
        if (dto.notes !== undefined)
            procedure.notes = dto.notes;
        if (dto.isComplete !== undefined)
            procedure.isComplete = dto.isComplete;
        if (dto.isLab !== undefined)
            procedure.isLab = dto.isLab;
        await procedure.save();
        const updatedProcedure = await this.toothProcedureModel.findById(idObj).populate('doctorId', 'name nameAr').lean();
        this.patientsGateway.emitProcedureUpdated(procedure.patientId.toString(), updatedProcedure);
        return updatedProcedure;
    }
    async remove(id) {
        const deleted = await this.toothProcedureModel.findByIdAndDelete((0, objectid_1.toObjectIdOrThrow)(id, 'id'));
        if (!deleted)
            throw new common_1.NotFoundException('Tooth procedure not found');
        this.patientsGateway.emitProcedureDeleted(deleted.patientId.toString(), id);
    }
};
exports.ToothProceduresService = ToothProceduresService;
exports.ToothProceduresService = ToothProceduresService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(tooth_procedure_schema_1.ToothProcedure.name)),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => patients_gateway_1.PatientsGateway))),
    __metadata("design:paramtypes", [mongoose_2.Model,
        patients_gateway_1.PatientsGateway])
], ToothProceduresService);
//# sourceMappingURL=tooth-procedures.service.js.map