import { PartialType } from '@nestjs/swagger';
import { CreateUserServerDto } from "./create-user-server.dto";

export class UpdateUserServerDto extends PartialType(CreateUserServerDto) {} //extends OmitType(CreateUserServerDto, ['encrypted_password'] as const) {}    