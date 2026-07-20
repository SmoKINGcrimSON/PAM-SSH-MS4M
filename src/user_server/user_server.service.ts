import { Injectable, Inject } from "@nestjs/common";

@Injectable()
export class UserServerService {
    constructor(@Inject('USER_SERVER_REPOSITORY') private readonly userServerRepository: any) {}
}