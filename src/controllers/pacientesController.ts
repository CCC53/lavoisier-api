import { Request, Response } from "express";
import { Paciente } from '../models/paciente';

export const getPacientes = async(req: Request, res: Response) => {
    try {
        const pacientes = await Paciente.find();
        res.json({
            pacientes
        });
    } catch (error) {
        res.status(500).json({
            error
        });
    }
}

export const getPacienteByID = async(req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const paciente = await Paciente.findOne({
            where: { id },
            relations: { citas: true }
        });
        if (!paciente) {
            res.status(404).json({
                paciente: null
            });
        } else {
            res.json({
                paciente
            })
        }
    } catch (error) {
        res.status(500).json({
            error
        });
    }
}

export const addPaciente = async(req: Request, res: Response) => {
    try {
        const { nacimiento, email, nombre, telefono, sexo } = req.body;
        const paciente = await Paciente.create({ nombre, nacimiento, email, telefono, sexo });
        await paciente.save();
        res.json({
            paciente
        });
    } catch (error) {
        res.status(500).json({
            error
        });
    }
}

export const updatePaciente = async(req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const body = req.body;
        const { affected } = await Paciente.update(id, {...body});
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

export const deletePaciente = async(req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { affected } = await Paciente.delete(id);
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
};