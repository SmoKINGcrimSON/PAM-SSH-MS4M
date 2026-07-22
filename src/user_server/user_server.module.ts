import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { userServerProviders } from './entity/user-server.provider';
import { UserServerController } from './user_server.controller';
import { UserServerService } from './user_server.service';
import { serverProviders } from 'src/server/entity/server.provider';
import { userProviders } from 'src/user/entity/user.provider';

@Module({
    imports: [DatabaseModule],
    controllers: [UserServerController],
    providers: [UserServerService, ...userServerProviders, ...userProviders, ...serverProviders],
})

export class UserServerModule {
    
}