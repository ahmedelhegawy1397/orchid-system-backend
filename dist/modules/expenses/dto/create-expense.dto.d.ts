import { ExpenseCategory } from '../../../enums';
export declare class CreateExpenseDto {
    category: ExpenseCategory;
    categoryAr: string;
    description?: string;
    amount: number;
    date: string;
    receiptUrl?: string;
    currency?: string;
}
