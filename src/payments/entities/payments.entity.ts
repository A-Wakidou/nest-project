import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { Users } from '../../users/entities/users.entity';

@Entity()
export class Payments {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne((type) => Users, (users) => users.id, {
        cascade: true,
    })
    user: Users

    @Column()
    amount: number;

    @CreateDateColumn()
    createdDate: Date

    @UpdateDateColumn()
    updatedDate: Date
}