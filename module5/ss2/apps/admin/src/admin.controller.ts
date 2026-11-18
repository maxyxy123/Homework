import { Controller, Get } from '@nestjs/common';
import { DatabaseService } from '@app/database';

@Controller()
export class AdminController {
  constructor(private readonly database: DatabaseService) {}
  @Get('admin-info') info() {
    return { app: 'admin', database: this.database.connect() };
  }
}
