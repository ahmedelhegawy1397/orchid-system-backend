"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePatientPrescriptionDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_patient_prescription_dto_1 = require("./create-patient-prescription.dto");
class UpdatePatientPrescriptionDto extends (0, swagger_1.PartialType)(create_patient_prescription_dto_1.CreatePatientPrescriptionDto) {
}
exports.UpdatePatientPrescriptionDto = UpdatePatientPrescriptionDto;
//# sourceMappingURL=update-patient-prescription.dto.js.map