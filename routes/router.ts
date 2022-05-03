import { Router } from "express";
import { getCitas, getCitaByID, updateCita, deleteCita, addCita } from '../controllers/citasController';
import { getPacientes, getPacienteByID, deletePaciente, addPaciente, updatePaciente } from '../controllers/pacientesController';

export const pacientesRouter = Router();
pacientesRouter.get('/', getPacientes);
pacientesRouter.get('/:id', getPacienteByID);
pacientesRouter.post('/', addPaciente);
pacientesRouter.put('/:id', updatePaciente);
pacientesRouter.delete('/:id', deletePaciente);

export const citasRouter = Router();
citasRouter.get('/', getCitas);
citasRouter.get('/:id', getCitaByID);
citasRouter.post('/', addCita);
citasRouter.put('/:id', updateCita);
citasRouter.delete('/:id', deleteCita);