import { DynamicModule, Module } from '@nestjs/common';
import { CONFIG_OPTIONS, ConfigOptions, ConfigService } from './config.service';

@Module({})
export class ConfigModule {
  static forRoot(options: ConfigOptions): DynamicModule {
    return {
      module: ConfigModule,
      providers: [
        { provide: CONFIG_OPTIONS, useValue: options },
        ConfigService,
      ],
      exports: [ConfigService],
    };
  }
}
