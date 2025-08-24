import express from "express";
import {CreateProyectoRequest} from "../validators/ProyectosValidators";
import {saveProyecto} from "../controllers/ProyectoController";
const router = express.Router();

router.get("/prueba", (req, res) => {
    return res.status(200).json({
        status: true,
        message: "Funcionando router de proyectos"
    });
});

router.post("", CreateProyectoRequest, saveProyecto);

export default router;