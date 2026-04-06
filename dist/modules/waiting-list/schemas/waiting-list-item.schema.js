"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WaitingListItemSchema = exports.WaitingListItem = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const enums_1 = require("../../../enums");
let WaitingListItem = class WaitingListItem extends mongoose_2.Document {
};
exports.WaitingListItem = WaitingListItem;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Patient', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], WaitingListItem.prototype, "patientId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Doctor' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], WaitingListItem.prototype, "doctorId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], WaitingListItem.prototype, "preferredDate", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], WaitingListItem.prototype, "preferredTimeRange", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, enum: Object.values(enums_1.WaitingUrgency), default: enums_1.WaitingUrgency.Medium }),
    __metadata("design:type", String)
], WaitingListItem.prototype, "urgency", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], WaitingListItem.prototype, "notes", void 0);
__decorate([
    (0, mongoose_1.Prop)({ min: 10, max: 240 }),
    __metadata("design:type", Number)
], WaitingListItem.prototype, "duration", void 0);
exports.WaitingListItem = WaitingListItem = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], WaitingListItem);
exports.WaitingListItemSchema = mongoose_1.SchemaFactory.createForClass(WaitingListItem);
exports.WaitingListItemSchema.index({ preferredDate: 1, urgency: 1 });
//# sourceMappingURL=waiting-list-item.schema.js.map