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

const router = express.Router();

router.get("/prueba", prueba);
router.get("/:id", middlewareJWT, ShowTareaRequest, findTareaById);
router.get("/:idProyecto/search", middlewareJWT, FindProyectoToTareaRequest, findAllTareasByIdProyecto);
router.post("/:id/create", middlewareJWT, ShowProyectoById, CreateTareaRequest, saveTarea);
router.put("/:id/update", ShowTareaRequest, middlewareJWT, UpdateTareaRequest, updateTarea);
router.put("/:id/update-status", ShowTareaRequest, middlewareJWT, UpdateStatusRequest, updateStatus);
router.delete("/:id/delete", ShowTareaRequest, middlewareJWT, deleteById);
export default router;