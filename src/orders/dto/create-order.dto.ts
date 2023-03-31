import { ApiProperty } from '@nestjs/swagger';
// import { Products } from '../../products/entities/products.entity';
import { Users } from '../../users/entities/users.entity';

export class CreateOrderDto {
    @ApiProperty()
    userId: Users;
    @ApiProperty()
    productId: [];
    @ApiProperty()
    status: string;
}
