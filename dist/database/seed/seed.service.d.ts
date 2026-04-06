import { OnModuleInit } from '@nestjs/common';
import { Model } from 'mongoose';
import { ClinicSettings } from '../../modules/settings/schemas/clinic-settings.schema';
import { ProcedurePricing } from '../../modules/procedure-pricing/schemas/procedure-pricing.schema';
import { Doctor } from '../../modules/doctors/schemas/doctor.schema';
export declare class SeedService implements OnModuleInit {
    private clinicSettingsModel;
    private procedurePricingModel;
    private doctorModel;
    constructor(clinicSettingsModel: Model<ClinicSettings>, procedurePricingModel: Model<ProcedurePricing>, doctorModel: Model<Doctor>);
    onModuleInit(): Promise<void>;
    seedIfNeeded(): Promise<void>;
}
