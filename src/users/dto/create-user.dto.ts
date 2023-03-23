import { ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
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
 