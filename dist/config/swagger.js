"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupSwagger = setupSwagger;
const swagger_1 = require("@nestjs/swagger");
function setupSwagger(app) {
    const port = process.env.PORT || 5000;
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Orchid Dental API')
        .setDescription(`Dental clinic management system API.

**Authentication:** Most endpoints require JWT. Call \`POST /api/auth/login\` with \`{ email, password }\` to get a token, then add \`Authorization: Bearer <token>\` to all requests.

**Base URL:** All routes are under \`/api/\` (e.g. \`/api/patients\`, \`/api/appointments\`).

**Roles:** Owner, Doctor, Assistant, Admin. Some endpoints are restricted by role. Doctors see only their own data for certain resources.`)
        .setVersion('1.0')
        .addServer(`http://localhost:${port}`, 'Local')
        .addServer('https://orchid-system-backend.fly.dev', 'Production')
        .addBearerAuth({
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        description: 'Enter JWT token from POST /api/auth/login',
        in: 'header',
    }, 'JWT-auth')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    document.servers = [
        { url: `http://localhost:${port}`, description: 'Local' },
        { url: 'https://orchid-system-backend.fly.dev', description: 'Production' },
    ];
    swagger_1.SwaggerModule.setup('api/docs', app, document, {
        swaggerOptions: {
            persistAuthorization: true,
            tagsSorter: 'alpha',
            operationsSorter: 'alpha',
            docExpansion: 'list',
        },
    });
}
//# sourceMappingURL=swagger.js.map