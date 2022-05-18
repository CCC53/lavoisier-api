import cors from 'cors';
import { DataSource } from "typeorm";
import express, { Application } from 'express';
import "reflect-metadata";
import dotenv from 'dotenv';
import { pacientesRouter, citasRouter, authRouter } from '../routes/router';

dotenv.config();

export class Server {
    private application: Application;
    private port: string;
    private apiPaths = {
        auth: '/api/auth',
        pacientes: '/api/pacientes',
        citas: '/api/citas'
    }

    constructor() {
        this.application = express();
        this.port = process.env.PORT || '3001';
        this.db();
        this.middlewares();
        this.routes();
    }

    middlewares(): void {
        // Body
        this.application.use(express.json());
        // CORS
        this.application.use(cors());
    }

    async db(): Promise<void> {
        try {
            const db = new DataSource({
                type: "postgres",
                host: "localhost",
                port: 5432,
                username: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                database: "lavoisierdb",
                entities: ["models/*.ts"],
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
    }

    listen(): void {
        this.application.listen(this.port, () => {
            console.log(`Servidor en el puerto ${this.port}`)
        });
    }
}