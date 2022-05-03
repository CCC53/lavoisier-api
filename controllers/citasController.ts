import { Request, Response } from "express";
import { Cita } from '../models/cita';

export const getCitas = async(req: Request, res: Response) => {
    try {
        const citas = await Cita.find();
        res.json({
            citas
        });
    } catch (error) {
        res.status(500).json({
            error
        });
    }
};

export const getCitaByID = async(req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const cita = await Cita.findOne({
            where: { id },
            relations: { paciente: true }
        });
        if (!cita) {
            res.status(404).json({
                cita: null
            });
        } else {
            res.json({
                cita
            });
        }
    } catch (error) {
        res.status(500).json({
            error
        });
    }
};

export const addCita = async(req: Request, res: Response) => {
    try {
        const { motivo, fecha, horario, paciente } = req.body;
        const cita = await Cita.create({
            motivo,
            fecha,
            horario,
            paciente
        });
        await cita.save();
        res.json({
            cita
        });
    } catch (error) {
        res.status(500).json({
            error
        });
    }
};

export const updateCita = async(req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const body = req.body;
        const { affected } = await Cita.update(id, {...body});
        if (!affected) {
            res.status(404).json({
                updated: false
            });
        } else {
            res.json({
                updated: true
            });
        }
    } catch (error) {
        res.status(500).json({
            error
        });
    }
}

export const deleteCita = async(req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { affected } = await Cita.delete(id);
        if (!affected) {
            res.status(404).json({
                deleted: false
            });
        } else {
            res.json({
                deleted: true
            });
        }
    } catch (error) {
        res.status(500).json({
            error
        });
    }
}