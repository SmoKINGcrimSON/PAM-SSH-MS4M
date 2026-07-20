import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';

@Injectable() //decorator for a service class. It marks the class as a provider that can be injected into other classes. In NestJS, services are used to encapsulate business logic and can be shared across different parts of the application.
export class UserService {

    constructor(@Inject('USER_REPOSITORY') private userRepository: Repository<User>){}
    
    async getAllUsers({limit}: {limit?: number} = {}): Promise<User[]>{
        return this.userRepository.find({
            take: limit,
        })
    }

    async getUser({id}: {id?: number} = {}): Promise<User|null>{
        return this.userRepository.findOneBy({user_id: id});
    }

    async createUser(createUserDto: CreateUserDto): Promise<User> {
        const user = this.userRepository.create(createUserDto)
        return this.userRepository.save(user);
    }

    async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User|null> {
        //find the user by id
        const user = await this.userRepository.findOneBy({
            user_id: id
        });

        // If the user is not found, throw a NotFoundException
        if (!user) return null;

        // Update the user properties here if needed
        // For example, you can update the username or user_type based on the provided data

        Object.assign(user, updateUserDto);
        return this.userRepository.save(user);
    }

    async deleteUser({id}: {id?: number} = {}) : Promise<void> {
        const result = await this.userRepository.delete({
            user_id: id
        })

        if (result.affected === 0) throw new NotFoundException()
    }
}