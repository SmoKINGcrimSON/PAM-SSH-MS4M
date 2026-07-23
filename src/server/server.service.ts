import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateServerDto } from './dto/create-server.dto';
import { GetServerDto } from './dto/get-server.dto';
import { Repository } from 'typeorm';
import { Server } from './entity/server.entity';
import { UpdateServerDto } from './dto/update-server.dto';

@Injectable()
export class ServerService {

    constructor(@Inject('SERVER_REPOSITORY') private readonly serverRepository: Repository<Server>) {}

    async getAllServers({ limit }: { limit?: number } = {}): Promise<GetServerDto[]> {
        const servers = await this.serverRepository.find({
            take: limit,
        });
        return servers.map(({ server_password, ...server }) => server);
    }

    async getServer({id}:{id?: number} = {}): Promise<GetServerDto|null> {
        // Find the server by id
        const server = await this.serverRepository.findOneBy({server_id: id});

        // If the server is not found, throw a NotFoundException
        if (!server) throw new NotFoundException(`Server not found`);

        // Exclude the server_password field from the returned object
        const {server_password, ...result} = server;

        // Return the server without the server_password field
        return result;
    }

    async createServer(createServerDto: CreateServerDto): Promise<GetServerDto> {
        const existingServer = await this.serverRepository.findOneBy({
            ip_address: createServerDto.ip_address,
            ssh_port: createServerDto.ssh_port,
            mine_name: createServerDto.mine_name,
        })
        if (existingServer) throw new NotFoundException(`Server with hostname ${createServerDto.hostname}, ip_address ${createServerDto.ip_address} and mine_name ${createServerDto.mine_name} already exists`);
        // Create a new server entity from the DTO
        const server = this.serverRepository.create(createServerDto);

        // Save the server entity to the database
        const savedServer = await this.serverRepository.save(server);

        // Exclude the server_password field from the returned object
        const {server_password, ...result} = savedServer;

        //  Return the saved server without the server_password field
        return result;
    }

    async updateServer(id: number, updateServerDto: UpdateServerDto): Promise<GetServerDto|null> {
        //find the server by id
        const server = await this.serverRepository.findOneBy({
            server_id: id,
            ip_address: updateServerDto.ip_address,
            ssh_port: updateServerDto.ssh_port,
            mine_name: updateServerDto.mine_name,
        });

        // If the server is not found, throw a NotFoundException
        if (!server) throw new NotFoundException(`Server not found`);

        // Update the server entity with the new data from the DTO
        Object.assign(server, updateServerDto);

        // Save the updated server entity to the database
        const savedServer = await this.serverRepository.save(server);

        // Exclude the server_password field from the returned object
        const {server_password, ...result} = savedServer;

        // Return the updated server without the server_password field
        return result;
    }

    async deleteServer({id}: {id?: number} = {}) : Promise<void> {
        // Delete the server entity from the database by id
        const result = await this.serverRepository.delete({
            server_id: id
        })

        // If no rows were affected, throw a NotFoundException
        if (result.affected === 0) throw new NotFoundException(`Server not found`);
    }
}
