import { Inject, Injectable } from '@nestjs/common';
export const CONFIG_OPTIONS = 'CUSTOM_CONFIG_OPTIONS';
export interface ConfigOptions { folder: string; }

@Injectable()
export class ConfigService {
  constructor(@Inject(CONFIG_OPTIONS) private readonly options: ConfigOptions) {}

  getInfo() {
    return {
      folder: this.options.folder,
      description: this.options.folder === 'production' ? 'Production mode' : 'Development mode',
    };
  }
}
