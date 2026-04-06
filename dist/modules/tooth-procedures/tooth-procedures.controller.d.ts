import { ToothProceduresService } from './tooth-procedures.service';
import { UpdateToothProcedureDto } from './dto/update-tooth-procedure.dto';
export declare class ToothProceduresController {
    private readonly toothProceduresService;
    constructor(toothProceduresService: ToothProceduresService);
    update(id: string, dto: UpdateToothProcedureDto): Promise<(import("mongoose").FlattenMaps<import("./schemas/tooth-procedure.schema").ToothProcedure> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
    remove(id: string): Promise<void>;
}
