import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Paciente } from './paciente';

@Entity('antropometria')
export class Antropometria extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'date' })
    fecha: Date;

    @Column({ type: 'float' })
    peso: number;

    @Column({ type: 'float' })
    talla: number;

    @Column({ type: 'float' })
    imc: number;

    @Column({ type: 'float' })
    cintura: number;

    @Column({ type: 'float', name: 'c_brazo' })
    cBrazo: number;

    @Column({ type: 'float', name: 'p_triceps' })
    pTriceps: number;
    
    @Column({ type: 'float', name: 'p_abdominal' })
    pAbdominal: number;

    @Column({ name: 'porcentaje_grasa' })
    porcentajeGrasa: string;

    @ManyToOne( () => Paciente, (paciente) => paciente.antropometricos, {
        onDelete: 'CASCADE'
    })
    @JoinColumn({ name: 'paciente_id' })
    paciente: Paciente;

    @Column({ name: 'paciente_id' })
    pacienteId: string;
};