import { IsNumber, IsString, Min, MinLength } from "class-validator";

export class DeleteUserServerDto {
    @IsString()
    @MinLength(1)
    ssh_username!: string;

    @IsNumber()
    @Min(1)
    user_id!: number;

    @IsNumber()
    @Min(1)
    server_id!: string;
}