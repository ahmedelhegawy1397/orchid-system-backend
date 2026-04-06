import { SettingsService } from './settings.service';
import { UpdateSettingsDto } from './dto/update-settings.dto';
export declare class SettingsController {
    private readonly settingsService;
    constructor(settingsService: SettingsService);
    get(): Promise<import("mongoose").FlattenMaps<import("./schemas/clinic-settings.schema").ClinicSettings> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    update(dto: UpdateSettingsDto): Promise<import("mongoose").FlattenMaps<import("./schemas/clinic-settings.schema").ClinicSettings> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
}
