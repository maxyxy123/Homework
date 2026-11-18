import { DynamicModule } from '@nestjs/common';
import { ConfigOptions } from './config.service';
export declare class ConfigModule {
    static forRoot(options: ConfigOptions): DynamicModule;
}
