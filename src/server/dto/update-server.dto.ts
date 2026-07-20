import { PartialType } from '@nestjs/mapped-types';
import { CreateServerDto } from 'src/server/dto/create-server.dto';

export class UpdateServerDto extends PartialType(CreateServerDto) {}