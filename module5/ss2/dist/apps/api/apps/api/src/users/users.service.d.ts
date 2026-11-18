import { DatabaseService } from "../../../../libs/database/src";
import { LoggerService } from '../core/logger.service';
import { AuthService } from '../auth/auth.service';
export declare class UsersService {
    private readonly logger;
    private readonly database;
    private readonly authService;
    constructor(logger: LoggerService, database: DatabaseService, authService: AuthService);
    status(): {
        logger: string;
        database: string;
    };
    validatePassword(userId: number, password: string): boolean;
    requestToken(userId: number): string;
}
