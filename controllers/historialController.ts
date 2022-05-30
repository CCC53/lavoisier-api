import { Request, Response } from "express";
import { HistotrialClinico } from '../models/historialClinico';

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
            alcoholismo, sedentarismo, drogas, cafe, alimentacion, paciente } = req.body;
        const historialClinico = await HistotrialClinico.create({
            enfermedadesCardiovasculares,
            enfermedadesPulmonares,
            enfermedadesMetabolicas,
            tabaquismo,
            alcoholismo,
            sedentarismo,
            drogas,
            cafe,
            alimentacion,
            paciente
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