import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';
import { Paciente } from './paciente';

@Entity('laboratoriales')
export class Laboratorial extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'date' })
    fecha: Date;

    @Column({type: 'float'})
    glucosa: number;
    
    @Column({type: 'float'})
    insulina: number;
    
    @Column({type: 'float'})
    trigliceridos: number;
    
    @Column({type: 'float'})
    colesterolTotal: number;
    
    @Column({type: 'float'})
    hdl: number;

    @Column({type: 'float'})
    ldl: number;

    @ManyToOne(() => Paciente, (paciente) => paciente.laboratoriales, {
        onDelete: 'CASCADE'
    })
    @JoinColumn({ name: 'paciente_id' })
    paciente: Paciente;

    @Column({ name: 'paciente_id' })
    pacienteId: string;
};