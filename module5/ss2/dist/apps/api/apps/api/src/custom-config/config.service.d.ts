export declare const CONFIG_OPTIONS = "CUSTOM_CONFIG_OPTIONS";
export interface ConfigOptions {
    folder: string;
}
export declare class ConfigService {
    private readonly options;
    constructor(options: ConfigOptions);
    getInfo(): {
        folder: string;
        description: string;
    };
}
