import { Injectable, Inject } from "@nestjs/common";
import { CreateUserServerDto } from "./dto/create-user-server.dto";

@Injectable()
export class UserServerService {
    constructor(@Inject('USER_SERVER_REPOSITORY') private readonly userServerRepository: any) {}

    async getAllUserServers({limit}: {limit?: number}): Promise<CreateUserServerDto[]> {
        return this.userServerRepository.find({
            take: limit,
        });
    }

    async getUserServer(userId: number, serverId: number): Promise<CreateUserServerDto|null> {
        const userServer = await this.userServerRepository.findOne({
            where:{
                user :{ 
                    user_id: userId, 
                },
                server :{ 
                    server_id: serverId, 
                },
            },
            relations: {
                user: true,
                server: true,
            }
        });
        if (!userServer) return null;
        return userServer;
    }

    async createUserServer(userServer: CreateUserServerDto): Promise<CreateUserServerDto> {
        const entity = this.userServerRepository.create({
            user: {
                user_id: userServer.user_id,
            },
            server: {
                server_id: userServer.server_id,
            },
            ssh_username: userServer.ssh_username,
            encrypted_password: userServer.encrypted_password,
        });

        return this.userServerRepository.save(entity);
    }

    async updateUserServer(userId: number, serverId: number, userServer: Partial<CreateUserServerDto>): Promise<CreateUserServerDto|null> {
        // Check if the UserServer exists
        const existingUserServer = await this.getUserServer(userId, serverId);

        // If it doesn't exist, return null
        if (!existingUserServer) return null;

        // Update the existing UserServer with the new data
        const updatedUserServer = Object.assign(existingUserServer, userServer);

        // Save the updated UserServer back to the database
        return this.userServerRepository.save(updatedUserServer);
    }

    async deleteUserServer(userId: number, serverId: number): Promise<Boolean>{
        const existingUserServer = await this.getUserServer(userId, serverId);
        if(!existingUserServer) return false;
        await this.userServerRepository.remove(existingUserServer);
        return true;
    }
}