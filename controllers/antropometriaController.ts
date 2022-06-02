import { Request, Response } from "express";
import { Antropometria } from "../models/antropometria";
import { pick } from 'underscore';

export const getAntropometricos = async(req: Request, res: Response) => {
    try {
        const antropometricos = await Antropometria.find();
        res.json({
            antropometricos
        })
    } catch (error) {
        res.status(500).json({
            error
        });
    }
}

export const getAntropometricoByID = async(req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const antropometrico = await Antropometria.findOne({ where: { id } });
        if (!antropometrico) {
            return res.status(404).json({
                antropometrico: null
            });
        }
        res.json({
            antropometrico
        });
    } catch (error) {
        res.status(500).json({
            error
        });
    }
}

export const addAntropometrico = async(req: Request, res: Response) => {
    try {
        const { fecha, peso, talla, imc, cintura, cBrazo, pTriceps, pAbdominal, porcentajeGrasa, paciente  } = req.body;
        const antropometrico = await Antropometria.create({
            fecha,
            peso,
            talla,
            imc,
            cintura,
            cBrazo,
            pTriceps,
            pAbdominal,
            porcentajeGrasa,
            paciente
        });
        await antropometrico.save();
        res.json({
            antropometrico
        });
    } catch (error) {
        res.status(500).json({
            error
        });
    }
}

export const updateAntropometrico = async(req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const body = pick(req.body, ['fecha', 'peso', 'talla', 'imc', 'cintura', 'cBrazo', 'pTriceps', 'pAbdominal', 'porcentajeGrasa']);
        const { affected } = await Antropometria.update(id, body);
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
}