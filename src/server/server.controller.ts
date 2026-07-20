import { Controller, Get, Param, Post, Body, Query, HttpCode, UseGuards, ParseIntPipe, Inject, NotFoundException, Patch, Delete } from '@nestjs/common';
import { IdGuard } from '../guards/id.guard';
import { ServerService } from './server.service';
import { CreateServerDto } from './dto/create-server.dto';
import { UpdateServerDto } from './dto/update-server.dto';

@Controller('server') 
export class ServerController { 

    constructor(private readonly serverService: ServerService){} //private rreadonly
   
    @Get()
    async getAllServers(@Query('limit') limit?: string) {
        return this.serverService.getAllServers({ limit: limit !== undefined ? Number(limit) : undefined });
    }

    @Get('/:id')
    @UseGuards(IdGuard)
    async getServer(@Param('id') id: string) {
        const server = await this.serverService.getServer({id: Number(id)});
        if (server == null) throw new NotFoundException(`Server with id ${id} not found`);
        return server;
    }

    @Post()
    async createServer(@Body() server: CreateServerDto) {
        return this.serverService.createServer(server);
    }

    @Patch('/:id')
    @UseGuards(IdGuard)
    async updateServer(@Param('id') id: string, @Body() server: UpdateServerDto) {
        const updatedServer = await this.serverService.updateServer(Number(id), server);
        if (updatedServer == null) throw new NotFoundException(`Server with id ${id} not found`);
        return updatedServer;
    }

    @Delete('/:id')
    @UseGuards(IdGuard)
    async deleteServer(@Param('id') id: string) {
        return this.serverService.deleteServer({id: Number(id)});
    }
}