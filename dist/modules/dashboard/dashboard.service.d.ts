import { Model, Types } from 'mongoose';
import { Invoice } from '../invoices/schemas/invoice.schema';
import { InvoicePayment } from '../invoices/schemas/invoice-payment.schema';
import { Expense } from '../expenses/schemas/expense.schema';
import { Appointment } from '../appointments/schemas/appointment.schema';
import { Doctor } from '../doctors/schemas/doctor.schema';
import { User } from '../auth/schemas/user.schema';
import { DashboardFilterQueryDto } from './dto/dashboard-filter-query.dto';
export declare class DashboardService {
    private invoiceModel;
    private invoicePaymentModel;
    private expenseModel;
    private appointmentModel;
    private doctorModel;
    constructor(invoiceModel: Model<Invoice>, invoicePaymentModel: Model<InvoicePayment>, expenseModel: Model<Expense>, appointmentModel: Model<Appointment>, doctorModel: Model<Doctor>);
    getDashboardStats(currentUser: User | undefined, filters: DashboardFilterQueryDto): Promise<{
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
    private getAppointmentsStats;
    private getRevenueStats;
    private getExpensesStats;
    getAvailableDoctors(): Promise<{
        _id: Types.ObjectId;
        name: string;
        nameAr: string;
        specialty: string;
        specialtyAr: string;
        color: import("../../enums").DoctorColor;
    }[]>;
}
