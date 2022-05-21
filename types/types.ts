import { Request } from "express";
import { Usuario } from '../models/user';

export enum SexTypes {
    MASCULINO = "M",
    FEMENINO = "F",
    OTRO = "O"
};

export enum RolTypes {
    RECEPCIONISTA = "R",
    NUTRIOLOGO = "N"
};

export enum MetodosPago {
    TARJETA = "T",
    EFECTIVO = "E"
}

export enum TipoPago {
    PRIMERO = 1,
    POSTERIOR = 2
}

export enum EnfermedadesResponse {
    SI = "Si",
    NO = "No"
}

export interface IRequest extends Request {
    usuario?: Usuario;
};

export interface jwtPayload {
    usuario: Usuario;
    iat: number;
    exp: number;
};