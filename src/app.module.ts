import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ServerModule } from './server/server.module';
import { UserServerModule } from './user_server/user_server.module';

@Module({
  imports: [UserModule, ServerModule, UserServerModule],
})
export class AppModule {}
