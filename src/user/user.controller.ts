import { Body, Controller, Delete, Patch, Post, Query, Param, UseGuards, NotFoundException } from '@nestjs/common';
import { Get } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IdGuard } from '../guards/id.guard';

@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService) {}

    @Get()
    async getAllUsers(@Query('limit') limit?: string){
        return this.userService.getAllUsers({limit: limit !== undefined ? Number(limit) : undefined});
    }

    @Get('/:id')
    @UseGuards(IdGuard)
    async getUser(@Param('id') id: string){
        return this.userService.getUser({id: Number(id)});
    }

    @Post()
    async createUser(@Body() user: CreateUserDto) {
        return this.userService.createUser(user);
    }

    @Patch('/:id')
    @UseGuards(IdGuard)
    async updateUser(@Param('id') id: string, @Body() user: UpdateUserDto) {
        const updatedUser = await this.userService.updateUser(Number(id), user);
        if (!updatedUser) throw new NotFoundException(`User with id ${id} not found`);
        return updatedUser;
    }

    @Delete('/:id')
    @UseGuards(IdGuard)
    async deleteUser(@Param('id') id: string) {
        return this.userService.deleteUser({id: Number(id)});
    }
}
