"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcedurePricingModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const procedure_pricing_schema_1 = require("./schemas/procedure-pricing.schema");
const procedure_pricing_service_1 = require("./procedure-pricing.service");
const procedure_pricing_controller_1 = require("./procedure-pricing.controller");
const procedure_pricing_gateway_1 = require("./procedure-pricing.gateway");
let ProcedurePricingModule = class ProcedurePricingModule {
};
exports.ProcedurePricingModule = ProcedurePricingModule;
exports.ProcedurePricingModule = ProcedurePricingModule = __decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([{ name: procedure_pricing_schema_1.ProcedurePricing.name, schema: procedure_pricing_schema_1.ProcedurePricingSchema }])],
        controllers: [procedure_pricing_controller_1.ProcedurePricingController],
        providers: [procedure_pricing_service_1.ProcedurePricingService, procedure_pricing_gateway_1.ProcedurePricingGateway],
        exports: [procedure_pricing_service_1.ProcedurePricingService, mongoose_1.MongooseModule],
    })
], ProcedurePricingModule);
//# sourceMappingURL=procedure-pricing.module.js.map