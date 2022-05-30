import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { SexTypes } from "../types/types";
import { Cita } from './cita';
import { Antropometria } from './antropometria';
import { Laboratorial } from "./laboratorial";

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

    @OneToMany(() => Antropometria, (antropometria) => antropometria.paciente)
    antropometricos: Antropometria[];

    @OneToMany(() => Laboratorial, laboratorial => laboratorial.paciente)
    laboratoriales: Laboratorial[];
}