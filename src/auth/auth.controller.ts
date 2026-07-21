import { Controller, Post, Body, HttpCode, HttpStatus, Get, Request } from '@nestjs/common';
import { AuthPayloadDto } from './dto/auth.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    @HttpCode(HttpStatus.OK)
    @Public()
    @Post('login')
    async signIn(@Body() authPayload: AuthPayloadDto): Promise<{ accessToken: string }> {
        return this.authService.validateUser(authPayload);
    }

    @HttpCode(HttpStatus.CREATED)
    @Public()
    @Post('register')
    async register(@Body() authPayload: AuthPayloadDto): Promise<{ accessToken: string }> {
        return this.authService.registerUser(authPayload);
    }

    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }
}
