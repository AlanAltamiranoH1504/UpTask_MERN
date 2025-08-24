import express from "express";
import {CreateProyectoRequest, ShowProyectoById, UpdateProyectoRequest} from "../validators/ProyectosValidators";
import {
    deleteProyecto,
    findAllProyectos,
    findProyectoById,
    saveProyecto,
    updateProyecto
} from "../controllers/ProyectoController";

const router = express.Router();

router.get("/prueba", (req, res) => {
    return res.status(200).json({
        status: true,
        message: "Funcionando router de proyectos"
    });
});

router.get("", findAllProyectos);
router.get("/:id", ShowProyectoById, findProyectoById);
router.post("", CreateProyectoRequest, saveProyecto);
router.put("/:id", ShowProyectoById, UpdateProyectoRequest, updateProyecto);
router.delete("/:id", ShowProyectoById, deleteProyecto);
export default router;