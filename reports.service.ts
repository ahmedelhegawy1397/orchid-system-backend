import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { toObjectIdOrThrow } from '../../common/utils/objectid';
import { getWorkdayRangeFromDateRange } from '../../common/utils/date-range.util';
import { getCurrentShiftDate } from '../../common/utils/shift-date.util';
import { InvoicePayment } from '../invoices/schemas/invoice-payment.schema';
import { Expense } from '../expenses/schemas/expense.schema';
import { Invoice } from '../invoices/schemas/invoice.schema';
import { PaymentMethod, AppointmentStatus } from '../../enums';
import { ProcedurePricing } from '../procedure-pricing/schemas/procedure-pricing.schema';
import { Appointment } from '../appointments/schemas/appointment.schema';
import { Doctor } from '../doctors/schemas/doctor.schema';
import { LabRecord } from '../lab-management/schemas/lab-record.schema';
import { ReportsGateway } from './reports.gateway';

const PERIOD = {
  QUARTERLY: 'quarterly',
  WEEK: 'week',
  MONTH: 'month',
  SEMI_ANNUAL: 'semi_annual',
  YEAR: 'year',
} as const;

export type RevenueReportQuery = {
  startDate?: string;
  endDate?: string;
  doctorId?: string;
  period?: string;
};

type BreakdownItem = { count: number; totalAmount: number };

/** Line amount before invoice-level discount; uses stored total or unitPrice * quantity. */
function invoiceLineAmount(item: {
  total?: number;
  unitPrice?: number;
  quantity?: number;
}): number {
  if (item.total != null && !Number.isNaN(item.total)) return item.total;
  const q = item.quantity ?? 1;
  const up = item.unitPrice ?? 0;
  return q * up;
}

export type RevenueReportResult = {
  /** Sum of invoice subtotals (line totals before invoice-level discount). */
  totalSubtotal: number;
  /** Sum of invoice totals after discount (same as totalAfterDiscount). */
  totalRevenue: number;
  /** Alias for totalRevenue — amount after invoice-level discounts. */
  totalAfterDiscount: number;
  totalCollected: number;
  totalExpenses: number;
  netRevenue: number;
  labFees: number;
  pendingBalance: number;
  doctorShare: number;
  clinicShare: number;
  collectedByPaymentMethod: {
    cash: number;
    card: number;
    vodafoneCash: number;
    instapay: number;
  };
  procedureBreakdown: Array<BreakdownItem & { procedure: string }>;
  expenseBreakdown: Array<BreakdownItem & { category: string }>;
  expenses: Array<Record<string, unknown>>;
  dailyBreakdown: Array<{
    date: string;
    revenue: number;
    expenses: number;
    appointmentCount: number;
  }>;
};

export type PatientVisitAnalysisResult = {
  /** Patients with only one completed appointment ever, and it was in the selected date range */
  newPatients: number;
  /** Patients with 2+ completed appointments ever, and last appointment was in the selected date range */
  returningPatients: number;
  /** Patients with only one completed appointment ever, and it was before the selected date range */
  oneTimePatients: number;
  /** Patients with 2+ completed appointments ever, and last appointment was before the selected date range */
  notReturningPatients: number;
  /** Total patients who visited in the selected range (newPatients + returningPatients) */
  totalPatientsInRange: number;
  /** Total patients who haven't returned in the selected range (oneTimePatients + notReturningPatients) */
  totalPatientsNotReturning: number;
  dateRange: {
    start: string;
    end: string;
  };
};

@Injectable()
export class ReportsService {
  constructor(
    @InjectModel(InvoicePayment.name) private invoicePaymentModel: Model<InvoicePayment>,
    @InjectModel(Expense.name) private expenseModel: Model<Expense>,
    @InjectModel(Invoice.name) private invoiceModel: Model<Invoice>,
    @InjectModel(ProcedurePricing.name) private procedurePricingModel: Model<ProcedurePricing>,
    @InjectModel(Appointment.name) private appointmentModel: Model<Appointment>,
    @InjectModel(Doctor.name) private doctorModel: Model<Doctor>,
    @InjectModel(LabRecord.name) private labRecordModel: Model<LabRecord>,
    private configService: ConfigService,
    private readonly gateway: ReportsGateway,
  ) {}

  private getWorkdayBounds(startDate: string, endDate: string): { start: Date; end: Date } {
    const tz = this.configService.get<string>('clinicTimezone') ?? 'Africa/Cairo';
    const startHour = this.configService.get<number>('workdayStartHour') ?? 6;
    return getWorkdayRangeFromDateRange(startDate, endDate, tz, startHour);
  }

