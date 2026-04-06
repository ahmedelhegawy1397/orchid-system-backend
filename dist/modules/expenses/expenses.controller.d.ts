import { ExpensesService } from './expenses.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { ExpenseFilterQueryDto } from './dto/expense-filter-query.dto';
import { CurrentUserPayload } from '../../common/decorators/current-user.decorator';
export declare class ExpensesController {
    private readonly expensesService;
    constructor(expensesService: ExpensesService);
    findAll(query: ExpenseFilterQueryDto, user?: CurrentUserPayload): Promise<(import("mongoose").FlattenMaps<import("./schemas/expense.schema").Expense> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    create(dto: CreateExpenseDto, user?: CurrentUserPayload): Promise<(import("mongoose").FlattenMaps<import("./schemas/expense.schema").Expense> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
    update(id: string, dto: UpdateExpenseDto, user?: CurrentUserPayload): Promise<(import("mongoose").FlattenMaps<import("./schemas/expense.schema").Expense> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
    remove(id: string, user?: CurrentUserPayload): Promise<void>;
}
