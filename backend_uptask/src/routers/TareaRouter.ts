import express from "express";
import {
    deleteById,
    findAllTareasByIdProyecto,
    findTareaById,
    prueba,
    saveTarea,
    updateStatus,
    updateTarea
} from "../controllers/TareaController";
import {
    CreateTareaRequest, FindProyectoToTareaRequest,
    ShowTareaRequest,
    UpdateStatusRequest,
    UpdateTareaRequest
} from "../validators/TareasValidators";
import {ShowProyectoById} from "../validators/ProyectosValidators";
import {middlewareJWT} from "../middlewares/middlewareJWT";
import {manager_task_middleware} from "../middlewares/manager_task_middleware";

const router = express.Router();

router.get("/prueba", prueba);
router.get("/:id", middlewareJWT, ShowTareaRequest, findTareaById);
router.get("/:idProyecto/search", middlewareJWT, FindProyectoToTareaRequest, findAllTareasByIdProyecto);
router.post("/:id/create", middlewareJWT, ShowProyectoById, CreateTareaRequest, saveTarea);
router.put("/:id/update", middlewareJWT, manager_task_middleware, ShowTareaRequest, UpdateTareaRequest, updateTarea);
router.put("/:id/update-status", middlewareJWT, ShowTareaRequest, UpdateStatusRequest, updateStatus);
router.delete("/:id/delete", middlewareJWT, manager_task_middleware, ShowTareaRequest, deleteById);
export default router;