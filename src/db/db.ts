import { DataSource, DataSourceOptions } from "typeorm";
import { entities } from '../models/entities';
import dotenv from 'dotenv';
dotenv.config();

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const devOptions: DataSourceOptions = {
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: "lavoisierdb",
    entities,
    synchronize: true,
    logging: false,
}

const prodOptions: DataSourceOptions = {
    type: "postgres",
    url: process.env.DB_PROD_URL,
    entities,
    synchronize: true,
    logging: false,
    ssl: true,
    extra: {
        ssl: {
            rejectUnauthorized: false,
        }
    }
}

export const db = process.env.NODE_ENV === 'development' ? new DataSource(devOptions) : new DataSource(prodOptions);