import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { CurrentUserPayload } from '../../common/decorators/current-user.decorator';
export declare class AppointmentsController {
    private readonly appointmentsService;
    constructor(appointmentsService: AppointmentsService);
    findAll(date?: string, doctorId?: string, patientId?: string, status?: string, user?: CurrentUserPayload): Promise<(import("mongoose").FlattenMaps<import("./schemas/appointment.schema").Appointment> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    create(dto: CreateAppointmentDto, user?: CurrentUserPayload): Promise<(import("mongoose").FlattenMaps<import("./schemas/appointment.schema").Appointment> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
    update(id: string, dto: UpdateAppointmentDto, user?: CurrentUserPayload): Promise<(import("mongoose").FlattenMaps<import("./schemas/appointment.schema").Appointment> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
    cancel(id: string, user?: CurrentUserPayload): Promise<import("./schemas/appointment.schema").Appointment & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    remove(id: string, user?: CurrentUserPayload): Promise<{
        deleted: boolean;
        id: string;
    }>;
}
