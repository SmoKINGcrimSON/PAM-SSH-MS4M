import { Injectable, Inject, NotFoundException } from "@nestjs/common";
import { CreateUserServerDto } from "./dto/create-user-server.dto";
import { GetUserServerDto } from "./dto/get-user-server.dto";

@Injectable()
export class UserServerService {
    constructor(@Inject('USER_SERVER_REPOSITORY') private readonly userServerRepository: any) {}

    async getAllUserServers({limit}: {limit?: number}): Promise<GetUserServerDto[]> {
        // Fetch all user-server associations from the database, with an optional limit on the number of results
        const userServers = await this.userServerRepository.find({
            take: limit,
        });

        // Exclude the encrypted_password field from the returned objects
        //return userServers.map(({ encrypted_password, ...userServer }) => userServer);
        return userServers;
    }

    async getUserServer(userId: number, serverId: number): Promise<GetUserServerDto|null> {
        // Fetch a specific user-server association from the database based on the provided userId and serverId
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

        // If the user-server association is not found, throw a NotFoundException
        if (!userServer) throw new NotFoundException(`UserServer with userId ${userId} and serverId ${serverId} not found`);

        // Exclude the encrypted_password field from the returned object and also exclude server_password from the server object 
        const { user_server_id, server, user, ...result } = userServer; //encrypted_password dont quit 
        const {server_password, server_id, ...serverWithoutPassword} = server;
        const {user_id, ...userWithoutId} = user;

        // Return the user-server association without the encrypted_password field, and also return the server object without
        return { ...result, server: serverWithoutPassword, user: userWithoutId };
    }

    async createUserServer(userServer: CreateUserServerDto): Promise<GetUserServerDto> {
        // Create a new user-server association entity from the DTO
        const entity = await this.userServerRepository.create({
            user: {
                user_id: userServer.user_id,
            },
            server: {
                server_id: userServer.server_id,
            },
            ssh_username: userServer.ssh_username,
            encrypted_password: userServer.encrypted_password,
        });

        // Save the new user-server association entity to the database
        const savedEntity = await this.userServerRepository.save(entity);

        // Exclude the encrypted_password field from the returned object
        const { encrypted_password, ...userServerWithoutPassword } = savedEntity;

        // Return the saved user-server association without the encrypted_password field
        return userServerWithoutPassword;
    }

    async updateUserServer(userId: number, serverId: number, userServer: Partial<CreateUserServerDto>): Promise<GetUserServerDto|null> {
        // Find the existing user-server association by userId and serverId
        const existingUserServer = await this.userServerRepository.findOne({
            where: {
                user: { user_id: userId },
                server: { server_id: serverId },
            },
            relations: {
                user: true,
                server: true,
            },
        });

        // If the existing user-server association is not found, throw a NotFoundException
        if (!existingUserServer) throw new NotFoundException(`UserServer with userId ${userId} and serverId ${serverId} not found`);

        // Update the existing user-server association with the new data from the DTO
        Object.assign(existingUserServer, userServer);

        // Save the updated user-server association entity to the database
        const saved = await this.userServerRepository.save(existingUserServer);

        // Exclude the encrypted_password field from the returned object
        //const { encrypted_password, ...userServerWithoutPassword } = saved;

        // Return the updated user-server association without the encrypted_password field
        //return userServerWithoutPassword;
        return saved;
    }

    async deleteUserServer(userId: number, serverId: number): Promise<void>{
        // Find the existing user-server association by userId and serverId
        const result = await this.userServerRepository.delete({
            user: {
                user_id: userId,
            },
            server: {
                server_id: serverId,
            },
        });

        if (result.affected === 0) {
            throw new NotFoundException(
                `UserServer with userId ${userId} and serverId ${serverId} not found`,
            );
        }
    }
}