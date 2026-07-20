import { Body, Controller, Get, Post, Query, Param, NotFoundException, UseGuards, Patch, Delete } from "@nestjs/common";
import { UserServerGuard } from "./guards/user_server.guard";
import { CreateUserServerDto } from "./dto/create-user-server.dto";
import { UserServerService } from "./user_server.service";
import { UpdateUserServerDto } from "./dto/update-user-server.dto";


@Controller('user-server')
export class UserServerController {
    constructor(private readonly userServerService: UserServerService) {}

    @Get()
    async getAllUserServers(@Query('limit') limit?: string) {
        return this.userServerService.getAllUserServers({limit: limit !== undefined ? Number(limit) : undefined});
    }

    @Get('/:userId/:serverId')
    @UseGuards(UserServerGuard)
    async getUserServer(@Param('userId') userId: string, @Param('serverId') serverId: string) {
        const userServer = await this.userServerService.getUserServer(Number(userId), Number(serverId));
        if (userServer == null) throw new NotFoundException(`UserServer with userId ${userId} and serverId ${serverId} not found`);
        return userServer;
    }

    @Post()
    async createUserServer(@Body() userServer: CreateUserServerDto) {
        return this.userServerService.createUserServer(userServer);
    }

    @Patch('/:userId/:serverId')
    @UseGuards(UserServerGuard)
    async updateUserServer(@Param('userId') userId: string, @Param('serverId') serverId: string, @Body() userServer: UpdateUserServerDto) {
        const updatedUserServer = await this.userServerService.updateUserServer(Number(userId), Number(serverId), userServer);
        if (updatedUserServer == null) throw new NotFoundException(`UserServer with userId ${userId} and serverId ${serverId} not found`);
        return updatedUserServer;
    }

    @Delete('/:userId/:serverId')
    @UseGuards(UserServerGuard)
    async deleteUserServer(@Param('userId') userId: String, @Param('serverId') serverId: string) {
        const deleted = await this.userServerService.deleteUserServer(Number(userId), Number(serverId));
        if (!deleted) throw new NotFoundException(`UserServer with userId ${userId} and serverId ${serverId} not found`);
        return { deleted: true };
    }
}