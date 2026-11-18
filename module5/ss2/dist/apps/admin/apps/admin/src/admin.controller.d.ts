import { DatabaseService } from "../../../libs/database/src";
export declare class AdminController {
    private readonly database;
    constructor(database: DatabaseService);
    info(): {
        app: string;
        database: string;
    };
}
