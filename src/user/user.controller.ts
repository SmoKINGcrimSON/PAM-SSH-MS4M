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
    getAllUsers(@Query('limit') limit?: string) {
        return this.userService.getAllUsers({limit: limit ? parseInt(limit) : undefined});
    }

    @Get('/:id')
    @UseGuards(IdGuard) // Use the IdGuard to validate the id parameter
    getUser(@Param('id') id: string) {
        return this.userService.getUser({id});
    }

    @Post()
    createUser(@Body() user: CreateUserDto) {
        return this.userService.createUser(user);
    }

    @Put() //update all the data of user
    updateUser(@Body() user: UpdateUserDto) {
        return this.userService.updateUser(user);
    }

    @Delete()
    deleteUser() {
        return this.userService.deleteUser();
    }

    @Patch() //update only the specific data of user 
    patchUser() {
        return this.userService.patchUser();
    }
}
