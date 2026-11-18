import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { APP_CONFIG, appConfig } from './config.constants';
import { CoreModule } from './core/core.module';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from './custom-config/config.module';
import { asyncConnectionProvider } from './connection/connection.provider';

@Module({
  imports: [CoreModule, UsersModule, ProductsModule, AuthModule, ConfigModule.forRoot({ folder: 'development' })],
  controllers: [AppController],
  providers: [
    { provide: APP_CONFIG, useValue: appConfig },
    asyncConnectionProvider,
  ],
})
export class AppModule {}
