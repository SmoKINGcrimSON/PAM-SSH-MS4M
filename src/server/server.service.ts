import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateServerDto } from './dto/create-server.dto';
import { Repository } from 'typeorm';
import { Server } from './entity/server.entity';
import { UpdateServerDto } from './dto/update-server.dto';

@Injectable()
export class ServerService {

    constructor(@Inject('SERVER_REPOSITORY') private readonly serverRepository: Repository<Server>) {}

    async getAllServers({ limit }: { limit?: number } = {}): Promise<CreateServerDto[]> {
        return this.serverRepository.find({
            take: limit,
        });
    }

    async getServer({id}:{id?: number} = {}): Promise<CreateServerDto|null> {
        const server = await this.serverRepository.findOneBy({server_id: id});
        return server;
    }

    async createServer(createServerDto: CreateServerDto): Promise<CreateServerDto> {
        const server = this.serverRepository.create(createServerDto);
        return this.serverRepository.save(server);
    }

    async updateServer(id: number, updateServerDto: UpdateServerDto): Promise<CreateServerDto|null> {
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

    async deleteServer({id}: {id?: number} = {}) : Promise<void> {
        const result = await this.serverRepository.delete({
            server_id: id
        })
        if (result.affected === 0) throw new NotFoundException(`Server with id ${id} not found`);
    }
}
