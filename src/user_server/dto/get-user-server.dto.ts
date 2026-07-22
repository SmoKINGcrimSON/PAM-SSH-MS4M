//import { OmitType } from '@nestjs/mapped-types';
import { CreateUserServerDto } from './create-user-server.dto';
import { PartialType } from "@nestjs/mapped-types";

export class GetUserServerDto extends PartialType(CreateUserServerDto) {} //extends OmitType(CreateUserServerDto, ['encrypted_password'] as const) {}