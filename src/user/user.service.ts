import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

export interface User {
    user_id: string;
    username: string;
    user_type: string;
}

@Injectable() //decorator for a service class. It marks the class as a provider that can be injected into other classes. In NestJS, services are used to encapsulate business logic and can be shared across different parts of the application.
export class UserService {
    private users: User[] = [
        {
            user_id: "1",
            username: 'papu1',
            user_type: 'root',
        },
        {
            user_id: "2",
            username: 'papu2',
            user_type: 'admin',
        },
        {
            user_id: "3",
            username: 'papu3',
            user_type: 'admin'
        },
        {
            user_id: "4",
            username: 'papu4',
            user_type: 'user'
        },
        {
            user_id: "5",
            username: 'papu5',
            user_type: 'user'
        },
        {
            user_id: "6",
            username: 'papu6',
            user_type: 'user'
        },
        {
            user_id: "7",
            username: 'papu7',
            user_type: 'user'
        },
        {
            user_id: "8",
            username: 'papu8',
            user_type: 'user'
        }
    ];


    getAllUsers({limit}: {limit?: number} = {}) {
        return limit ? this.users.slice(0, limit) : this.users;
    }

    getUser({id}: {id: string}) {
        const user = this.users.find(user => user.user_id === id);
        if (!user) return new NotFoundException(`User with id ${id} not found`);
        return user;
    }

    createUser(user: CreateUserDto) {
        console.log('user =', user);
        this.users.push(user);
        return this.users;
    }

    updateUser(user: UpdateUserDto) {
        console.log('user =', user);
        return 'update user';
    }

    deleteUser() {
        return 'delete user';
    }

    patchUser() {
        return 'patch user';
    }
}