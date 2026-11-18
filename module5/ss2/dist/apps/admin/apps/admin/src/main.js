"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const core_1 = require("@nestjs/core");
const admin_module_1 = require("./admin.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(admin_module_1.AdminModule);
    await app.listen(3001);
    console.log('Admin started: http://localhost:3001');
}
bootstrap();
//# sourceMappingURL=main.js.map