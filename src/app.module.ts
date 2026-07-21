import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ServerModule } from './server/server.module';
import { UserServerModule } from './user_server/user_server.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [UserModule, ServerModule, UserServerModule, AuthModule, ConfigModule.forRoot({
    isGlobal: true,
  })],
})
export class AppModule {}
