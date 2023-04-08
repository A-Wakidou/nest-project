import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable, } from 'typeorm';
import { Categories } from '../../categories/entities/categories.entity'

@Entity()
export class Products {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    image: string

    @Column()
    brand: string;

    @ManyToMany(() => Categories, (category) => category.products, { eager: true, })
    @JoinTable({ name: "products_categories" })
    categories: Categories[]

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