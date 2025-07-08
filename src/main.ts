import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  console.log('port', process.env.PORT);
  await app.listen(Number(process.env.PORT) || 8000);
}
bootstrap();
