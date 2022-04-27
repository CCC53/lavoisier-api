import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Cita } from './citas';

export enum SexTypes {
    MASCULINO = "M",
    FEMENINO = "F",
    OTRO = "O"
}

@Entity('pacientes')
export class Paciente extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    nombre: string;

    @Column({
        type: "date"
    })
    nacimiento: Date;

    @Column({
        type: "enum",
        enum: SexTypes
    })
    sexo: string;

    @Column()
    telefono: string;

    @Column({
        unique: true
    })
    email: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(() => Cita, (cita) => cita.paciente)
    citas: Cita[];
}