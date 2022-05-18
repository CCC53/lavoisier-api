import { Router } from "express";
import { getCitas, getCitaByID, updateCita, deleteCita, addCita } from '../controllers/citasController';
import { getPacientes, getPacienteByID, deletePaciente, addPaciente, updatePaciente } from '../controllers/pacientesController';
import { registerUsuario, loginUsuario } from '../controllers/usuarioController';
import { verifyToken } from "../middlewares/authMiddleware";

export const pacientesRouter = Router();
pacientesRouter.get('/', verifyToken, getPacientes);
pacientesRouter.get('/:id', verifyToken, getPacienteByID);
pacientesRouter.post('/', verifyToken, addPaciente);
pacientesRouter.put('/:id', verifyToken, updatePaciente);
pacientesRouter.delete('/:id', verifyToken, deletePaciente);

export const citasRouter = Router();
citasRouter.get('/', verifyToken, getCitas);
citasRouter.get('/:id', verifyToken, getCitaByID);
citasRouter.post('/', verifyToken, addCita);
citasRouter.put('/:id', verifyToken, updateCita);
citasRouter.delete('/:id', verifyToken, deleteCita);

export const authRouter = Router();
authRouter.post('/register', registerUsuario);
authRouter.post('/login', loginUsuario);