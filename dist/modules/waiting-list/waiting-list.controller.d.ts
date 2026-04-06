import { WaitingListService } from './waiting-list.service';
import { CreateWaitingListItemDto } from './dto/create-waiting-list-item.dto';
export declare class WaitingListController {
    private readonly waitingListService;
    constructor(waitingListService: WaitingListService);
    findAll(): Promise<(import("mongoose").FlattenMaps<import("./schemas/waiting-list-item.schema").WaitingListItem> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    create(dto: CreateWaitingListItemDto): Promise<(import("mongoose").FlattenMaps<import("./schemas/waiting-list-item.schema").WaitingListItem> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
    remove(id: string): Promise<void>;
}
