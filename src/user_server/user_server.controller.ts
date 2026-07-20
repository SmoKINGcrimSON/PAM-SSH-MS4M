import { Controller } from "@nestjs/common";
import { UserServerService } from "./user_server.service";


@Controller('user-server')
export class UserServerController {
    constructor(private readonly userServerService: UserServerService) {}
}