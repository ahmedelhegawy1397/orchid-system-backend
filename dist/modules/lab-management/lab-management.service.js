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
exports.LabManagementService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const lab_record_schema_1 = require("./schemas/lab-record.schema");
const objectid_1 = require("../../common/utils/objectid");
const lab_management_gateway_1 = require("./lab-management.gateway");
let LabManagementService = class LabManagementService {
    constructor(labRecordModel, labManagementGateway) {
        this.labRecordModel = labRecordModel;
        this.labManagementGateway = labManagementGateway;
    }
    async create(dto) {
        const record = await this.labRecordModel.create({
            doctorId: (0, objectid_1.toObjectIdOrThrow)(dto.doctorId, 'doctorId'),
            patientId: (0, objectid_1.toObjectIdOrThrow)(dto.patientId, 'patientId'),
            teethNumbers: dto.teethNumbers || [],
            toothCount: dto.toothCount || 0,
            procedure: dto.procedure,
            price: dto.price,
            notes: dto.notes,
            date: dto.date,
        });
        const populated = await this.labRecordModel
            .findById(record._id)
            .populate('doctorId', 'name nameAr')
            .populate('patientId', 'name nameAr phone')
            .lean();
        this.labManagementGateway.emitLabRecordCreated(populated);
        return populated;
    }
    async findAll(query) {
        const filter = {};
        if (query.patientId) {
            filter.patientId = (0, objectid_1.toObjectIdOrThrow)(query.patientId, 'patientId');
        }
        if (query.doctorId) {
            filter.doctorId = (0, objectid_1.toObjectIdOrThrow)(query.doctorId, 'doctorId');
        }
        if (query.status) {
            filter.status = query.status;
        }
        if (query.startDate || query.endDate) {
            filter.date = {};
            if (query.startDate) {
                filter.date.$gte = query.startDate;
            }
            if (query.endDate) {
                filter.date.$lte = query.endDate;
            }
        }
        const records = await this.labRecordModel
            .find(filter)
            .populate('doctorId', 'name nameAr')
            .populate('patientId', 'name nameAr phone')
            .sort({ date: -1, createdAt: -1 })
            .lean();
        const totalPrice = records.reduce((sum, record) => sum + (record.price || 0), 0);
        return {
            records,
            totalPrice,
            count: records.length,
        };
    }
    async findOne(id) {
        const record = await this.labRecordModel
            .findById((0, objectid_1.toObjectIdOrThrow)(id, 'id'))
            .populate('doctorId', 'name nameAr')
            .populate('patientId', 'name nameAr phone')
            .lean();
        if (!record) {
            throw new common_1.NotFoundException('Lab record not found');
        }
        return record;
    }
    async update(id, dto) {
        const idObj = (0, objectid_1.toObjectIdOrThrow)(id, 'id');
        const record = await this.labRecordModel.findById(idObj);
        if (!record) {
            throw new common_1.NotFoundException('Lab record not found');
        }
        if (dto.doctorId)
            record.doctorId = (0, objectid_1.toObjectIdOrThrow)(dto.doctorId, 'doctorId');
        if (dto.patientId)
            record.patientId = (0, objectid_1.toObjectIdOrThrow)(dto.patientId, 'patientId');
        if (dto.teethNumbers !== undefined)
            record.teethNumbers = dto.teethNumbers;
        if (dto.toothCount !== undefined)
            record.toothCount = dto.toothCount;
        if (dto.procedure !== undefined)
            record.procedure = dto.procedure;
        if (dto.price !== undefined)
            record.price = dto.price;
        if (dto.notes !== undefined)
            record.notes = dto.notes;
        if (dto.date !== undefined)
            record.date = dto.date;
        if (dto.status !== undefined) {
            record.status = dto.status;
            if (dto.status === 'completed') {
                record.completedAt = dto.completedAt || new Date().toISOString().split('T')[0];
            }
            else if (dto.status === 'pending') {
                record.completedAt = null;
            }
        }
        else if (dto.completedAt !== undefined) {
            record.completedAt = dto.completedAt;
        }
        await record.save();
        const updated = await this.labRecordModel
            .findById(idObj)
            .populate('doctorId', 'name nameAr')
            .populate('patientId', 'name nameAr phone')
            .lean();
        this.labManagementGateway.emitLabRecordUpdated(updated);
        return updated;
    }
    async remove(id) {
        const deleted = await this.labRecordModel.findByIdAndDelete((0, objectid_1.toObjectIdOrThrow)(id, 'id'));
        if (!deleted) {
            throw new common_1.NotFoundException('Lab record not found');
        }
        this.labManagementGateway.emitLabRecordDeleted(id);
        return { message: 'Lab record deleted successfully' };
    }
};
exports.LabManagementService = LabManagementService;
exports.LabManagementService = LabManagementService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(lab_record_schema_1.LabRecord.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        lab_management_gateway_1.LabManagementGateway])
], LabManagementService);
//# sourceMappingURL=lab-management.service.js.map