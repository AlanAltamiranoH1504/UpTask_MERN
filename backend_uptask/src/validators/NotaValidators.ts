import {Request, Response, NextFunction} from "express";
import {body, validationResult} from "express-validator";
import {Nota} from "../models/Nota";

const CreateNoteRequest = [
    body("titulo")
        .notEmpty().withMessage("El titulo de la nota es obligatorio")
        .isString().withMessage("El titulo de la nota debe ser una cadena de texto")
        .isLength({min: 1, max: 40}).withMessage("El titulo de la nota no debe ser de mas de 40 caracteres"),
    body("contenido")
        .notEmpty().withMessage("El contenido de la nota es obligatorio")
        .isString().withMessage("El contenido de la nota debe ser una cadena de caracteres")
        .isLength({min: 1, max: 150}).withMessage("La nota debe tener un maximo de 150 caracteres"),
    // body("createdBy")
    //     .notEmpty().withMessage("El creador de la nota es obligatorio")
    //     .isString().withMessage("Creador de la nota no valido"),
    body("tarea")
        .notEmpty().withMessage("La tarea a la que esta vinculada la nota es obligatoria")
        .isString().withMessage("Tarea de vinculación de nota no valida"),

    async (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(409).json(errors.array());
        }

        const title_note_in_use = await Nota.findOne({
            titulo: req.body.titulo,
            tarea: req.body.tarea
        });
        if (title_note_in_use) {
            return res.status(409).json({
                status: false,
                message: "Una nota con el mismo titulo ya esta creada dentro de la tarea"
            });
        }
        next();
    }
];

export {
    CreateNoteRequest
}