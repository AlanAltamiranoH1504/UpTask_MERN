import express from "express";
import {NotaController} from "../controllers/NotaController";
import {CreateNoteRequest} from "../validators/NotaValidators";
import {middlewareJWT} from "../middlewares/middlewareJWT";

const router = express.Router();
const notaController = new NotaController();

router.get("/prueba", notaController.pruebaNotaController);
router.post("/create_note", middlewareJWT, CreateNoteRequest, notaController.create_note);

export default router;