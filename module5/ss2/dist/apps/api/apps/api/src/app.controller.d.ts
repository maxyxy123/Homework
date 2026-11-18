import { ConfigService } from './custom-config/config.service';
import { ConnectionInfo } from './connection/connection.provider';
export declare class AppController {
    private readonly appConfig;
    private readonly configService;
    private readonly connection;
    constructor(appConfig: {
        appName: string;
        version: string;
    }, configService: ConfigService, connection: ConnectionInfo);
    info(): {
        appName: string;
        version: string;
    };
    config(): {
        folder: string;
        description: string;
    };
    connectionStatus(): ConnectionInfo;
}
