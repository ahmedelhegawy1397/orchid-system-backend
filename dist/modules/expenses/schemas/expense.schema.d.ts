import { Document, Types } from 'mongoose';
import { ExpenseCategory } from '../../../enums';
export declare class Expense extends Document {
    category: ExpenseCategory;
    categoryAr: string;
    description?: string;
    amount: number;
    date: string;
    receiptUrl?: string;
    createdBy: Types.ObjectId;
    currency: string;
}
export declare const ExpenseSchema: import("mongoose").Schema<Expense, import("mongoose").Model<Expense, any, any, any, Document<unknown, any, Expense, any, {}> & Expense & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Expense, Document<unknown, {}, import("mongoose").FlatRecord<Expense>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<Expense> & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}>;
