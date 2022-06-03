import dotenv from 'dotenv';
import { verify } from 'jsonwebtoken';
import { NextFunction, Response } from 'express';
import { IRequest, jwtPayload, RolTypes } from '../types/types';

dotenv.config();
const seed = process.env.SEED || "seed-de-desarrollo";

export const verifyToken = (req: IRequest, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(403).json({
                error: 'No esta autenticado'
            })
        }
        const decoded = verify(token, seed) as jwtPayload;
        req.personal = decoded.personal;
        next();
    } catch (error) {
        res.status(500).json({
            error
        });
    }
};

export const verifyNutriologoRol = (req: IRequest, res: Response, next: NextFunction) => {
    const personal = req.personal;
    if (personal?.rol === RolTypes.NUTRIOLOGO) {
        next();
    } else {
        res.status(401).json({
            error: 'El usuario no es un nutriologo'
        });
    }
}

export const verifyRecepcionistaRol = (req: IRequest, res: Response, next: NextFunction) => {
    const personal = req.personal;
    if (personal?.rol === RolTypes.RECEPCIONISTA) {
        next();
    } else {
        res.status(401).json({
            error: 'El usuario no es un recepcionista'
        });
    }
}