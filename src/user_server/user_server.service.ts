import { Injectable, Inject, NotFoundException } from "@nestjs/common";
import { CreateUserServerDto } from "./dto/create-user-server.dto";
import { GetUserServerDto } from "./dto/get-user-server.dto";
import { DeleteUserServerDto } from "./dto/delete-user-server.dto";
import { UpdateUserServerDto } from "./dto/update-user-server.dto";

@Injectable()
export class UserServerService {
    constructor(
        @Inject('USER_SERVER_REPOSITORY') private readonly userServerRepository: any,
        @Inject('USER_REPOSITORY') private readonly userRepository: any,
        @Inject('SERVER_REPOSITORY') private readonly serverRepository: any,
    ) {}

    async getAllUserServers({limit}: {limit?: number}): Promise<GetUserServerDto[]> {
        // Fetch all user-server associations from the database, with an optional limit on the number of results
        const userServers = await this.userServerRepository.find({
            take: limit,
        });

        return userServers;
    }

    async createUserServer(userServer: CreateUserServerDto) : Promise<GetUserServerDto> {
        // Check if the user exists in the database
        const user = await this.userRepository.findOne({
            where: {
                user_id: userServer.user_id,
            },
        });
        if (!user) throw new NotFoundException(`User with userId ${userServer.user_id} not found`);
        // Check if the server exists in the database
        const server = await this.serverRepository.findOne({
            where: {
                server_id: userServer.server_id,
            },
        });
        if (!server) throw new NotFoundException(`Server with serverId ${userServer.server_id} not found`);
        //
        const existingUserServer = await this.userServerRepository.findOne({
            where:{
                user:{
                    user_id: userServer.user_id,
                },
                server:{
                    server_id: userServer.server_id,
                },
                ssh_username: userServer.ssh_username,
            }
        })
        if (existingUserServer) throw new NotFoundException(`this ssh_user with this server and user already exist`);
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

        return savedEntity;
    }

    async updateUserServer(userServer: UpdateUserServerDto): Promise<GetUserServerDto|null> { //ssh_username: string, 
        // Find the existing user-server association by ssh_username
        try{
            const existingUserServer = await this.userServerRepository.findOne({
                where: {
                    user:{
                        user_id: userServer.user_id,
                    },
                    server:{
                        server_id: userServer.server_id,
                    },
                    ssh_username: userServer.ssh_username,
                },
                relations: {
                    user: true,
                    server: true,
                },
            });

            console.log('existingUserServer in service:', existingUserServer);

            // If the existing user-server association is not found, throw a NotFoundException
            if (!existingUserServer) throw new NotFoundException(`UserServer with this ssh_username ${userServer.ssh_username} doesn't exist`);
            const {ssh_username, user_id, server_id, ...userServerWithoutUsername} = userServer;

            // Update the existing user-server association with the new data from the DTO
            Object.assign(existingUserServer, userServerWithoutUsername);

            // Save the updated user-server association entity to the database
            const saved = await this.userServerRepository.save(existingUserServer);

            return {
                ssh_username: saved.ssh_username,
                encrypted_password: saved.encrypted_password,
            };
        } catch (error) {
            throw new NotFoundException(`Error in data provided: ${error}`);
        }
    }

    async deleteUserServer(deleteUserDto: DeleteUserServerDto): Promise<void>{
        // Find the existing user-server association by userId and serverId
        const result = await this.userServerRepository.delete({
            ssh_username: deleteUserDto.ssh_username,
            user: {
                user_id: deleteUserDto.user_id,
            },
            server: {
                server_id: deleteUserDto.server_id,
            },
        });

        if (result.affected === 0) throw new NotFoundException(`UserServer with ssh_username ${deleteUserDto.ssh_username} not found`,);
    }
}