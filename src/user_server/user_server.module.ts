import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { userServerProviders } from './entity/user-server.provider';
import { UserServerController } from './user_server.controller';
import { UserServerService } from './user_server.service';

@Module({
    imports: [DatabaseModule],
    controllers: [UserServerController],
    providers: [UserServerService, ...userServerProviders],
})

export class UserServerModule {
    
}