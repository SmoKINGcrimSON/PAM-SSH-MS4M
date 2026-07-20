import { OmitType } from '@nestjs/mapped-types';
import { CreateUserServerDto } from './create-user-server.dto';

export class GetUserServerDto extends OmitType(CreateUserServerDto, ['encrypted_password'] as const) {}