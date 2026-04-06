import { DashboardService } from './dashboard.service';
import { DashboardFilterQueryDto } from './dto/dashboard-filter-query.dto';
import { User } from '../auth/schemas/user.schema';
export declare class DashboardController {
    private readonly dashboardService;
    constructor(dashboardService: DashboardService);
    getDashboardStats(user: User | undefined, filters: DashboardFilterQueryDto): Promise<{
        date: string;
        doctorId: string | null;
        appointments: {
            total: number;
            byStatus: {
                scheduled: number;
                completed: number;
                cancelled: number;
                noShow: number;
                inProgress: number;
            };
        };
        revenue: {
            totalPaid: any;
            paymentCount: any;
        };
        expenses: {
            totalExpenses: any;
            expenseCount: any;
            byCategory: {
                category: any;
                categoryAr: any;
                total: any;
                count: any;
            }[];
        };
    }>;
    getAvailableDoctors(): Promise<{
        _id: import("mongoose").Types.ObjectId;
        name: string;
        nameAr: string;
        specialty: string;
        specialtyAr: string;
        color: import("../../enums").DoctorColor;
    }[]>;
}
