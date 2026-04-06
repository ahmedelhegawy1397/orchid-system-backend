import { ReportsService } from './reports.service';
import { RevenueReportQueryDto } from './dto/revenue-report-query.dto';
export declare class ReportsController {
    private readonly reportsService;
    constructor(reportsService: ReportsService);
    getRevenue(query: RevenueReportQueryDto): Promise<import("./reports.service").RevenueReportResult>;
    getPatientVisitAnalysis(query: RevenueReportQueryDto): Promise<import("./reports.service").PatientVisitAnalysisResult>;
}
