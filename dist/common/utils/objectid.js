"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidObjectId = isValidObjectId;
exports.toObjectIdOrUndefined = toObjectIdOrUndefined;
exports.toObjectIdOrThrow = toObjectIdOrThrow;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
function isValidObjectId(id) {
    if (typeof id !== 'string' || id.length !== 24)
        return false;
    return /^[a-fA-F0-9]{24}$/.test(id);
}
function toObjectIdOrUndefined(id) {
    if (!id || !isValidObjectId(id))
        return undefined;
    return new mongoose_1.Types.ObjectId(id);
}
function toObjectIdOrThrow(id, fieldName = 'id') {
    if (!id || !isValidObjectId(id)) {
        throw new common_1.BadRequestException(`${fieldName} must be a valid MongoDB ObjectId (24 hex characters)`);
    }
    return new mongoose_1.Types.ObjectId(id);
}
//# sourceMappingURL=objectid.js.map