  /** Resolves start/end date from query (period or explicit dates). Defaults to last month. */
  private resolveDateRange(query: RevenueReportQuery): { start: string; end: string } {
    const tz = this.configService.get<string>('clinicTimezone') ?? 'Africa/Cairo';
    const shiftStartHour = this.configService.get<number>('workdayStartHour') ?? 6;
    const today = getCurrentShiftDate(tz, shiftStartHour);
    let start = query.startDate;
    let end = query.endDate;

    if (query.period === PERIOD.QUARTERLY && !start && !end) {
      end = today;
      const d = new Date(end);
      d.setMonth(d.getMonth() - 3);
      start = start ?? d.toISOString().slice(0, 10);
      return { start, end };
    }
    if (query.period === PERIOD.MONTH && !end) {
      end = today;
      const d = new Date(end);
      d.setMonth(d.getMonth() - 1);
      start = start ?? d.toISOString().slice(0, 10);
      return { start, end };
    }
    if (query.period === PERIOD.WEEK && !end) {
      end = today;
      const d = new Date(end);
      d.setDate(d.getDate() - 7);
      start = start ?? d.toISOString().slice(0, 10);
      return { start, end };
    }
    if (query.period === PERIOD.SEMI_ANNUAL && !end) {
      end = today;
      const d = new Date(end);
      d.setMonth(d.getMonth() - 6);
      start = start ?? d.toISOString().slice(0, 10);
      return { start, end };
    }
    if (query.period === PERIOD.YEAR && !end) {
      end = today;
      const d = new Date(end);
      d.setMonth(0);
      d.setDate(1);
      start = start ?? d.toISOString().slice(0, 10);
      return { start, end };
    }
    if (!start || !end) {
      end = end ?? today;
      const d = new Date(end);
      d.setMonth(d.getMonth() - 1);
      start = start ?? d.toISOString().slice(0, 10);
    }
    return { start, end };
  }

