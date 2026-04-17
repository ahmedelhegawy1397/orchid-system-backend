"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdempotencyKey = void 0;
const common_1 = require("@nestjs/common");
exports.IdempotencyKey = (0, common_1.createParamDecorator)((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    return request.headers['x-idempotency-key'];
});
//# sourceMappingURL=idempotency-key.decorator.js.map