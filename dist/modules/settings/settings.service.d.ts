import { Model } from 'mongoose';
import { ClinicSettings } from './schemas/clinic-settings.schema';
import { UpdateSettingsDto } from './dto/update-settings.dto';
import { SettingsGateway } from './settings.gateway';
export declare class SettingsService {
    private clinicSettingsModel;
    private readonly gateway;
    constructor(clinicSettingsModel: Model<ClinicSettings>, gateway: SettingsGateway);
    get(): Promise<import("mongoose").FlattenMaps<ClinicSettings> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    update(dto: UpdateSettingsDto): Promise<import("mongoose").FlattenMaps<ClinicSettings> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
}
