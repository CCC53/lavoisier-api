import { Request } from "express";
import { Personal } from '../models/personal';

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
    personal?: Personal;
};

export interface jwtPayload {
    personal: Personal;
    iat: number;
    exp: number;
};