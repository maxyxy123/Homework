import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AdminModule } from './admin.module';

async function bootstrap() {
  const app = await NestFactory.create(AdminModule);
  await app.listen(3001);
  console.log('Admin started: http://localhost:3001');
}
bootstrap();
