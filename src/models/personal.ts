import { BaseEntity, PrimaryGeneratedColumn, Column, Entity } from 'typeorm';
import { RolTypes } from '../types/types';

@Entity('personal')
export class Personal extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    nombre: string;

    @Column()
    telefono: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column({
        type: "enum",
        enum: RolTypes
    })
    rol: string;
};