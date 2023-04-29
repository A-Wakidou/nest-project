import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Payments {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    paymentIntentId: string

    @Column()
    amount: number;

    @Column()
    method: string

    @CreateDateColumn()
    createdDate: Date

    @UpdateDateColumn()
    updatedDate: Date
}