import { Request, Response } from "express";
import { pick } from 'underscore';
import { Laboratorial } from '../models/laboratorial';

export const getLaboratorialByID = async(req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const laboratorial = await Laboratorial.findOne({ where: { id } });
        if (!laboratorial) {
            return res.status(404).json({
                laboratorial: null
            });
        }
        laboratorial.fecha = new Date(laboratorial.fecha);
        res.json({
            laboratorial
        });
    } catch (error) {
        res.status(500).json({
            error
        })
    }
}

export const getLaboratoriales = async(req: Request, res: Response) => {
    try {
        const laboratoriales = await Laboratorial.find();
        res.json({
            laboratoriales
        });
    } catch (error) {
        res.status(500).json({
            error
        })
    }
}

export const addLaboratorial = async(req: Request, res: Response) => {
    try {
        const { fecha, glucosa, insulina, trigliceridos, colesterolTotal, hdl, ldl, paciente } = req.body;
        const laboratorial = await Laboratorial.create({
            fecha,
            glucosa,
            insulina,
            trigliceridos,
            colesterolTotal,
            hdl,
            ldl,
            paciente
        });
        await laboratorial.save();
        res.json({
            laboratorial
        });
    } catch (error) {
        res.status(500).json({
            error
        });
    }
}

export const updateLaboratorial = async(req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const body = pick(req.body, ['fecha', 'glucosa', 'insulina', 'trigliceridos', 'colesterolTotal', 'hdl', 'ldl']);
        const { affected } = await Laboratorial.update(id, body);
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