"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const core_1 = require("@nestjs/core");
const configuration_1 = require("./config/configuration");
const auth_module_1 = require("./modules/auth/auth.module");
const doctors_module_1 = require("./modules/doctors/doctors.module");
const patients_module_1 = require("./modules/patients/patients.module");
const appointments_module_1 = require("./modules/appointments/appointments.module");
const invoices_module_1 = require("./modules/invoices/invoices.module");
const expenses_module_1 = require("./modules/expenses/expenses.module");
const daily_closeouts_module_1 = require("./modules/daily-closeouts/daily-closeouts.module");
const waiting_list_module_1 = require("./modules/waiting-list/waiting-list.module");
const tooth_procedures_module_1 = require("./modules/tooth-procedures/tooth-procedures.module");
const medical_alerts_module_1 = require("./modules/medical-alerts/medical-alerts.module");
const patient_transfers_module_1 = require("./modules/patient-transfers/patient-transfers.module");
const settings_module_1 = require("./modules/settings/settings.module");
const procedure_pricing_module_1 = require("./modules/procedure-pricing/procedure-pricing.module");
const reports_module_1 = require("./modules/reports/reports.module");
const prescriptions_module_1 = require("./modules/prescriptions/prescriptions.module");
const patient_prescriptions_module_1 = require("./modules/patient-prescriptions/patient-prescriptions.module");
const accounting_module_1 = require("./modules/accounting/accounting.module");
const dashboard_module_1 = require("./modules/dashboard/dashboard.module");
const lab_management_module_1 = require("./modules/lab-management/lab-management.module");
const seed_module_1 = require("./database/seed/seed.module");
const jwt_auth_guard_1 = require("./common/guards/jwt-auth.guard");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                load: [configuration_1.configuration],
                envFilePath: ['.env', '.env.example'],
            }),
            mongoose_1.MongooseModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: (config) => ({
                    uri: config.get('mongodbUri') || 'mongodb://localhost:27017/orchid-dental',
                    retryWrites: true,
                }),
                inject: [config_1.ConfigService],
            }),
            auth_module_1.AuthModule,
            doctors_module_1.DoctorsModule,
            patients_module_1.PatientsModule,
            appointments_module_1.AppointmentsModule,
            invoices_module_1.InvoicesModule,
            expenses_module_1.ExpensesModule,
            daily_closeouts_module_1.DailyCloseoutsModule,
            waiting_list_module_1.WaitingListModule,
            tooth_procedures_module_1.ToothProceduresModule,
            medical_alerts_module_1.MedicalAlertsModule,
            patient_transfers_module_1.PatientTransfersModule,
            settings_module_1.SettingsModule,
            procedure_pricing_module_1.ProcedurePricingModule,
            reports_module_1.ReportsModule,
            prescriptions_module_1.PrescriptionsModule,
            patient_prescriptions_module_1.PatientPrescriptionsModule,
            accounting_module_1.AccountingModule,
            dashboard_module_1.DashboardModule,
            lab_management_module_1.LabManagementModule,
            seed_module_1.SeedModule,
        ],
        providers: [
            {
                provide: core_1.APP_GUARD,
                useClass: jwt_auth_guard_1.JwtAuthGuard,
            },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map