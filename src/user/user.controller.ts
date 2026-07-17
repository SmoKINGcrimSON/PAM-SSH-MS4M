import { Body, Controller, Delete, Patch, Post, Put, Query, Param, UsePipes, ValidationPipe, UseGuards } from '@nestjs/common';
import { Get } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IdGuard } from '../guards/id.guard';

@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService) {}

    @Get()
    getAllUsers(@Query('limit') limit?: string){
        return this.userService.getAllUsers({limit: limit !== undefined ? Number(limit) : undefined});
    }

    @Get('/:id')
    @UseGuards(IdGuard)
    getUser(@Param('id') id: string){
        return this.userService.getUser({id: Number(id)});
    }

    @Post()
    createUser(@Body() user: CreateUserDto) {
        return this.userService.createUser(user);
    }

    @Patch('/:id')
    @UseGuards(IdGuard)
    updateUser(@Param('id') id: string, @Body() user: UpdateUserDto) {
        return this.userService.updateUser(Number(id), user);
    }

    @Delete('/:id')
    @UseGuards(IdGuard)
    deleteUser(@Param('id') id: string) {
        return this.userService.deleteUser({id: Number(id)});
    }
}
