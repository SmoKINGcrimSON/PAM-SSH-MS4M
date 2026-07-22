//import { PartialType } from '@nestjs/mapped-types';
//import { CreateServerDto } from 'src/server/dto/create-server.dto';
import { IsNumber, IsString, Min, MinLength } from 'class-validator';

export class UpdateServerDto{ //extends PartialType(CreateServerDto) {}
    @IsString()
    @MinLength(1)
    hostname!: string;

    @IsString()
    @MinLength(1)
    mine_name!: string;

    @IsString()
    @MinLength(1)
    server_password!: string;
}