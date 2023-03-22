import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from "@nestjs/common";
import * as dotenv from 'dotenv'
import { AppModule } from "./app.module"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()

declare const module: any;

// hot reload
async function bootstrap() {

  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3434);
  console.log(`Application is running on: ${await app.getUrl()}`);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
