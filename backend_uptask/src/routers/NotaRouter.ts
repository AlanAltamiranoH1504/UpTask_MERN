import express from "express";
import {NotaController} from "../controllers/NotaController";
import {CreateNoteRequest, FindNoteRequest, UpdateNoteRequest} from "../validators/NotaValidators";
import {middlewareJWT} from "../middlewares/middlewareJWT";
import {DeletNote_Middleware} from "../middlewares/delete_note_middleware";
import {UpdateNote_Middleware} from "../middlewares/update_note_middleware";

const router = express.Router();
const notaController = new NotaController();

router.get("/prueba", notaController.pruebaNotaController);
router.post("/create_note", middlewareJWT, CreateNoteRequest, notaController.create_note);
router.get("/find_note/:id", middlewareJWT, FindNoteRequest, notaController.find_note);
router.put("/update_note/:id", middlewareJWT, FindNoteRequest, UpdateNote_Middleware, UpdateNoteRequest, notaController.update_note);
router.delete("/delete_note/:id", middlewareJWT, FindNoteRequest, DeletNote_Middleware, notaController.delete_note);

export default router;