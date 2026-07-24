import { Body, Controller, Get, Post, Query, UseGuards, Patch, Delete } from "@nestjs/common";
import { DeleteUserServerDto } from "./dto/delete-user-server.dto";
import { CreateUserServerDto } from "./dto/create-user-server.dto";
import { UserServerService } from "./user_server.service";
import { UpdateUserServerDto } from "./dto/update-user-server.dto";
import { ApiOperation } from "@nestjs/swagger";
import { Roles } from "src/common/decorators/rol.decorator";

@Roles('superuser', 'admin')
@Controller('user-server')
export class UserServerController {
    constructor(private readonly userServerService: UserServerService) {}

    @Roles('superuser')
    @ApiOperation({ summary: 'Get all user-server relationships with optional limit' })
    @Get()
    async getAllUserServers(@Query('limit') limit?: string) {
        return this.userServerService.getAllUserServers({limit: limit !== undefined ? Number(limit) : undefined});
    }

    @ApiOperation({ summary: 'Create a new user-server relationship' })
    @Roles('superuser')
    @Post()
    async createUserServer(@Body() userServer: CreateUserServerDto) {
        return this.userServerService.createUserServer(userServer);
    }

    @ApiOperation({ summary: 'Update a user-server relationship by user ID and server ID' })
    @Patch()
    async updateUserServer(@Body() userServer: UpdateUserServerDto) { //@Param('ssh_username') ssh_username: string,
        return this.userServerService.updateUserServer(userServer);
    }

    @ApiOperation({ summary: 'Delete a user-server relationship by user ID and server ID' })
    @Roles('superuser')
    @Delete()
    async deleteUserServer(@Body() deleteUserDto: DeleteUserServerDto) { //@Param('userId') userId: String, @Param('serverId') serverId: string
        return this.userServerService.deleteUserServer(deleteUserDto); 
    }
}