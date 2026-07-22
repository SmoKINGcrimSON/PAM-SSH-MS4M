import { Body, Controller, Delete, Patch, Post, Query, Param, UseGuards, NotFoundException } from '@nestjs/common';
import { Get } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IdGuard } from '../guards/id.guard';
import { ApiOperation } from '@nestjs/swagger';
import { Roles } from 'src/common/decorators/rol.decorator';

@Controller('user')
@Roles('superuser', 'admin')
export class UserController {

    constructor(private readonly userService: UserService) {}

    @ApiOperation({ summary: 'Get all users with optional limit' })
    @Get()
    async getAllUsers(@Query('limit') limit?: string){
        return this.userService.getAllUsers({limit: limit !== undefined ? Number(limit) : undefined});
    }

    @ApiOperation({ summary: 'Get a user by ID' })
    @Get('/:id')
    @UseGuards(IdGuard)
    async getUser(@Param('id') id: string){
        return this.userService.getUser({id: Number(id)});
    }
    
    @ApiOperation({ summary: 'Create a new user' })
    @Roles('superuser') // Only superusers can create new users
    @Post()
    async createUser(@Body() user: CreateUserDto) {
        return this.userService.createUser(user);
    }

    @ApiOperation({ summary: 'Update a user by ID' })
    @Patch('/:id')
    async updateUser(@Param('id') id: string, @Body() user: UpdateUserDto) {
        return await this.userService.updateUser(Number(id), user);
    }

    @ApiOperation({ summary: 'Delete a user by ID' })
    @Roles('superuser') // Only superusers can delete users
    @Delete('/:id')
    @UseGuards(IdGuard)
    async deleteUser(@Param('id') id: string) {
        return this.userService.deleteUser({id: Number(id)});
    }
}
