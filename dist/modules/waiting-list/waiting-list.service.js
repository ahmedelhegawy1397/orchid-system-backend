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
exports.WaitingListService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const objectid_1 = require("../../common/utils/objectid");
const waiting_list_item_schema_1 = require("./schemas/waiting-list-item.schema");
const patients_gateway_1 = require("../patients/patients.gateway");
let WaitingListService = class WaitingListService {
    constructor(waitingListModel, patientsGateway) {
        this.waitingListModel = waitingListModel;
        this.patientsGateway = patientsGateway;
    }
    async findAll() {
        return this.waitingListModel.find().populate('patientId', 'name nameAr phone').populate('doctorId', 'name nameAr').sort({ preferredDate: 1, urgency: -1 }).lean();
    }
    async create(dto) {
        const patientId = (0, objectid_1.toObjectIdOrThrow)(dto.patientId, 'patientId');
        const doctorId = dto.doctorId ? (0, objectid_1.toObjectIdOrThrow)(dto.doctorId, 'doctorId') : undefined;
        const item = await this.waitingListModel.create({
            ...dto,
            patientId,
            doctorId,
        });
        const result = await this.waitingListModel.findById(item._id).populate('patientId', 'name nameAr phone').populate('doctorId', 'name nameAr').lean();
        this.patientsGateway.emitPatientUpdated(patientId.toString(), { nextAppointmentUpdated: true });
        return result;
    }
    async remove(id) {
        const deleted = await this.waitingListModel.findByIdAndDelete((0, objectid_1.toObjectIdOrThrow)(id, 'id'));
        if (!deleted)
            throw new common_1.NotFoundException('Waiting list item not found');
        const patientId = deleted.patientId;
        if (patientId) {
            this.patientsGateway.emitPatientUpdated(patientId.toString(), { nextAppointmentUpdated: true });
        }
    }
};
exports.WaitingListService = WaitingListService;
exports.WaitingListService = WaitingListService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(waiting_list_item_schema_1.WaitingListItem.name)),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => patients_gateway_1.PatientsGateway))),
    __metadata("design:paramtypes", [mongoose_2.Model,
        patients_gateway_1.PatientsGateway])
], WaitingListService);
//# sourceMappingURL=waiting-list.service.js.map