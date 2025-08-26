import express from "express";
import {deleteById, findTareaById, prueba, saveTarea, updateStatus, updateTarea} from "../controllers/TareaController";
import {
    CreateTareaRequest,
    ShowTareaRequest,
    UpdateStatusRequest,
    UpdateTareaRequest
} from "../validators/TareasValidators";
import {ShowProyectoById} from "../validators/ProyectosValidators";

const router = express.Router();

router.get("/prueba", prueba);
router.get("/:id", ShowTareaRequest, findTareaById);
router.post("/:id/create", ShowProyectoById, CreateTareaRequest, saveTarea);
router.put("/:id/update", ShowTareaRequest, UpdateTareaRequest, updateTarea);
router.put("/:id/update-status", ShowTareaRequest, UpdateStatusRequest, updateStatus);
router.delete("/:id/delete", ShowTareaRequest, deleteById);
export default router;