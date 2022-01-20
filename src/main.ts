import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { SwaggerDocumentOptions, SwaggerModule } from '@nestjs/swagger';
import { DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //? Setup Swagger here
  const config = new DocumentBuilder()
    .setTitle('Product Management 📃')
    .setDescription('The product management API description')
    .setVersion('1.0')
    .build();

  const options: SwaggerDocumentOptions = {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
  };

  const document = SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup('swagger/api-doc', app, document);

  await app.listen(3000, () => {
    console.log('Server is listening on port 3000 💥');
  });
}
bootstrap();
