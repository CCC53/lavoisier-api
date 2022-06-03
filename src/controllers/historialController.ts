import { Request, Response } from "express";
import { pick } from "underscore";
import { HistotrialClinico } from '../models/historialClinico';

export const getHistoriales = async(req: Request, res: Response) => {
    try {
        const historiales = await HistotrialClinico.find({
            relations: { paciente: true }
        });
        res.json({
            historiales
        });
    } catch (error) {
        res.status(500).json({
            error
        });
    }
}

export const getHistorialClinicoByID = async(req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const historialClinico = await HistotrialClinico.findOne({ where: { id } });
        if (!historialClinico) {
            return res.status(404).json({
                historialClinico: null
            })
        }
        res.json({
            historialClinico
        });
    } catch (error) {
        res.status(500).json({
            error
        });
    }
}

export const addHistorialClinico = async(req: Request, res: Response) => {
    try {
        const { enfermedadesCardiovasculares, enfermedadesPulmonares, enfermedadesMetabolicas, tabaquismo, 
            alcoholismo, sedentarismo, drogas, cafe, pacienteId } = req.body;
        const historialClinico = await HistotrialClinico.create({
            enfermedadesCardiovasculares,
            enfermedadesPulmonares,
            enfermedadesMetabolicas,
            tabaquismo,
            alcoholismo,
            sedentarismo,
            drogas,
            cafe,
            pacienteId
        });
        await historialClinico.save();
        res.json({
            historialClinico
        });
    } catch (error) {
        res.status(500).json({
            error
        });
    }
};

export const updateHistorial = async(req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const body = pick(req.body, ['alimentacion']);
        const { affected } = await HistotrialClinico.update(id, body);
        if (!affected) {
            return res.status(404).json({
                updated: false
            });
        }
        res.json({
            updated: true
        });
    } catch (error) {
        res.status(500).json({
            error
        });
    }
};

export const getHistorialByPacienteID = async(req: Request, res: Response) => {
    try {
        const { pacienteId } = req.params;
        const historialClinico = await HistotrialClinico.findOne({ where: { pacienteId } });
        if (!historialClinico) {
            return res.status(404).json({
                historialClinico: null
            });
        }
        res.json({
            historialClinico
        })
    } catch (error) {
        res.status(500).json({
            error
        });
    }
}