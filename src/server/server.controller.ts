import { Controller, Get, Param, Post, Body, Query, UseGuards, Patch, Delete } from '@nestjs/common';
import { IdGuard } from '../guards/id.guard';
import { ServerService } from './server.service';
import { CreateServerDto } from './dto/create-server.dto';
import { UpdateServerDto } from './dto/update-server.dto';
import { ApiOperation } from '@nestjs/swagger';
import { Roles } from 'src/common/decorators/rol.decorator';

@Roles('superuser', 'admin')
@Controller('server') 
export class ServerController { 

    constructor(private readonly serverService: ServerService){} //private rreadonly

    @Get()
    @ApiOperation({ summary: 'Get all servers with optional limit' })
    @Roles('superuser')
    async getAllServers(@Query('limit') limit?: string) {
        return this.serverService.getAllServers({ limit: limit !== undefined ? Number(limit) : undefined });
    }

    @Get('/:id')
    @ApiOperation({ summary: 'Get a server by ID' })
    @UseGuards(IdGuard)
    async getServer(@Param('id') id: string) {
        return this.serverService.getServer({id: Number(id)});
    }

    @Post()
    @ApiOperation({ summary: 'Create a new server' })
    @Roles('superuser')
    async createServer(@Body() server: CreateServerDto) {
        return this.serverService.createServer(server);
    }

    @Patch('/:id')
    @ApiOperation({ summary: 'Update a server by ID' })
    @UseGuards(IdGuard)
    async updateServer(@Param('id') id: string, @Body() server: UpdateServerDto) {
        return this.serverService.updateServer(Number(id), server);
    }

    @Delete('/:id')
    @ApiOperation({ summary: 'Delete a server by ID' })
    @Roles('superuser')
    @UseGuards(IdGuard)
    async deleteServer(@Param('id') id: string) {
        return this.serverService.deleteServer({id: Number(id)});
    }
}