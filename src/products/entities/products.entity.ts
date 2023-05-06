import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { Categories } from '../../categories/entities/categories.entity'
import { Orders } from '../../orders/entities/orders.entity';
import { ProductsImages } from '../../products_images/entities/products_images.entity';

@Entity()
export class Products {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    stripeId: string;

    @Column()
    title: string;

    @OneToMany(() => ProductsImages, (productsImages) => productsImages.productId, { eager: true, })
    images: ProductsImages[]

    @Column()
    brand: string;

    @ManyToMany(() => Categories, (category) => category.products, { eager: true, })
    @JoinTable({ name: "products_categories" })
    categories: Categories[]

    @ManyToMany(() => Orders, (orders) => orders.products)
    order: Orders[]

    @Column()
    description: string;

    @Column()
    price: number;

    @Column()
    stock: number;

    @CreateDateColumn()
    createdDate: Date

    @UpdateDateColumn()
    updatedDate: Date
}