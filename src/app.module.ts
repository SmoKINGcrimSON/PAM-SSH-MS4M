import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ServerModule } from './server/server.module';

@Module({
  imports: [UserModule, ServerModule],
})
export class AppModule {}
