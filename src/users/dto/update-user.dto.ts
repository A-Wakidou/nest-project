import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @ApiPropertyOptional()
    firstname: string;
    @ApiPropertyOptional()
    lastname: string;
    @ApiPropertyOptional()
    email: string;
    @ApiPropertyOptional()
    password: string;
    @ApiPropertyOptional()
    birthdate: Date;
    @ApiPropertyOptional()
    address: string;
    @ApiPropertyOptional()
    phoneNumber: string
}
