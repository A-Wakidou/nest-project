import { Comments } from '../../comments/entities/comment.entity';
import { Ratings } from '../../ratings/entities/rating.entity';
import { Orders } from '../../orders/entities/orders.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Users {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstname: string;

    @Column()
    lastname: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    birthdate: Date;

    @Column()
    address: string;

    @Column()
    phoneNumber: string;

    @OneToMany(() => Orders, (order) => order.user, { eager: true, }) 
    orders: Orders[]

    @OneToMany(() => Ratings, (rating) => rating.user, { eager: true, })
    ratings: Ratings[]

    @OneToMany(() => Comments, (comment) => comment.user, { eager: true, })
    comments: Comments[]

    @CreateDateColumn()
    createdDate: Date

    @UpdateDateColumn()
    updatedDate: Date
}