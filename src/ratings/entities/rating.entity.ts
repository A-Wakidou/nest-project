import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { Products } from '../../products/entities/products.entity';
import { Users } from '../../users/entities/users.entity';

@Entity()
export class Ratings {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    rating: number

    @ManyToOne( () => Products, (product) => product.ratings)
    product: Products

    @ManyToOne( () => Users, (user) => user.ratings)
    user: Users

    @CreateDateColumn()
    createdDate: Date

    @UpdateDateColumn()
    updatedDate: Date
}