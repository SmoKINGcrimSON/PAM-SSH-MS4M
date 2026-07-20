import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateServerDto } from './dto/create-server.dto';
import { Repository } from 'typeorm';
import { Server } from './entity/server.entity';
import { UpdateServerDto } from './dto/update-server.dto';

@Injectable()
export class ServerService {

    constructor(@Inject('SERVER_REPOSITORY') private readonly serverRepository: Repository<Server>) {}

    async getAllServers({ limit }: { limit?: number } = {}): Promise<Server[]> {
        return this.serverRepository.find({
            take: limit,
        });
    }

    async createServer(createServerDto: CreateServerDto): Promise<Server> {
        const server = this.serverRepository.create(createServerDto);
        return this.serverRepository.save(server);
    }

    async getServer({id}:{id?: number} = {}): Promise<Server|null> {
        const server = await this.serverRepository.findOneBy({server_id: id});
        return server;
    }

    async updateServer(id: number, updateServerDto: UpdateServerDto): Promise<Server|null> {
        //find the server by id
        const server = await this.serverRepository.findOneBy({
            server_id: id
        });

        // If the server is not found, throw a NotFoundException
        if (!server) return null;

        // Update the server properties here if needed
        // For example, you can update the server name or other properties based on the provided data

        Object.assign(server, updateServerDto);
        return this.serverRepository.save(server);
    }
}
