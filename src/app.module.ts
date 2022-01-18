import { ProductsModule } from './products/products.module';
import { ProductsService } from './products/products.service';
import { ProductsController } from './products/products.controller';
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { logger } from './middleware/logger.middleware';
import { GuardMiddleware } from './middleware/gured.middleware';

@Module({
  imports: [ProductsModule],
  controllers: [ProductsController, AppController],
  providers: [ProductsService, AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    //   consumer.apply(LoggerMiddleware).forRoutes({
    //     path: 'products',
    //     method: RequestMethod.GET,
    //   });
    // }
    consumer
      .apply(logger, GuardMiddleware)
      .exclude({
        path: 'products',
        method: RequestMethod.GET,
      })
      .forRoutes(AppController, ProductsController);
  }
}
