import { Users } from '../../users/entities/users.entity';
import { Products } from '../../products/entities/products.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';

@Entity()
export class Orders {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne((type) => Users, (users) => users.id, {
        cascade: true,
    })
    user: Users

    @ManyToOne((type) => Products, (products) => products.id, {
        cascade: true,
    })
    product: Products

    @Column()
    status: string;

    @CreateDateColumn()
    createdDate: Date

    @UpdateDateColumn()
    updatedDate: Date
}