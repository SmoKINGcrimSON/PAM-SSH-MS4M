import { IsString, MinLength } from 'class-validator';

export class CreateUserDto {
    @IsString ()
    @MinLength(1)
    user_id: string;

    @IsString()
    @MinLength(1) // Fixed: Changed from @Min(1)
    username: string;

    @IsString()
    @MinLength(1) // Fixed: Changed from @Min(1)
    user_type: string;
}