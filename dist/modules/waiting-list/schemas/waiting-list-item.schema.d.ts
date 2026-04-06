import { Document, Types } from 'mongoose';
import { WaitingUrgency } from '../../../enums';
export declare class WaitingListItem extends Document {
    patientId: Types.ObjectId;
    doctorId?: Types.ObjectId;
    preferredDate: string;
    preferredTimeRange?: string;
    urgency: WaitingUrgency;
    notes?: string;
    duration?: number;
}
export declare const WaitingListItemSchema: import("mongoose").Schema<WaitingListItem, import("mongoose").Model<WaitingListItem, any, any, any, Document<unknown, any, WaitingListItem, any, {}> & WaitingListItem & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, WaitingListItem, Document<unknown, {}, import("mongoose").FlatRecord<WaitingListItem>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<WaitingListItem> & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}>;
