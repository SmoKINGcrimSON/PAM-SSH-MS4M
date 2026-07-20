import { OmitType } from '@nestjs/mapped-types';
import { CreateServerDto } from './create-server.dto';

export class GetServerDto extends OmitType(CreateServerDto, ['server_password'] as const) {}