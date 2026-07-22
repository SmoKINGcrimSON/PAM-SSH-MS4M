import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthPayloadDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

    constructor(@Inject('USER_REPOSITORY') private readonly userRepository: any, private readonly jwtService: JwtService) {}

    async validateUser(authPayload: AuthPayloadDto): Promise<{ accessToken: string }> { //authPayload: AuthPayloadDto
        const { username, hash_password } = authPayload;
        
        const user = await this.userRepository.findOne({ where: { username } });
        
        if (!user) throw new UnauthorizedException('Invalid username or password');
        
        const isPasswordValid = await bcrypt.compare(hash_password, user.hash_password);
        
        if (!isPasswordValid) throw new UnauthorizedException('Invalid username or password');

        const payload = { username: user.username, sub: user.user_id, role: user.user_type };
        return {
            accessToken: await this.jwtService.signAsync(payload),
        };
    }

    async registerUser(authPayload: AuthPayloadDto): Promise<{ accessToken: string }> {
        const { username, hash_password } = authPayload;
        //check if user already exists
        const existingUser = await this.userRepository.findOne({ where: { username } });
        if (existingUser) throw new UnauthorizedException('User already exists');
        // Map AuthPayloadDto -> CreateUserDto
        const user = this.userRepository.create({
            username,
            user_type: 'superuser', // Default user type, you can change this as needed
            hash_password: hash_password,
        });

        await this.userRepository.save(user);
        // Generate access token
        const payload = { username: user.username, sub: user.user_id, role: user.user_type };
        return {
            accessToken: await this.jwtService.signAsync(payload),
        };
    }
}
