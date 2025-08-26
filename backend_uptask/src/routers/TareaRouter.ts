import express from "express";
import {prueba, saveTarea} from "../controllers/TareaController";
import {CreateTareaRequest} from "../validators/TareasValidators";
import {ShowProyectoById} from "../validators/ProyectosValidators";

const router = express.Router();

router.get("/prueba", prueba);
router.post("/:id/create", ShowProyectoById, CreateTareaRequest, saveTarea);
export default router;