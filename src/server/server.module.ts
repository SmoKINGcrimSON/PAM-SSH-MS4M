import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { ServerController } from './server.controller';
import { ServerService } from './server.service';
import { DatabaseModule } from 'src/database/database.module';
import { serverProviders } from './entity/server.provider';

@Module({
    imports: [DatabaseModule],
    controllers: [ServerController],
    providers: [ServerService, ...serverProviders],
})
export class ServerModule {}
