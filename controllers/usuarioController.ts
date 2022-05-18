import { Request, Response } from "express";
import dotenv from 'dotenv';
import { hashSync, compareSync } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { Usuario } from '../models/user';

dotenv.config();

const seed = process.env.SEED || "uwu";

export const registerUsuario = async(req: Request, res: Response) => {
    try {
        const { nombre, telefono, email, nacimiento, password, rol } = req.body;
        const usuario = await Usuario.create({
            nombre,
            telefono,
            email,
            nacimiento,
            password: hashSync(password, 10),
            rol
        });
        await usuario.save();
        res.json({
            usuario: {
                id: usuario.id,
                nombre,
                telefono,
                email,
                nacimiento,
                rol
            }
        })
    } catch (error) {
        res.status(500).json({
            error
        })
    }
};

export const loginUsuario = async(req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const usuario = await Usuario.findOne({ where: { email } });
        if(!usuario) {
            return res.status(404).json({
                error: 'Usuario o contraseña incorrectos'
            })
        }
        if(!compareSync(password, usuario.password)) {
            return res.status(404).json({
                error: 'Usuario o contraseña incorrectos'
            })
        }
        const token = sign({
            usuario: {
                id: usuario.id,
                nombre: usuario.nombre,
                telefono: usuario.telefono,
                email: usuario.email,
                nacimiento: usuario.nacimiento,
                rol: usuario.rol
            }
        }, seed, {expiresIn: '48h'});
        res.json({
            usuario: {
                id: usuario.id,
                nombre: usuario.nombre,
                telefono: usuario.telefono,
                email: usuario.email,
                nacimiento: usuario.nacimiento,
                rol: usuario.rol
            },
            token
        })
    } catch (error) {
        res.status(500).json({
            error
        });
    }
}