
import { IsNumber, IsString, Min, MinLength } from 'class-validator';

export class UpdateServerDto {

    @IsString()
    @MinLength(1)
    server_id?: string;

    @IsString()
    @MinLength(1)
    hostname?: string;

    @IsString()
    @MinLength(1)
    ip_address?: string;

    @IsNumber()
    @Min(1)
    ssh_port?: number;

    @IsString()
    @MinLength(1)
    mine_name?: string;
} 