  async getRevenueReport(query: RevenueReportQuery): Promise<RevenueReportResult> {
    const { start, end } = this.resolveDateRange(query);
    const { start: dayStart, end: dayEnd } = this.getWorkdayBounds(start, end);
    const doctorIdFilter = query.doctorId ? { doctorId: toObjectIdOrThrow(query.doctorId, 'doctorId') } : {};
    
    // Only include expenses when no doctor filter is applied (all doctors view)
    const includeExpenses = !query.doctorId;

    const expensesQuery = includeExpenses
      ? this.expenseModel
          .find({
            $expr: {
              $and: [
                { $gte: [{ $substr: [{ $ifNull: ['$date', ''] }, 0, 10] }, start] },
                { $lte: [{ $substr: [{ $ifNull: ['$date', ''] }, 0, 10] }, end] },
              ],
            },
          })
          .lean()
      : Promise.resolve([] as Expense[]);

    // Get lab fees for the period
    const labFeesQuery = (async () => {
      const labFilter: any = {};
      
      if (query.doctorId) {
        labFilter.doctorId = toObjectIdOrThrow(query.doctorId, 'doctorId');
      }
      
      labFilter.date = { $gte: start, $lte: end };
      
      const labRecords = await this.labRecordModel.find(labFilter).select('price').lean();
      return labRecords.reduce((sum: number, record: any) => sum + (record.price || 0), 0);
    })();

    const [invoices, payments, expenses, doctors, appointmentsByDate, labFees] = await Promise.all([
      this.invoiceModel
        .find({ createdAt: { $gte: dayStart, $lt: dayEnd }, ...doctorIdFilter })
        .lean(),
      this.invoicePaymentModel
        .find({ paidDate: { $gte: start, $lte: end }, ...doctorIdFilter })
        .lean(),
      expensesQuery,
      this.doctorModel.find().select('_id clinicSharePercent doctorSharePercent').lean(),
      this.appointmentModel.aggregate<{ _id: string; count: number }>([
        { $match: { date: { $gte: start, $lte: end }, ...doctorIdFilter } },
        { $group: { _id: '$date', count: { $sum: 1 } } },
      ]),
      labFeesQuery,
    ]);

    const totalSubtotal = invoices.reduce((sum, inv) => sum + (inv.subtotal ?? 0), 0);
    const totalRevenue = invoices.reduce((sum, inv) => sum + (inv.total ?? 0), 0);
    const totalCollected = payments.reduce((sum, p) => sum + p.amount, 0);
    const totalExpenses = includeExpenses ? expenses.reduce((sum, e) => sum + e.amount, 0) : 0;
    const pendingBalance = invoices.reduce((sum, inv) => sum + (inv.remaining ?? 0), 0);

    const collectedByPaymentMethod = {
      cash: 0,
      card: 0,
      vodafoneCash: 0,
      instapay: 0,
    };
    for (const p of payments) {
      if (p.method === PaymentMethod.Cash) collectedByPaymentMethod.cash += p.amount;
      else if (p.method === PaymentMethod.Card) collectedByPaymentMethod.card += p.amount;
      else if (p.method === PaymentMethod.VodafoneCash) collectedByPaymentMethod.vodafoneCash += p.amount;
      else collectedByPaymentMethod.instapay += p.amount;
    }

    // Calculate doctor and clinic shares
    // Lab fees are deducted from collected amount first, then shares are calculated
    let doctorShare = 0;
    let clinicShare = 0;
    
    if (query.doctorId) {
      // Single doctor: deduct their lab fees from collected, then calculate shares
      const doctor = doctors.find(d => d._id.toString() === query.doctorId);
      if (doctor) {
        const doctorPercent = (doctor as { doctorSharePercent?: number }).doctorSharePercent ?? 80;
        const clinicPercent = (doctor as { clinicSharePercent?: number }).clinicSharePercent ?? 20;
        
        // Deduct lab fees first, then distribute shares
        const collectedAfterLabFees = totalCollected - labFees;
        doctorShare = (collectedAfterLabFees * doctorPercent) / 100;
        clinicShare = (collectedAfterLabFees * clinicPercent) / 100;
      }
    } else if (totalCollected > 0) {
      // All doctors: calculate shares for each doctor after deducting their lab fees
      const doctorMap = new Map(doctors.map(d => [d._id.toString(), d]));
      
      // Group payments by doctor
      const paymentsByDoctor = new Map<string, number>();
      for (const payment of payments) {
        const docId = payment.doctorId?.toString();
        if (docId) {
          paymentsByDoctor.set(docId, (paymentsByDoctor.get(docId) || 0) + payment.amount);
        }
      }
      
      // Group lab fees by doctor
      const labFeesByDoctor = new Map<string, number>();
      const labRecordsForPeriod = await this.labRecordModel
        .find({ date: { $gte: start, $lte: end } })
        .select('doctorId price')
        .lean();
      
      for (const record of labRecordsForPeriod) {
        const docId = record.doctorId?.toString();
        if (docId) {
          labFeesByDoctor.set(docId, (labFeesByDoctor.get(docId) || 0) + (record.price || 0));
        }
      }
      
      // Calculate shares for each doctor: (collected - labFees) * percentage
      for (const [docId, collected] of paymentsByDoctor.entries()) {
        const doctor = doctorMap.get(docId);
        if (doctor) {
          const doctorPercent = (doctor as { doctorSharePercent?: number }).doctorSharePercent ?? 80;
          const clinicPercent = (doctor as { clinicSharePercent?: number }).clinicSharePercent ?? 20;
          const doctorLabFees = labFeesByDoctor.get(docId) || 0;
          
          // Deduct lab fees from collected for this doctor, then calculate shares
          const collectedAfterLabFees = collected - doctorLabFees;
          doctorShare += (collectedAfterLabFees * doctorPercent) / 100;
          clinicShare += (collectedAfterLabFees * clinicPercent) / 100;
        }
      }
    }

    const procedureBreakdown: Record<string, BreakdownItem> = {};
    for (const inv of invoices) {
      for (const item of inv.items ?? []) {
        const lineTotal = invoiceLineAmount(item);
        const key = item.procedure;
        if (!procedureBreakdown[key]) procedureBreakdown[key] = { count: 0, totalAmount: 0 };
        procedureBreakdown[key].count += item.quantity ?? 1;
        procedureBreakdown[key].totalAmount += lineTotal;
      }
    }

    const expenseBreakdown = includeExpenses
      ? expenses.reduce<Record<string, BreakdownItem>>((acc, e) => {
          if (!acc[e.category]) acc[e.category] = { count: 0, totalAmount: 0 };
          acc[e.category].count += 1;
          acc[e.category].totalAmount += e.amount;
          return acc;
        }, {})
      : {};

    const dailyRev: Record<string, number> = {};
    payments.forEach((p) => (dailyRev[p.paidDate] = (dailyRev[p.paidDate] ?? 0) + p.amount));
    const dailyExp: Record<string, number> = {};
    if (includeExpenses) {
      expenses.forEach((e) => {
        const dateKey = typeof e.date === 'string' ? e.date.slice(0, 10) : '';
        if (dateKey) dailyExp[dateKey] = (dailyExp[dateKey] ?? 0) + e.amount;
      });
    }
    const dailyApp: Record<string, number> = {};
    appointmentsByDate.forEach((a) => (dailyApp[a._id] = a.count));

    const allDates = new Set([...Object.keys(dailyRev), ...Object.keys(dailyExp), ...Object.keys(dailyApp)]);
    const dailyBreakdown = [...allDates]
      .filter((d) => d >= start && d <= end)
      .sort()
      .map((date) => ({
        date,
        revenue: dailyRev[date] ?? 0,
        expenses: dailyExp[date] ?? 0,
        appointmentCount: dailyApp[date] ?? 0,
      }));

    const result = {
      totalSubtotal,
      totalRevenue,
      totalAfterDiscount: totalRevenue,
      totalCollected,
      totalExpenses,
      netRevenue: totalCollected - totalExpenses,
      labFees,
      pendingBalance,
      doctorShare,
      clinicShare,
      collectedByPaymentMethod,
      procedureBreakdown: Object.entries(procedureBreakdown).map(([procedure, data]) => ({ procedure, ...data })),
      expenseBreakdown: Object.entries(expenseBreakdown).map(([category, data]) => ({ category, ...data })),
      expenses: expenses as Array<Record<string, unknown>>,
      dailyBreakdown,
    };
    
    // إرسال تحديث WebSocket
    this.gateway.emitReportGenerated('revenue', query);
    
    return result;
  }

