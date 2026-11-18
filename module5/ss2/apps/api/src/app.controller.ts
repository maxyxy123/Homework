import { Controller, Get, Inject } from '@nestjs/common';
import { APP_CONFIG } from './config.constants';
import { ConfigService } from './custom-config/config.service';
import { ConnectionInfo, THIRD_PARTY_CONNECTION } from './connection/connection.provider';

@Controller()
export class AppController {
  constructor(
    @Inject(APP_CONFIG) private readonly appConfig: { appName: string; version: string },
    private readonly configService: ConfigService,
    @Inject(THIRD_PARTY_CONNECTION) private readonly connection: ConnectionInfo,
  ) {}

  @Get('info') info() { return this.appConfig; }
  @Get('config') config() { return this.configService.getInfo(); }
  @Get('connection') connectionStatus() { return this.connection; }
}
