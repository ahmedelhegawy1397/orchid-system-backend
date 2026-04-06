"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LabRecordStatus = exports.ProcedureCategory = exports.ToothProcedureType = exports.WaitingUrgency = exports.ExpenseCategory = exports.PaymentMethod = exports.DiscountType = exports.InvoiceStatus = exports.BillingMode = exports.AppointmentStatus = exports.AlertSeverity = exports.AlertType = exports.PatientGender = exports.UserRole = exports.DoctorColor = exports.DoctorRole = void 0;
var DoctorRole;
(function (DoctorRole) {
    DoctorRole["Owner"] = "owner";
    DoctorRole["Doctor"] = "doctor";
    DoctorRole["Assistant"] = "assistant";
})(DoctorRole || (exports.DoctorRole = DoctorRole = {}));
var DoctorColor;
(function (DoctorColor) {
    DoctorColor["Charcoal"] = "charcoal";
    DoctorColor["Orchid"] = "orchid";
    DoctorColor["Emerald"] = "emerald";
    DoctorColor["Amber"] = "amber";
})(DoctorColor || (exports.DoctorColor = DoctorColor = {}));
var UserRole;
(function (UserRole) {
    UserRole["Owner"] = "owner";
    UserRole["Doctor"] = "doctor";
    UserRole["Assistant"] = "assistant";
    UserRole["Admin"] = "admin";
})(UserRole || (exports.UserRole = UserRole = {}));
var PatientGender;
(function (PatientGender) {
    PatientGender["Male"] = "male";
    PatientGender["Female"] = "female";
})(PatientGender || (exports.PatientGender = PatientGender = {}));
var AlertType;
(function (AlertType) {
    AlertType["Allergy"] = "allergy";
    AlertType["Diabetes"] = "diabetes";
    AlertType["HeartCondition"] = "heart_condition";
    AlertType["BloodPressure"] = "blood_pressure";
    AlertType["Other"] = "other";
})(AlertType || (exports.AlertType = AlertType = {}));
var AlertSeverity;
(function (AlertSeverity) {
    AlertSeverity["Low"] = "low";
    AlertSeverity["Medium"] = "medium";
    AlertSeverity["High"] = "high";
})(AlertSeverity || (exports.AlertSeverity = AlertSeverity = {}));
var AppointmentStatus;
(function (AppointmentStatus) {
    AppointmentStatus["Scheduled"] = "scheduled";
    AppointmentStatus["Completed"] = "completed";
    AppointmentStatus["Cancelled"] = "cancelled";
    AppointmentStatus["NoShow"] = "no_show";
    AppointmentStatus["InProgress"] = "in_progress";
})(AppointmentStatus || (exports.AppointmentStatus = AppointmentStatus = {}));
var BillingMode;
(function (BillingMode) {
    BillingMode["New"] = "new";
    BillingMode["FollowUp"] = "follow_up";
})(BillingMode || (exports.BillingMode = BillingMode = {}));
var InvoiceStatus;
(function (InvoiceStatus) {
    InvoiceStatus["Paid"] = "paid";
    InvoiceStatus["Partial"] = "partial";
    InvoiceStatus["Unpaid"] = "unpaid";
})(InvoiceStatus || (exports.InvoiceStatus = InvoiceStatus = {}));
var DiscountType;
(function (DiscountType) {
    DiscountType["Percentage"] = "percentage";
    DiscountType["Fixed"] = "fixed";
})(DiscountType || (exports.DiscountType = DiscountType = {}));
var PaymentMethod;
(function (PaymentMethod) {
    PaymentMethod["Cash"] = "cash";
    PaymentMethod["Card"] = "card";
    PaymentMethod["VodafoneCash"] = "vodafone_cash";
    PaymentMethod["Instapay"] = "instapay";
})(PaymentMethod || (exports.PaymentMethod = PaymentMethod = {}));
var ExpenseCategory;
(function (ExpenseCategory) {
    ExpenseCategory["Electricity"] = "electricity";
    ExpenseCategory["AhmedElhagawy"] = "ahmed_elhagawy";
    ExpenseCategory["RawMaterials"] = "raw_materials";
    ExpenseCategory["Materials"] = "materials";
    ExpenseCategory["Internet"] = "internet";
    ExpenseCategory["Coffee"] = "coffee";
    ExpenseCategory["Waste"] = "waste";
    ExpenseCategory["Shipping"] = "shipping";
    ExpenseCategory["Rent"] = "rent";
    ExpenseCategory["Utilities"] = "utilities";
    ExpenseCategory["Mobile"] = "mobile";
    ExpenseCategory["Other"] = "other";
})(ExpenseCategory || (exports.ExpenseCategory = ExpenseCategory = {}));
var WaitingUrgency;
(function (WaitingUrgency) {
    WaitingUrgency["Low"] = "low";
    WaitingUrgency["Medium"] = "medium";
    WaitingUrgency["High"] = "high";
})(WaitingUrgency || (exports.WaitingUrgency = WaitingUrgency = {}));
var ToothProcedureType;
(function (ToothProcedureType) {
    ToothProcedureType["Filling"] = "filling";
    ToothProcedureType["RootCanal"] = "root_canal";
    ToothProcedureType["Crown"] = "crown";
    ToothProcedureType["Implant"] = "implant";
    ToothProcedureType["Extraction"] = "extraction";
    ToothProcedureType["Cleaning"] = "cleaning";
    ToothProcedureType["Whitening"] = "whitening";
})(ToothProcedureType || (exports.ToothProcedureType = ToothProcedureType = {}));
var ProcedureCategory;
(function (ProcedureCategory) {
    ProcedureCategory["Diagnostic"] = "diagnostic";
    ProcedureCategory["Preventive"] = "preventive";
    ProcedureCategory["Restorative"] = "restorative";
    ProcedureCategory["Endodontic"] = "endodontic";
    ProcedureCategory["Prosthetic"] = "prosthetic";
    ProcedureCategory["Surgical"] = "surgical";
    ProcedureCategory["Orthodontic"] = "orthodontic";
    ProcedureCategory["Cosmetic"] = "cosmetic";
    ProcedureCategory["Pediatric"] = "pediatric";
    ProcedureCategory["Other"] = "other";
})(ProcedureCategory || (exports.ProcedureCategory = ProcedureCategory = {}));
var LabRecordStatus;
(function (LabRecordStatus) {
    LabRecordStatus["Pending"] = "pending";
    LabRecordStatus["Completed"] = "completed";
})(LabRecordStatus || (exports.LabRecordStatus = LabRecordStatus = {}));
//# sourceMappingURL=index.js.map