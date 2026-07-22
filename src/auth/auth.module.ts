import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { userProviders } from 'src/user/entity/user.provider';
import { DatabaseModule } from 'src/database/database.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from './guards/auth.guard';
import { RolesGuard } from './guards/roles.guard';
import { GenHashUserMiddleware } from 'src/middlewares/gen-hash-user.middleware';

@Module({
  imports: [
    DatabaseModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: '1h',
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, ...userProviders,  { provide: APP_GUARD, useClass: AuthGuard,}, {provide: APP_GUARD, useClass: RolesGuard,},], 
  /*APP_GUARD MAKES ENDPOINTS WRAPPED BY AUTHGUARD*/
  exports: [AuthService]
})
export class AuthModule {
  configure(consumer: MiddlewareConsumer) {
    // Apply the AuthGuard to all routes in this module
    consumer
      .apply(GenHashUserMiddleware).forRoutes({ path: '/auth/register', method: RequestMethod.POST });
  }
}
