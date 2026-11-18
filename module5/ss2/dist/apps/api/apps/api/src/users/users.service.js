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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const database_1 = require("../../../../libs/database/src");
const logger_service_1 = require("../core/logger.service");
const auth_service_1 = require("../auth/auth.service");
let UsersService = class UsersService {
    constructor(logger, database, authService) {
        this.logger = logger;
        this.database = database;
        this.authService = authService;
    }
    status() {
        return {
            logger: this.logger.log('UsersModule uses CoreModule'),
            database: this.database.connect(),
        };
    }
    validatePassword(userId, password) {
        return userId === 1 && password === '123456';
    }
    requestToken(userId) {
        return this.authService.issueToken(userId);
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, common_1.Inject)((0, common_1.forwardRef)(() => auth_service_1.AuthService))),
    __metadata("design:paramtypes", [logger_service_1.LoggerService,
        database_1.DatabaseService,
        auth_service_1.AuthService])
], UsersService);
//# sourceMappingURL=users.service.js.map