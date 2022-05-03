import cors from 'cors';
import "reflect-metadata";
import bodyParser from 'body-parser';
import { db } from '../db/connection';
import express, { Application } from 'express';
import { pacientesRouter, citasRouter } from '../routes/router';

export class Server {
    private application: Application;
    private port: string;
    private apiPaths = {
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
        this.application.use(bodyParser.urlencoded({extended: true}));
        this.application.use(bodyParser.json());
        // CORS
        this.application.use(cors());
    }

    async db(): Promise<void> {
        try {
            await db.initialize();
            console.log("DB online");
        } catch (error) {
            console.log(error);
        }
    }

    routes(): void {
        this.application.use(this.apiPaths.pacientes, pacientesRouter);
        this.application.use(this.apiPaths.citas, citasRouter);
    }

    listen(): void {
        this.application.listen(this.port, () => {
            console.log(`Servidor en el puerto ${this.port}`)
        });
    }
}