import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { Products } from '../../products/entities/products.entity';
import { Users } from '../../users/entities/users.entity';

@Entity()
export class Comments {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("text")
    comment: string

    @ManyToOne( () => Products, (product) => product.comments)
    product: Products

    @ManyToOne( () => Users, (user) => user.comments)
    user: Users

    @CreateDateColumn()
    createdDate: Date

    @UpdateDateColumn()
    updatedDate: Date
}