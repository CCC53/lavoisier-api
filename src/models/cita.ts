import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Paciente } from './paciente';

@Entity('citas')
export class Cita extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;
    
    @Column()
    motivo: string;

    @Column({
        type: "date"
    })
    fecha: Date;

    @Column()
    horario: string;

    @ManyToOne(() => Paciente, (paciente) => paciente.citas,  {
        onDelete: "CASCADE"
    })
    paciente: Paciente;
}