import { Users } from '../../users/entities/users.entity';
import { Products } from '../../products/entities/products.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, JoinColumn, ManyToOne, ManyToMany, JoinTable, OneToOne } from 'typeorm';
import { Payments } from '../../payments/entities/payments.entity';

@Entity()
export class Orders {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Users, (users) => users.id)
    user: Users

    @ManyToMany(() => Products, (products) => products.id, { eager: true })
    @JoinTable({ name: "orders_products" })
    products: Products[]

    @OneToOne(() => Payments)
    @JoinColumn()
    payment: Payments

    @Column()
    status: string;

    @CreateDateColumn()
    createdDate: Date

    @UpdateDateColumn()
    updatedDate: Date
}