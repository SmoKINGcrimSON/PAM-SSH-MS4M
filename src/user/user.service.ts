import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';

@Injectable() //decorator for a service class. It marks the class as a provider that can be injected into other classes. In NestJS, services are used to encapsulate business logic and can be shared across different parts of the application.
export class UserService {

    constructor(@Inject('USER_REPOSITORY') private userRepository: Repository<User>){}
    
    async getAllUsers({limit}: {limit?: number} = {}): Promise<CreateUserDto[]>{
        return this.userRepository.find({take: limit, order: {username: 'ASC'}});
    }

    async getUser({id}: {id?: number} = {}): Promise<CreateUserDto|null>{
        const user = await this.userRepository.findOneBy({user_id: id});
        if (!user) throw new NotFoundException(`User not found.`);
        return user;
    }

    async createUser(createUserDto: CreateUserDto): Promise<CreateUserDto> {
        // Check if a user with the same username already exists
        const existingUser = await this.userRepository.findOneBy({ username: createUserDto.username });

        // If a user with the same username exists, throw a NotFoundException
        if (existingUser) throw new NotFoundException(`User with username ${createUserDto.username} already exists.`);

        // Create a new user entity and save it to the database
        const user = this.userRepository.create(createUserDto)
        return this.userRepository.save(user);
    }

    async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<CreateUserDto|null> {
        //find the user by id
        const user = await this.userRepository.findOneBy({
            user_id: id
        });

        // If the user is not found, throw a NotFoundException
        if (!user) throw new NotFoundException(`User with id ${id} not found`);

        // Destructure the updateUserDto to drop the username from the rest of the properties
        const {username, ...updateData} = updateUserDto as any;

        // Update the user properties here if needed
        // For example, you can update the username or user_type based on the provided data

        Object.assign(user, updateData);
        return this.userRepository.save(user);
    }

    async deleteUser({id}: {id?: number} = {}) : Promise<void> {
        const result = await this.userRepository.delete({user_id: id});

        if (result.affected === 0) throw new NotFoundException("User to delete does not exist");
    }
}