import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import config from './config/keys';

import { ProductsModule } from './products/products.module';
import { ProductsController } from './products/products.controller';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { logger } from './middleware/logger.middleware';
import { GuardMiddleware } from './middleware/guard.middleware';

@Module({
  imports: [ProductsModule, MongooseModule.forRoot(config.mongoURI)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  // *Configure the application middleware
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(logger, GuardMiddleware)
      .exclude({
        path: 'products',
        method: RequestMethod.GET,
      })
      .forRoutes(AppController, ProductsController);
  }
}
