// ---------- src/main.ts ----------
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { CustomExceptionFilter } from './common/filters/custom-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Global request validation
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));

  // Global custom error handler
  app.useGlobalFilters(new CustomExceptionFilter());

  // Enable CORS
  app.enableCors();

  await app.listen(3000);
  console.log(`Application is running on: http://localhost:3000`);
}

bootstrap();
