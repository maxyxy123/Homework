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
const app_controller_1 = require("./app.controller");
const config_constants_1 = require("./config.constants");
const core_module_1 = require("./core/core.module");
const users_module_1 = require("./users/users.module");
const products_module_1 = require("./products/products.module");
const auth_module_1 = require("./auth/auth.module");
const config_module_1 = require("./custom-config/config.module");
const connection_provider_1 = require("./connection/connection.provider");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [core_module_1.CoreModule, users_module_1.UsersModule, products_module_1.ProductsModule, auth_module_1.AuthModule, config_module_1.ConfigModule.forRoot({ folder: 'development' })],
        controllers: [app_controller_1.AppController],
        providers: [
            { provide: config_constants_1.APP_CONFIG, useValue: config_constants_1.appConfig },
            connection_provider_1.asyncConnectionProvider,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map