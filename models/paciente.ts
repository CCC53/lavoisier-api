import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { SexTypes } from "../types/types";
import { Cita } from './cita';

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

    @OneToMany(() => Cita, (cita) => cita.paciente)
    citas: Cita[];
}