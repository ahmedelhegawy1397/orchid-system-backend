import { PatientTransfersService } from './patient-transfers.service';
import { TransferPatientDto } from './dto/transfer-patient.dto';
export declare class PatientTransfersController {
    private readonly patientTransfersService;
    constructor(patientTransfersService: PatientTransfersService);
    transfer(id: string, dto: TransferPatientDto, user: {
        id: string;
    }): Promise<(import("mongoose").FlattenMaps<import("./schemas/patient-transfer.schema").PatientTransfer> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
    findByPatient(id: string): Promise<(import("mongoose").FlattenMaps<import("./schemas/patient-transfer.schema").PatientTransfer> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
}
