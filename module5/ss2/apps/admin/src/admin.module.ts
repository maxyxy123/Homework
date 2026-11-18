import { Module } from '@nestjs/common';
import { DatabaseModule } from '@app/database';
import { AdminController } from './admin.controller';

@Module({ imports: [DatabaseModule], controllers: [AdminController] })
export class AdminModule {}
