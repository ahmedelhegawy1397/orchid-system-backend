import { AppointmentStatus } from '../../../enums';
import { CreateAppointmentDto } from './create-appointment.dto';
declare class AppointmentStatusDto {
    status?: AppointmentStatus;
}
declare const UpdateAppointmentDto_base: import("@nestjs/common").Type<Partial<CreateAppointmentDto> & Partial<AppointmentStatusDto>>;
export declare class UpdateAppointmentDto extends UpdateAppointmentDto_base {
}
export {};
