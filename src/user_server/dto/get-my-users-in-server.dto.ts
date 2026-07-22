import { IsNumber, Min } from "class-validator";


export class GetMyUsersInServerDto {
    @IsNumber()
    @Min(1)
    user_id!: number;
    
    @IsNumber()
    @Min(1)
    server_id!: number;
}