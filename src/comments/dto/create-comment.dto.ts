import { ApiProperty } from '@nestjs/swagger';
import { Products } from 'src/products/entities/products.entity';
import { Users } from 'src/users/entities/users.entity';

export class CreateCommentDto {
    @ApiProperty()
    comment: string
    @ApiProperty()
    productId: Products
    @ApiProperty()
    userId: Users
}
