import express from "express";
import {CreateProyectoRequest, ShowProyectoById, UpdateProyectoRequest} from "../validators/ProyectosValidators";
import {
    deleteProyecto,
    findAllProyectos, findAllTareasByProyectoId,
    findProyectoById,
    saveProyecto,
    updateProyecto
} from "../controllers/ProyectoController";

const router = express.Router();

router.get("", findAllProyectos);
router.get("/:id", ShowProyectoById, findProyectoById);
router.get("/:id/tareas", ShowProyectoById, findAllTareasByProyectoId);
router.post("", CreateProyectoRequest, saveProyecto);
router.put("/:id", ShowProyectoById, UpdateProyectoRequest, updateProyecto);
router.delete("/:id", ShowProyectoById, deleteProyecto);
export default router;