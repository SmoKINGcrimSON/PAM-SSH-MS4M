import { IsString, MinLength } from "class-validator";

export class AuthPayloadDto{

    @IsString()
    @MinLength(1)
    username!: string;

    @IsString()
    @MinLength(1)
    hash_password!: string;
}