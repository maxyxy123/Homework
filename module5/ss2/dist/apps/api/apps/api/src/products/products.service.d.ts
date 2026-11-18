import { DatabaseService } from "../../../../libs/database/src";
import { LoggerService } from '../core/logger.service';
export declare class ProductsService {
    private readonly logger;
    private readonly database;
    constructor(logger: LoggerService, database: DatabaseService);
    status(): {
        logger: string;
        database: string;
    };
}
