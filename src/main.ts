import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //* Add global middleware here

  await app.listen(3000, () => {
    console.log('Server is listening on port 3000 💥');
  });
}
bootstrap();
