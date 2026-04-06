import { AccountingService } from './accounting.service';
import { AccountingFilterQueryDto } from './dto/accounting-filter-query.dto';
import { CurrentUserPayload } from '../../common/decorators/current-user.decorator';
export declare class AccountingController {
    private readonly accountingService;
    constructor(accountingService: AccountingService);
    getAccountingSummary(query: AccountingFilterQueryDto, user?: CurrentUserPayload): Promise<{
        collected: number;
        collectedByPaymentMethod: {
            cash: number;
            vodafoneCash: number;
            instapay: number;
        };
        totalRevenue: number;
        expenses: number;
        afterExpenses: number;
        pendingBalance: number;
        pendingInvoices: number;
        totalInvoices: number;
        totalDiscounts: number;
        labFees: number;
        doctorShare: number;
        clinicShare: number;
        availableDays: number[];
    }>;
}
