/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

  app.enableCors({
    origin: 'http://localhost:3000',  // Replace with your frontend origin
  });

  await app.listen(3001);
  console.log(`Application is running on: ${await app.getUrl()}`);
  
  
}
bootstrap();
