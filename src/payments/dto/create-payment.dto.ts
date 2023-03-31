import { ApiProperty } from '@nestjs/swagger';
import { Users } from '../../users/entities/users.entity';

export class CreatePaymentDto {
    @ApiProperty()
    userId: Users;
    @ApiProperty()
    amount: number;
}
