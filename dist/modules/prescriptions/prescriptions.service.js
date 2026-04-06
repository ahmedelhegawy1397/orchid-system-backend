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
exports.PrescriptionsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const objectid_1 = require("../../common/utils/objectid");
const prescription_schema_1 = require("./schemas/prescription.schema");
const prescriptions_gateway_1 = require("./prescriptions.gateway");
let PrescriptionsService = class PrescriptionsService {
    constructor(prescriptionModel, gateway) {
        this.prescriptionModel = prescriptionModel;
        this.gateway = gateway;
    }
    async findById(id) {
        const prescription = await this.prescriptionModel
            .findById((0, objectid_1.toObjectIdOrThrow)(id, 'id'))
            .populate('doctorId', 'name nameAr')
            .populate('appointmentId', 'date startTime')
            .lean();
        if (!prescription)
            throw new common_1.NotFoundException('Prescription not found');
        return prescription;
    }
    async updateById(id, dto) {
        const prescription = await this.prescriptionModel
            .findByIdAndUpdate((0, objectid_1.toObjectIdOrThrow)(id, 'id'), { $set: dto }, { new: true })
            .populate('doctorId', 'name nameAr')
            .populate('appointmentId', 'date startTime')
            .lean();
        if (!prescription)
            throw new common_1.NotFoundException('Prescription not found');
        this.gateway.emitPrescriptionUpdated(prescription);
        this.gateway.emitPrescriptionsListUpdated();
        return prescription;
    }
    async removeById(id) {
        const deleted = await this.prescriptionModel.findByIdAndDelete((0, objectid_1.toObjectIdOrThrow)(id, 'id'));
        if (!deleted)
            throw new common_1.NotFoundException('Prescription not found');
        this.gateway.emitPrescriptionDeleted(id);
        this.gateway.emitPrescriptionsListUpdated();
    }
    async findAll() {
        return this.prescriptionModel
            .find()
            .populate('doctorId', 'name nameAr')
            .populate('appointmentId', 'date startTime')
            .sort({ createdAt: -1 })
            .lean();
    }
    async create(dto) {
        const appointmentId = dto.appointmentId ? (0, objectid_1.toObjectIdOrUndefined)(dto.appointmentId) : undefined;
        if (dto.appointmentId && !appointmentId) {
            throw new common_1.BadRequestException('appointmentId must be a valid MongoDB ObjectId (24 hex characters)');
        }
        const prescription = await this.prescriptionModel.create({
            doctorId: (0, objectid_1.toObjectIdOrThrow)(dto.doctorId, 'doctorId'),
            appointmentId,
            medication: dto.medication,
            strength: dto.strength,
            form: dto.form,
            dosage: dto.dosage,
            duration: dto.duration,
            notes: dto.notes,
        });
        const result = await this.prescriptionModel
            .findById(prescription._id)
            .populate('doctorId', 'name nameAr')
            .populate('appointmentId', 'date startTime')
            .lean();
        this.gateway.emitPrescriptionCreated(result);
        this.gateway.emitPrescriptionsListUpdated();
        return result;
    }
};
exports.PrescriptionsService = PrescriptionsService;
exports.PrescriptionsService = PrescriptionsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(prescription_schema_1.Prescription.name)),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => prescriptions_gateway_1.PrescriptionsGateway))),
    __metadata("design:paramtypes", [mongoose_2.Model,
        prescriptions_gateway_1.PrescriptionsGateway])
], PrescriptionsService);
//# sourceMappingURL=prescriptions.service.js.map