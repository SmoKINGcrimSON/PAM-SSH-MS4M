import { Injectable, Inject, NotFoundException } from "@nestjs/common";
import { CreateUserServerDto } from "./dto/create-user-server.dto";
import { GetUserServerDto } from "./dto/get-user-server.dto";
import { DeleteUserServerDto } from "./dto/delete-user-server.dto";
import { GetMyUsersInServerDto } from "./dto/get-my-users-in-server.dto";
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

        // Exclude the encrypted_password field from the returned objects
        //return userServers.map(({ encrypted_password, ...userServer }) => userServer);
        return userServers;
    }

    async getMyUsersInOneServer(getMyUsersInServerDto: GetMyUsersInServerDto): Promise<GetUserServerDto[]|null> { //userId: number, serverId: number
        // Fetch a specific user-server association from the database based on the provided userId and serverId
        const userServer = await this.userServerRepository.find({
            where:{
                user :{ 
                    user_id: getMyUsersInServerDto.user_id, 
                },
                server :{ 
                    server_id: getMyUsersInServerDto.server_id, 
                },
            },
            /*
            relations: {
                user: true,
                server: true,
            }*/
        });

        // If the user-server association is not found, throw a NotFoundException
        if (!userServer || userServer.length === 0) throw new NotFoundException(`UserServer with userId ${getMyUsersInServerDto.user_id} and serverId ${getMyUsersInServerDto.server_id} not found`);
        return userServer;
        // Exclude the encrypted_password field from the returned object and also exclude server_password from the server object 
        //const { user_server_id, server, user, ...result } = userServer; //encrypted_password dont quit 
        //const {server_password, server_id, ...serverWithoutPassword} = server;
        //const {user_id, ...userWithoutId} = user;

        // Return the user-server association without the encrypted_password field, and also return the server object without
        //return { ...result, server: serverWithoutPassword, user: userWithoutId };
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

        // Exclude the encrypted_password field from the returned object
        //const { encrypted_password, ...userServerWithoutPassword } = savedEntity;

        // Return the saved user-server association without the encrypted_password field
        /*return {
            ssh_username: savedEntity.ssh_username,
            password: savedEntity.encrypted_password,
        };*/
        return savedEntity;
    }

    async updateUserServer(userServer: UpdateUserServerDto): Promise<GetUserServerDto|null> { //ssh_username: string, 
        // Find the existing user-server association by ssh_username
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
            /*
            relations: {
                user: true,
                server: true,
            },*/
        });

        // If the existing user-server association is not found, throw a NotFoundException
        if (!existingUserServer) throw new NotFoundException(`UserServer with this ssh_username ${userServer.ssh_username} doesn't exist`);
        const {ssh_username, user_id, server_id, ...userServerWithoutUsername} = userServer;

        // Update the existing user-server association with the new data from the DTO
        Object.assign(existingUserServer, userServerWithoutUsername);

        // Save the updated user-server association entity to the database
        const saved = await this.userServerRepository.save(existingUserServer);

        // Exclude the encrypted_password field from the returned object
        //const { encrypted_password, ...userServerWithoutPassword } = saved;

        // Return the updated user-server association without the encrypted_password field
        //return userServerWithoutPassword;
        //const {user_server_id, ...userServerWithoutId} = saved;
        //return userServerWithoutId;
        return {
            ssh_username: saved.ssh_username,
            server_id: saved.server.server_id,
        };
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