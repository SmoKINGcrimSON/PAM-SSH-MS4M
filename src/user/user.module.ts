import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common'; //decorator that marks a class as a Nest module. A module is a class annotated with a @Module() decorator. The @Module() decorator provides metadata that Nest uses to organize the application structure.
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { DatabaseModule } from 'src/database/database.module';
import { userProviders } from './entity/user.provider';
import { GenHashUserMiddleware } from '../middlewares/gen-hash-user.middleware';

@Module({
    imports: [DatabaseModule],
    controllers: [UserController],
    providers: [UserService, ...userProviders], 
})

export class UserModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
    consumer.apply(GenHashUserMiddleware).forRoutes(
        { path: '/user', method: RequestMethod.POST },
        { path: '/user/:id', method: RequestMethod.PATCH },
    );
  }
}