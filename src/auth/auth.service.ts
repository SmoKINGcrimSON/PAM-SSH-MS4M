import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthPayloadDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(@Inject('USER_REPOSITORY') private readonly userRepository: any, private readonly jwtService: JwtService) {}

    async validateUser(authPayload: AuthPayloadDto): Promise<{ accessToken: string }> {
        // Implement your user validation logic here
        const { username, password } = authPayload;
        //check if exist in user database
        const user = await this.userRepository.findOne({ where: { username } });
        //check if password matches
        if (!user) throw new UnauthorizedException('Invalid username or password');
        //generate hash of password and compare with user.password
        const isPasswordValid = await bcrypt.compare(password, user.hash_password);
        //return true if valid, false otherwise
        if (!isPasswordValid) throw new UnauthorizedException('Invalid username or password');
        //generate jwt token
        const payload = { username: user.username, sub: user.user_id, role: user.user_type };
        return {
            accessToken: await this.jwtService.signAsync(payload),
        };
    }

    async registerUser(authPayload: AuthPayloadDto): Promise<{ accessToken: string }> {
        const { username, password } = authPayload;
        //check if user already exists
        const existingUser = await this.userRepository.findOne({ where: { username } });
        if (existingUser) throw new UnauthorizedException('User already exists');
        //hash password and create new user
        const hashPassword = await bcrypt.hash(password, 10);
        // Map AuthPayloadDto -> CreateUserDto
        const user = this.userRepository.create({
            username,
            user_type: 'superuser', // Default user type, you can change this as needed
            hash_password: hashPassword,
        });

        await this.userRepository.save(user);
        // Generate access token
        const payload = { username: user.username, sub: user.user_id, role: user.user_type };
        return {
            accessToken: await this.jwtService.signAsync(payload),
        };
    }
}
