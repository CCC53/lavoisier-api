import { Request, Response } from "express";
import { Pago } from '../models/pago';

export const addPago = async(req: Request, res: Response) => {
    try {
        const { citaId, monto, metodoPago, tipoPago, cantidadRecibida } = req.body;
        let cambio = cantidadRecibida-monto;
        const pago = await Pago.create({
            monto,
            metodoPago,
            tipoPago,
            cantidadRecibida,
            cambio,
            citaId
        });
        await pago.save();
        res.json({
            pago
        });
    } catch (error) {
        res.status(500).json({
            error
        });
    }
};

export const getPagos = async(req: Request, res: Response) => {
    try {
        const pagos = await Pago.find();
        res.json({
            pagos
        });
    } catch (error) {
        res.status(500).json({
            error
        });
    }
}

export const getPagoByID = async(req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const pago = await Pago.findOne({
            where: { id },
            relations: {
                cita: true
            }
        });
        if (!pago) {
            return res.status(404).json({
                pago: null
            });
        }
        res.json({
            pago
        });
    } catch (error) {
        res.status(500).json({
            error
        });
    }
}

export const getPagoByCitaID = async(req: Request, res: Response) => {
    try {
        const { citaId } = req.params;
        const pago = await Pago.findOne({ where: { citaId } });
        if (!pago) {
            return res.status(404).json({
                pago: null
            });
        }
        res.json({
            pago
        });
    } catch (error) {
        res.status(500).json({
            error
        });
    }
};