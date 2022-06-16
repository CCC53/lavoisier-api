import { Request, Response } from "express";
import dotenv from 'dotenv';
import { hashSync, compareSync } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { Personal } from '../models/personal';

dotenv.config();

const seed = process.env.SEED || "seed-de-desarrollo";

export const registerPersonal = async(req: Request, res: Response) => {
    try {
        const { nombre, telefono, email, password, rol } = req.body;
        const personal = await Personal.create({
            nombre,
            telefono,
            email,
            password: hashSync(password, 10),
            rol
        });
        await personal.save();
        await loginPersonal(req, res);
    } catch (error) {
        res.status(500).json({
            error
        })
    }
};

export const loginPersonal = async(req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const personal = await Personal.findOne({ where: { email } });
        if(!personal) {
            return res.status(404).json({
                error: 'Usuario o contraseña incorrectos'
            })
        }
        if(!compareSync(password, personal.password)) {
            return res.status(404).json({
                error: 'Usuario o contraseña incorrectos'
            })
        }
        const token = sign({
            personal: {
                id: personal.id,
                nombre: personal.nombre,
                telefono: personal.telefono,
                email: personal.email,
                rol: personal.rol
            }
        }, seed, {expiresIn: '1h'});
        res.json({
            token
        })
    } catch (error) {
        res.status(500).json({
            error
        });
    }
}