import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { EnfermedadesResponse } from '../types/types';
import { Paciente } from './paciente';
import { Laboratorial } from './laboratorial';

@Entity('historial_clinico')
export class HistotrialClinico extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'enf_cardiovasculares', type: 'enum', enum: EnfermedadesResponse })
    enfermedadesCardiovasculares: string;

    @Column({ name: 'enf_pulmonares', type: 'enum', enum: EnfermedadesResponse })
    enfermedadesPulmonares: string;

    @Column({ name: 'enf_metabolicas', type: 'enum', enum: EnfermedadesResponse })
    enfermedadesMetabolicas: string;

    @Column({ type: 'enum', enum: EnfermedadesResponse })
    tabaquismo: string;

    @Column({ type: 'enum', enum: EnfermedadesResponse })
    alcoholismo: string;

    @Column({ type: 'enum', enum: EnfermedadesResponse })
    sedentarismo: string;

    @Column({ type: 'enum', enum: EnfermedadesResponse })
    drogas: string;

    @Column({ type: 'enum', enum: EnfermedadesResponse })
    cafe: string;

    @Column({ nullable: true  })
    alimentacion: string;

    @OneToOne(() => Paciente, paciente => paciente.id, {
        onDelete: 'CASCADE'
    })
    @JoinColumn({ name: 'paciente_id' })
    paciente: Paciente;

    @Column({name: 'paciente_id', nullable: true})
    pacienteId: string;
}