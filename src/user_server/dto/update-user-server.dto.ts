//import { PartialType } from "@nestjs/mapped-types";
//import { CreateUserServerDto } from "./create-user-server.dto";

import { Min, MinLength, IsNumber, IsString } from "class-validator";

export class UpdateUserServerDto{ //extends PartialType(CreateUserServerDto) {}
    @IsString()
        @MinLength(1)
        ssh_username!: string;
    
        @IsNumber()
        @Min(1)
        user_id!: number;
    
        @IsNumber()
        @Min(1)
        server_id!: number;
}