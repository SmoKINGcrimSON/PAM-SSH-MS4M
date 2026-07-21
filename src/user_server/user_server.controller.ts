import { Body, Controller, Get, Post, Query, Param, NotFoundException, UseGuards, Patch, Delete } from "@nestjs/common";
import { UserServerGuard } from "./guards/user_server.guard";
import { CreateUserServerDto } from "./dto/create-user-server.dto";
import { UserServerService } from "./user_server.service";
import { UpdateUserServerDto } from "./dto/update-user-server.dto";
import { ApiOperation } from "@nestjs/swagger";


@Controller('user-server')
export class UserServerController {
    constructor(private readonly userServerService: UserServerService) {}

    @ApiOperation({ summary: 'Get all user-server relationships with optional limit' })
    @Get()
    async getAllUserServers(@Query('limit') limit?: string) {
        return this.userServerService.getAllUserServers({limit: limit !== undefined ? Number(limit) : undefined});
    }

    @ApiOperation({ summary: 'Get a user-server relationship by user ID and server ID' })
    @Get('/:userId/:serverId')
    @UseGuards(UserServerGuard)
    async getUserServer(@Param('userId') userId: string, @Param('serverId') serverId: string) {
        console.log(`Fetching user-server relationship for userId: ${userId}, serverId: ${serverId}`);
        return this.userServerService.getUserServer(Number(userId), Number(serverId));
    }

    @ApiOperation({ summary: 'Create a new user-server relationship' })
    @Post()
    async createUserServer(@Body() userServer: CreateUserServerDto) {
        return this.userServerService.createUserServer(userServer);
    }

    @ApiOperation({ summary: 'Update a user-server relationship by user ID and server ID' })
    @Patch('/:userId/:serverId')
    @UseGuards(UserServerGuard)
    async updateUserServer(@Param('userId') userId: string, @Param('serverId') serverId: string, @Body() userServer: UpdateUserServerDto) {
        return this.userServerService.updateUserServer(Number(userId), Number(serverId), userServer);
    }

    @ApiOperation({ summary: 'Delete a user-server relationship by user ID and server ID' })
    @Delete('/:userId/:serverId')
    @UseGuards(UserServerGuard)
    async deleteUserServer(@Param('userId') userId: String, @Param('serverId') serverId: string) {
        return this.userServerService.deleteUserServer(Number(userId), Number(serverId));
    }
}