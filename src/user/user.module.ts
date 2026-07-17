import { Module } from '@nestjs/common'; //decorator that marks a class as a Nest module. A module is a class annotated with a @Module() decorator. The @Module() decorator provides metadata that Nest uses to organize the application structure.
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
    imports: [],
    controllers: [UserController],
    providers: [UserService], 
})

export class UserModule {

}