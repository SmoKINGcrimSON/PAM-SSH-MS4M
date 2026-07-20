import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { userServerProviders } from './entity/user-server.provider';
import { UserServerController } from './user_server.controller';

@Module({
    imports: [DatabaseModule],
    controllers: [UserServerController],
    providers: [...userServerProviders],
})

export class UserServerModule {
    
}