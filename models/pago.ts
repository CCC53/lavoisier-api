import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { MetodosPago, TipoPago } from '../types/types';
import { Cita } from './cita';

@Entity('pagos')
export class Pago extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'float' })
    monto: number;

    @Column({ name: 'metodo_pago', type: 'enum', enum: MetodosPago })
    metodoPago: string;

    @Column({ name: 'tipo_pago', type: 'enum', enum: TipoPago })
    tipoPago: number;

    @Column({ name: 'cantidad_recibida', type: 'float' })
    cantidadRecibida: number;

    @Column({ type: 'float' })
    cambio: number;

    @OneToOne(() => Cita, cita => cita.id, {
        onDelete: "CASCADE"
    })
    @JoinColumn()
    cita: Cita;
}