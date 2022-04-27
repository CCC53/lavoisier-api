import { Router } from "express";
import { getPacientes, getPacienteByID, deletePaciente, addPaciente, updatePaciente } from '../controllers/pacientesController';

export const pacientesRouter = Router();

pacientesRouter.get('/', getPacientes);
pacientesRouter.get('/:id', getPacienteByID);
pacientesRouter.post('/', addPaciente);
pacientesRouter.put('/:id', updatePaciente);
pacientesRouter.delete('/:id', deletePaciente);