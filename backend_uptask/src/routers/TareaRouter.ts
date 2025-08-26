import express from "express";
import {deleteById, findTareaById, prueba, saveTarea, updateTarea} from "../controllers/TareaController";
import {CreateTareaRequest, ShowTareaRequest, UpdateTareaRequest} from "../validators/TareasValidators";
import {ShowProyectoById} from "../validators/ProyectosValidators";

const router = express.Router();

router.get("/prueba", prueba);
router.get("/:id", ShowTareaRequest, findTareaById);
router.post("/:id/create", ShowProyectoById, CreateTareaRequest, saveTarea);
router.put("/:id/update", ShowTareaRequest, UpdateTareaRequest, updateTarea);
router.delete("/:id/delete", ShowTareaRequest, deleteById);
export default router;