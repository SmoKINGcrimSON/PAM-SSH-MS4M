import { IsNumber, IsString, Min, MinLength } from "class-validator";


export class CreateUserServerDto {

    @IsNumber()
    @Min(1)
    user_id!: number;

    @IsNumber()
    @Min(1)
    server_id!: number;

    @IsString()
    @MinLength(1)
    ssh_username!: string;

    @IsString()
    @MinLength(1)
    encrypted_password!: string;
}