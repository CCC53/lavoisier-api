import { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import { verify } from 'jsonwebtoken';

dotenv.config();
const seed = process.env.SEED || "uwu";

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization;
        if (token) {
            const decoded = verify(token, seed);
            next();
        }
    } catch (error) {
        res.status(401).json({
            error
        });
    }
};