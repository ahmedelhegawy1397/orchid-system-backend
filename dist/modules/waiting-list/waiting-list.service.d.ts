import { Model } from 'mongoose';
import { WaitingListItem } from './schemas/waiting-list-item.schema';
import { CreateWaitingListItemDto } from './dto/create-waiting-list-item.dto';
import { PatientsGateway } from '../patients/patients.gateway';
export declare class WaitingListService {
    private waitingListModel;
    private readonly patientsGateway;
    constructor(waitingListModel: Model<WaitingListItem>, patientsGateway: PatientsGateway);
    findAll(): Promise<(import("mongoose").FlattenMaps<WaitingListItem> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    create(dto: CreateWaitingListItemDto): Promise<(import("mongoose").FlattenMaps<WaitingListItem> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
    remove(id: string): Promise<void>;
}
