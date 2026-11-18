import { Module } from '@nestjs/common';
import { CoreModule } from '../core/core.module';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

@Module({
  imports: [CoreModule],
  providers: [ProductsService],
  controllers: [ProductsController],
})
export class ProductsModule {}
