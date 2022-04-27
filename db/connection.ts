import dotenv from 'dotenv';
import { DataSource } from "typeorm";
import { Cita } from '../models/citas';
import { Paciente } from '../models/pacientes';

dotenv.config();

export const db = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: "lavoisierdb",
    entities: [Paciente, Cita],
    synchronize: true,
    logging: false,
});