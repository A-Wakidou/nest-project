import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { Products } from '../../products/entities/products.entity';

@Entity()
export class ProductsImages {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    url: string

    @ManyToOne(() => Products, (products) => products.images)
    productId: Products

    @CreateDateColumn()
    createdDate: Date

    @UpdateDateColumn()
    updatedDate: Date
}