  async getPatientVisitAnalysis(query: RevenueReportQuery): Promise<PatientVisitAnalysisResult> {
    const { start, end } = this.resolveDateRange(query);
    const doctorIdFilter = query.doctorId 
      ? { doctorId: toObjectIdOrThrow(query.doctorId, 'doctorId') } 
      : {};

    // Only count completed or in-progress appointments as actual visits
    const completedStatuses = [
      AppointmentStatus.Completed,
      AppointmentStatus.InProgress
    ];

    const patientVisits = await this.appointmentModel.aggregate([
      {
        $match: {
          status: { $in: completedStatuses },
          ...doctorIdFilter
        }
      },
      {
        $group: {
          _id: '$patientId',
          totalAppointments: { $sum: 1 },
          lastAppointmentDate: { $max: '$date' }
        }
      },
      {
        $project: {
          patientId: '$_id',
          totalAppointments: 1,
          lastAppointmentDate: 1,
          isInSelectedRange: {
            $and: [
              { $gte: ['$lastAppointmentDate', start] },
              { $lte: ['$lastAppointmentDate', end] }
            ]
          },
          isBeforeSelectedRange: {
            $lt: ['$lastAppointmentDate', start]
          }
        }
      },
      {
        $group: {
          _id: null,
          // New patients: only 1 appointment ever, and it was in the selected range
          newPatients: {
            $sum: {
              $cond: [
                {
                  $and: [
                    { $eq: ['$totalAppointments', 1] },
                    { $eq: ['$isInSelectedRange', true] }
                  ]
                },
                1,
                0
              ]
            }
          },
          // Returning patients: 2+ appointments ever, and last appointment was in the selected range
          returningPatients: {
            $sum: {
              $cond: [
                {
                  $and: [
                    { $gt: ['$totalAppointments', 1] },
                    { $eq: ['$isInSelectedRange', true] }
                  ]
                },
                1,
                0
              ]
            }
          },
          // One-time patients: only 1 appointment ever, and it was before the selected range
          oneTimePatients: {
            $sum: {
              $cond: [
                {
                  $and: [
                    { $eq: ['$totalAppointments', 1] },
                    { $eq: ['$isBeforeSelectedRange', true] }
                  ]
                },
                1,
                0
              ]
            }
          },
          // Not returning patients: 2+ appointments ever, and last appointment was before the selected range
          notReturningPatients: {
            $sum: {
              $cond: [
                {
                  $and: [
                    { $gt: ['$totalAppointments', 1] },
                    { $eq: ['$isBeforeSelectedRange', true] }
                  ]
                },
                1,
                0
              ]
            }
          }
        }
      }
    ]);

    const result = patientVisits[0] || {
      newPatients: 0,
      returningPatients: 0,
      oneTimePatients: 0,
      notReturningPatients: 0
    };

    const analysisResult = {
      newPatients: result.newPatients,
      returningPatients: result.returningPatients,
      oneTimePatients: result.oneTimePatients,
      notReturningPatients: result.notReturningPatients,
      totalPatientsInRange: result.newPatients + result.returningPatients,
      totalPatientsNotReturning: result.oneTimePatients + result.notReturningPatients,
      dateRange: { start, end }
    };

    // إرسال تحديث WebSocket
    this.gateway.emitReportGenerated('patient-visit-analysis', query);

    return analysisResult;
  }
}
