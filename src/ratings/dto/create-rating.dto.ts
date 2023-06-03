import { ApiProperty } from '@nestjs/swagger';
import { Products } from '../../products/entities/products.entity';
import { Users } from '../../users/entities/users.entity';

export class CreateRatingDto {
    @ApiProperty()
    rating:number
    @ApiProperty()
    productId: Products
    @ApiProperty()
    userId: Users
}
