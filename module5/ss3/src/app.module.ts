import { Module, MiddlewareConsumer, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { IpBlockMiddleware } from './ip-block.middleware';
import { OwnershipGuard } from './ownership.guard';
import { RateLimitGuard } from './rate-limit.guard';
import { TransformInterceptor } from './transform.interceptor';
@Module({
  controllers: [AppController],
  providers: [OwnershipGuard, RateLimitGuard, TransformInterceptor],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // Chỉ chặn route bài 1 để có thể kiểm thử các bài còn lại.
    consumer.apply(IpBlockMiddleware).forRoutes({ path: 'ip-test', method: RequestMethod.ALL });
  }
}
