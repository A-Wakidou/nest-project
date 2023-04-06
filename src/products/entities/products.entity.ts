import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Products {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    brand: string;

    @Column()
    category: string;

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