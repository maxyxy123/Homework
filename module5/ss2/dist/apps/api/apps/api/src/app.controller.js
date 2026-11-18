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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const config_constants_1 = require("./config.constants");
const config_service_1 = require("./custom-config/config.service");
const connection_provider_1 = require("./connection/connection.provider");
let AppController = class AppController {
    constructor(appConfig, configService, connection) {
        this.appConfig = appConfig;
        this.configService = configService;
        this.connection = connection;
    }
    info() { return this.appConfig; }
    config() { return this.configService.getInfo(); }
    connectionStatus() { return this.connection; }
};
exports.AppController = AppController;
__decorate([
    (0, common_1.Get)('info'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "info", null);
__decorate([
    (0, common_1.Get)('config'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "config", null);
__decorate([
    (0, common_1.Get)('connection'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "connectionStatus", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)(),
    __param(0, (0, common_1.Inject)(config_constants_1.APP_CONFIG)),
    __param(2, (0, common_1.Inject)(connection_provider_1.THIRD_PARTY_CONNECTION)),
    __metadata("design:paramtypes", [Object, config_service_1.ConfigService, Object])
], AppController);
//# sourceMappingURL=app.controller.js.map