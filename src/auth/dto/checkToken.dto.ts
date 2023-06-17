import { ApiProperty } from '@nestjs/swagger';

export class CheckToken {
    @ApiProperty()
    token: string;
}