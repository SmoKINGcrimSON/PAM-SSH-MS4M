import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateServerDto } from './dto/create-server.dto';

@Injectable()
export class ServerService {
    
    private servers: CreateServerDto[] = [
        {
            server_id: "1",
            hostname: 'server1',
            ip_address: '192.168.1.1',
            ssh_port: 22,
            mine_name: 'mine1'
        },
        {
            server_id: "2",
            hostname: 'server2',
            ip_address: '192.168.1.2',
            ssh_port: 22,
            mine_name: 'mine2'
        },
        {
            server_id: "3",
            hostname: 'server3',
            ip_address: '192.168.1.3',
            ssh_port: 22,
            mine_name: 'mine3'
        },
        {
            server_id: "4",
            hostname: 'server4',
            ip_address: '192.168.1.4',
            ssh_port: 22,
            mine_name: 'mine4'
        },
        {
            server_id: "5",
            hostname: 'server5',
            ip_address: '192.168.1.5',
            ssh_port: 22,
            mine_name: 'mine5' 
        }
    ];

    getAllServers({ limit }: { limit?: string } = {}) {
        return limit ? this.servers.slice(0, Number(limit)) : this.servers;
    }

    getServer(id: string){
        const server = this.servers.find(server => server.server_id === id);
        if (!server) return new NotFoundException(`Server with id ${id} not found`);
        return server;
    }

    createServer(createServerDto: CreateServerDto) {
        this.servers.push(createServerDto);
        return createServerDto;
    }
}
