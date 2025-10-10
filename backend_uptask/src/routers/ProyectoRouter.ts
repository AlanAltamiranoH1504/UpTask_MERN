import express from "express";
import {CreateProyectoRequest, ShowProyectoById, UpdateProyectoRequest} from "../validators/ProyectosValidators";
import {
    deleteProyecto,
    findAllProyectos, findAllTareasByProyectoId,
    findProyectoById,
    saveProyecto,
    updateProyecto
} from "../controllers/ProyectoController";
import {middlewareJWT} from "../middlewares/middlewareJWT";

const router = express.Router();

router.get("", middlewareJWT, findAllProyectos);
router.get("/:id", middlewareJWT, ShowProyectoById, findProyectoById);
router.get("/:id/tareas", middlewareJWT, ShowProyectoById, findAllTareasByProyectoId);
router.post("", middlewareJWT, CreateProyectoRequest, saveProyecto);
router.put("/:id", middlewareJWT, ShowProyectoById, UpdateProyectoRequest, updateProyecto);
router.delete("/:id", middlewareJWT, ShowProyectoById, deleteProyecto);
export default router;