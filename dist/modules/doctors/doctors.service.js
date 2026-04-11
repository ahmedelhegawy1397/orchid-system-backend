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
exports.DoctorsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const doctor_schema_1 = require("./schemas/doctor.schema");
const doctors_gateway_1 = require("./doctors.gateway");
function ensurePercentSum(clinic, doctor) {
    const c = clinic ?? (doctor != null ? 100 - doctor : 20);
    const d = doctor ?? (clinic != null ? 100 - clinic : 80);
    if (c + d !== 100) {
        throw new common_1.BadRequestException('clinicSharePercent and doctorSharePercent must sum to 100');
    }
    return { clinicSharePercent: c, doctorSharePercent: d };
}
let DoctorsService = class DoctorsService {
    constructor(doctorModel, gateway) {
        this.doctorModel = doctorModel;
        this.gateway = gateway;
    }
    async findAll() {
        return this.doctorModel.find().lean();
    }
    async findOne(id) {
        const doc = await this.doctorModel.findById(id).lean();
        if (!doc)
            throw new common_1.NotFoundException('Doctor not found');
        return doc;
    }
    async create(dto) {
        const { clinicSharePercent, doctorSharePercent } = ensurePercentSum(dto.clinicSharePercent, dto.doctorSharePercent);
        const doc = await this.doctorModel.create({
            name: dto.name.trim(),
            nameAr: dto.nameAr.trim(),
            specialty: dto.specialty.trim(),
            specialtyAr: dto.specialtyAr.trim(),
            color: dto.color,
            isOwner: dto.isOwner,
            role: dto.role,
            clinicSharePercent,
            doctorSharePercent,
        });
        const result = doc.toObject();
        this.gateway.emitDoctorCreated(result);
        this.gateway.emitDoctorsListUpdated();
        return result;
    }
    async update(id, dto) {
        const doc = await this.doctorModel.findById(id);
        if (!doc)
            throw new common_1.NotFoundException('Doctor not found');
        const clinic = dto.clinicSharePercent ?? doc.clinicSharePercent ?? 20;
        const doctor = dto.doctorSharePercent ?? doc.doctorSharePercent ?? 80;
        const { clinicSharePercent, doctorSharePercent } = ensurePercentSum(clinic, doctor);
        if (dto.name !== undefined)
            doc.name = dto.name.trim();
        if (dto.nameAr !== undefined)
            doc.nameAr = dto.nameAr.trim();
        if (dto.specialty !== undefined)
            doc.specialty = dto.specialty.trim();
        if (dto.specialtyAr !== undefined)
            doc.specialtyAr = dto.specialtyAr.trim();
        if (dto.color !== undefined)
            doc.color = dto.color;
        if (dto.isOwner !== undefined)
            doc.isOwner = dto.isOwner;
        if (dto.role !== undefined)
            doc.role = dto.role;
        doc.clinicSharePercent = clinicSharePercent;
        doc.doctorSharePercent = doctorSharePercent;
        await doc.save();
        const result = doc.toObject();
        this.gateway.emitDoctorUpdated(result);
        this.gateway.emitDoctorsListUpdated();
        return result;
    }
    async remove(id) {
        const doc = await this.doctorModel.findById(id);
        if (!doc)
            throw new common_1.NotFoundException('Doctor not found');
        const doctorId = new mongoose_2.Types.ObjectId(id);
        const [appointments, invoices, patients] = await Promise.all([
            this.doctorModel.db.collection('appointments').countDocuments({ doctorId }),
            this.doctorModel.db.collection('invoices').countDocuments({ doctorId }),
            this.doctorModel.db.collection('patients').countDocuments({ assignedDoctorId: doctorId }),
        ]);
        if (appointments > 0 || invoices > 0 || patients > 0) {
            throw new common_1.BadRequestException('Cannot delete doctor: they have linked appointments, invoices, or assigned patients. Reassign or remove those first.');
        }
        await this.doctorModel.findByIdAndDelete(id);
        this.gateway.emitDoctorDeleted(id);
        this.gateway.emitDoctorsListUpdated();
    }
};
exports.DoctorsService = DoctorsService;
exports.DoctorsService = DoctorsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(doctor_schema_1.Doctor.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        doctors_gateway_1.DoctorsGateway])
], DoctorsService);
//# sourceMappingURL=doctors.service.js.map