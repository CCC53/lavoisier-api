import { Router } from "express";
import { getCitas, getCitaByID, updateCita, deleteCita, addCita } from '../controllers/citasController';


export const citasRouter = Router();

citasRouter.get('/', getCitas);
citasRouter.get('/:id', getCitaByID);
citasRouter.post('/', addCita);
citasRouter.put('/:id', updateCita);
citasRouter.delete('/:id', deleteCita);