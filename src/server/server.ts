import cors from 'cors';
import "reflect-metadata";
import dotenv from 'dotenv';
import { DataSource } from "typeorm";
import express, { Application } from 'express';
import { pacientesRouter, citasRouter, authRouter, pagosRouter, historialClinicoRouter, laboratorialRouter, antropometriaRouter } from '../routes/router';
import { entities } from '../models/entities';

dotenv.config();

export class Server {
    private application: Application;
    private port: string;
    private apiPaths = {
        auth: '/api/auth',
        pacientes: '/api/pacientes',
        citas: '/api/citas',
        pagos: '/api/pagos',
        historialClinico: '/api/historial-clinico',
        laboratorial: '/api/laboratorial',
        antropometria: '/api/antropometria'
    }

    constructor() {
        this.application = express();
        this.port = process.env.PORT || '3001';
        this.dbInit();
        this.middlewares();
        this.routes();
    }

    middlewares(): void {
        // Body
        this.application.use(express.json());
        // CORS
        this.application.use(cors());
    }

    async dbInit(): Promise<void> {
        try {
            const db = new DataSource({
                type: "postgres",
                host: "localhost",
                port: 5432,
                username: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                database: "lavoisierdb",
                entities,
                synchronize: true,
                logging: false,
            });
            await db.initialize();
            console.log("DB online");
        } catch (error) {
            console.log(error);
        }
    }

    routes(): void {
        this.application.use(this.apiPaths.auth, authRouter);
        this.application.use(this.apiPaths.pacientes, pacientesRouter);
        this.application.use(this.apiPaths.citas, citasRouter);
        this.application.use(this.apiPaths.pagos, pagosRouter);
        this.application.use(this.apiPaths.historialClinico, historialClinicoRouter);
        this.application.use(this.apiPaths.laboratorial, laboratorialRouter);
        this.application.use(this.apiPaths.antropometria, antropometriaRouter);
    }

    listen(): void {
        this.application.listen(this.port, () => {
            console.log(`Servidor en el puerto ${this.port}`)
        });
    }
}