import { ApiProperty } from '@nestjs/swagger';
import { Products } from '../../products/entities/products.entity';
import { Users } from '../../users/entities/users.entity';
import { Payments } from '../../payments/entities/payments.entity';

export class CreateOrderDto {
    @ApiProperty()
    userId: Users;
    @ApiProperty()
    productsId: Products[];
    @ApiProperty()
    paymentId: Payments;
    @ApiProperty()
    status: string;
}
