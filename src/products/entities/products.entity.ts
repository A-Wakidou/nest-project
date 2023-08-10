import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { Categories } from '../../categories/entities/categories.entity'
import { Orders } from '../../orders/entities/orders.entity';
import { ProductsImages } from '../../products_images/entities/products_images.entity';
import { Ratings } from '../../ratings/entities/rating.entity';
import { Comments } from '../../comments/entities/comment.entity';

@Entity()
export class Products {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    // @Column({ unique: true })
    // stripeId: string;

    @OneToMany(() => ProductsImages, (productsImages) => productsImages.product, { eager: true })
    images: ProductsImages[]

    @OneToMany( () => Ratings, (rating) => rating.product, { eager: true })
    ratings: Ratings[]

    @OneToMany( () => Comments, (comment) => comment.product, { eager: true})
    comments: Comments[]

    @Column()
    brand: string;

    @ManyToMany(() => Categories, (category) => category.products, { eager: true, })
    @JoinTable({ name: "products_categories" })
    categories: Categories[]

    @ManyToMany(() => Orders, (orders) => orders.products)
    order: Orders[]

    @Column({type: "text"})
    description: string;

    @Column({type: "text"})
    technicalDescription: string;

    @Column()
    price: number;

    @Column()
    stock: number;

    @CreateDateColumn()
    createdDate: Date

    @UpdateDateColumn()
    updatedDate: Date
}