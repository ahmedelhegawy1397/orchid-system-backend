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
exports.SeedService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const clinic_settings_schema_1 = require("../../modules/settings/schemas/clinic-settings.schema");
const procedure_pricing_schema_1 = require("../../modules/procedure-pricing/schemas/procedure-pricing.schema");
const doctor_schema_1 = require("../../modules/doctors/schemas/doctor.schema");
const enums_1 = require("../../enums");
const WORKING_HOURS = {
    sunday: { open: '09:00', close: '17:00', isOpen: true },
    monday: { open: '09:00', close: '17:00', isOpen: true },
    tuesday: { open: '09:00', close: '17:00', isOpen: true },
    wednesday: { open: '09:00', close: '17:00', isOpen: true },
    thursday: { open: '09:00', close: '17:00', isOpen: true },
    friday: { open: '00:00', close: '00:00', isOpen: false },
    saturday: { open: '09:00', close: '14:00', isOpen: true },
};
const SEED_DOCTORS = [
    { name: 'Dr. Ahmed Hassan', nameAr: 'د. أحمد حسن', specialty: 'General Dentistry', specialtyAr: 'طب الأسنان العام', color: enums_1.DoctorColor.Orchid, isOwner: true, role: enums_1.DoctorRole.Owner, clinicSharePercent: 20, doctorSharePercent: 80 },
    { name: 'Dr. Sara Mohamed', nameAr: 'د. سارة محمد', specialty: 'Orthodontics', specialtyAr: 'تقويم الأسنان', color: enums_1.DoctorColor.Emerald, isOwner: false, role: enums_1.DoctorRole.Doctor, clinicSharePercent: 20, doctorSharePercent: 80 },
    { name: 'Dr. Omar Khalil', nameAr: 'د. عمر خليل', specialty: 'Oral Surgery', specialtyAr: 'جراحة الفم', color: enums_1.DoctorColor.Amber, isOwner: false, role: enums_1.DoctorRole.Doctor, clinicSharePercent: 20, doctorSharePercent: 80 },
];
const PROCEDURE_PRICINGS = [
    { procedure: 'Consultation', procedureAr: 'استشارة', basePrice: 200 },
    { procedure: 'Scaling & Polishing', procedureAr: 'تنظيف وتلميع', basePrice: 800 },
    { procedure: 'Composite Filling', procedureAr: 'حشو مركب', basePrice: 500 },
    { procedure: 'Root Canal Treatment', procedureAr: 'علاج الجذر', basePrice: 1500 },
    { procedure: 'Crown (Zirconia)', procedureAr: 'تاج زركونيا', basePrice: 2500 },
    { procedure: 'Extraction', procedureAr: 'خلع', basePrice: 400 },
    { procedure: 'Implant', procedureAr: 'زراعة', basePrice: 8000 },
    { procedure: 'Braces (Full)', procedureAr: 'تقويم كامل', basePrice: 15000 },
    { procedure: 'Braces Adjustment', procedureAr: 'ضبط تقويم', basePrice: 600 },
    { procedure: 'Teeth Whitening', procedureAr: 'تبييض الأسنان', basePrice: 2000 },
];
let SeedService = class SeedService {
    constructor(clinicSettingsModel, procedurePricingModel, doctorModel) {
        this.clinicSettingsModel = clinicSettingsModel;
        this.procedurePricingModel = procedurePricingModel;
        this.doctorModel = doctorModel;
    }
    async onModuleInit() {
        await this.seedIfNeeded();
    }
    async seedIfNeeded() {
        const existing = await this.clinicSettingsModel.findOne();
        if (!existing) {
            await this.clinicSettingsModel.create({
                name: 'Orchid Dental Clinic',
                nameAr: 'عيادة أوركيد للأسنان',
                address: '',
                phone: '',
                email: '',
                workingHours: WORKING_HOURS,
                appointmentDurations: [15, 30, 45, 60, 90, 120],
                sterilizationBuffer: 10,
                clinicSharePercentage: 20,
                currency: 'EGP',
            });
            console.log('ClinicSettings seeded (first run)');
        }
        if ((await this.procedurePricingModel.countDocuments()) === 0) {
            await this.procedurePricingModel.insertMany(PROCEDURE_PRICINGS);
            console.log('ProcedurePricing seeded');
        }
        if ((await this.doctorModel.countDocuments()) === 0) {
            await this.doctorModel.insertMany(SEED_DOCTORS);
            console.log('Doctors seeded (use GET /api/doctors for IDs when registering doctor/assistant)');
        }
    }
};
exports.SeedService = SeedService;
exports.SeedService = SeedService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(clinic_settings_schema_1.ClinicSettings.name)),
    __param(1, (0, mongoose_1.InjectModel)(procedure_pricing_schema_1.ProcedurePricing.name)),
    __param(2, (0, mongoose_1.InjectModel)(doctor_schema_1.Doctor.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], SeedService);
//# sourceMappingURL=seed.service.js.map