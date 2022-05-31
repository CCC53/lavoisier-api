import { Router } from "express";
import { getCitas, getCitaByID, updateCita, deleteCita, addCita } from '../controllers/citasController';
import { getPacientes, getPacienteByID, deletePaciente, addPaciente, updatePaciente } from '../controllers/pacientesController';
import { registerPersonal, loginPersonal } from '../controllers/personalController';
import { verifyToken, verifyRecepcionistaRol, verifyNutriologoRol } from '../middlewares/authMiddleware';
import { addPago, getPagos, getPagoByID, getPagoByCitaID } from '../controllers/pagosController';
import { addHistorialClinico, getHistorialClinicoByID } from '../controllers/historialController';

export const authRouter = Router();
authRouter.post('/register', registerPersonal);
authRouter.post('/login', loginPersonal);

export const pacientesRouter = Router();
pacientesRouter.get('/', [verifyToken], getPacientes);
pacientesRouter.get('/:id', [verifyToken], getPacienteByID);
pacientesRouter.post('/', [verifyToken], addPaciente);
pacientesRouter.put('/:id', [verifyToken], updatePaciente);
pacientesRouter.delete('/:id', [verifyToken], deletePaciente);

export const citasRouter = Router();
citasRouter.get('/', [verifyToken], getCitas);
citasRouter.get('/:id', [verifyToken], getCitaByID);
citasRouter.post('/', [verifyToken], addCita);
citasRouter.put('/:id', [verifyToken], updateCita);
citasRouter.delete('/:id', [verifyToken], deleteCita);

export const pagosRouter = Router();
pagosRouter.post('/', [verifyToken, verifyRecepcionistaRol], addPago);
pagosRouter.get('/', [verifyToken, verifyRecepcionistaRol], getPagos);
pagosRouter.get('/:id', [verifyToken, verifyRecepcionistaRol], getPagoByID);
pagosRouter.get('/cita/:citaId', [verifyToken, verifyRecepcionistaRol], getPagoByCitaID);

export const historialClinicoRouter = Router();
historialClinicoRouter.get('/:id', [verifyToken, verifyNutriologoRol], getHistorialClinicoByID);
historialClinicoRouter.post('/', [verifyToken, verifyNutriologoRol], addHistorialClinico);