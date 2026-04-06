import { Model } from 'mongoose';
import { Expense } from './schemas/expense.schema';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { AccountingGateway } from '../accounting/accounting.gateway';
import { DashboardGateway } from '../dashboard/dashboard.gateway';
export declare class ExpensesService {
    private expenseModel;
    private accountingGateway;
    private dashboardGateway;
    constructor(expenseModel: Model<Expense>, accountingGateway: AccountingGateway, dashboardGateway: DashboardGateway);
    findAll(query: {
        date?: string;
        startDate?: string;
        endDate?: string;
        createdBy?: string;
        category?: string;
    }, userId?: string): Promise<(import("mongoose").FlattenMaps<Expense> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    create(dto: CreateExpenseDto, userId: string): Promise<(import("mongoose").FlattenMaps<Expense> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
    update(id: string, dto: UpdateExpenseDto, userId: string, isOwnerOrAdmin: boolean): Promise<(import("mongoose").FlattenMaps<Expense> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
    remove(id: string, userId: string, isOwnerOrAdmin: boolean): Promise<void>;
}
