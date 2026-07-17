import { Controller, Get, Param, Post, Body, Query, HttpCode, UseGuards, ParseIntPipe } from '@nestjs/common';
import { IdGuard } from '../guards/id.guard';
import { ServerService } from './server.service';
import { CreateServerDto } from './dto/create-server.dto';

@Controller('server') 
export class ServerController { 

    constructor(private readonly serverService: ServerService){} //private rreadonly
   

   @Get()
    getAllServers(@Query('limit') limit?: string) {
    return this.serverService.getAllServers({ limit });
    }

    @Get('/:not-found')
    @HttpCode(404)
    errorPage() {
        return { message: 'Resource not found' };
    }

    @Get('/:id')
    @UseGuards(IdGuard)
    getServerById(@Param('id') id: string) {
        return this.serverService.getServer(id);
    }

    @Post()
    createServer(@Body() createServerDto: CreateServerDto) {
        return this.serverService.createServer(createServerDto);
    }
}