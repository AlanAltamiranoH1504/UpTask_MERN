import {Request, Response, NextFunction} from "express";
import {body, param, validationResult} from "express-validator";
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

    async (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(409).json(errors.array());
        }

        const title_note_in_use = await Nota.findOne({
            titulo: req.body.titulo,
            tarea: req.params.id
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

const FindNoteRequest = [
    param("id")
        .notEmpty().withMessage("El id de la nota a buscar es obligatorio")
        .isString().withMessage("El id de la nota a buscar no es valido"),

    async (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(409).json(errors.array());
        }
        const note_to_found = await Nota.findById(req.params.id);
        if (!note_to_found) {
            return res.status(404).json({
                status: false,
                message: `La nota con el id: ${req.params.id}, no se encuentra registrada en la base de datos`,
            });
        }
        next();
    }
];

const UpdateNoteRequest = [
    body("titulo")
        .notEmpty().withMessage("El titulo de la nota es obligatorio")
        .isString().withMessage("El titulo de la nota debe ser una cadena de texto")
        .isLength({min: 1, max: 40}).withMessage("El titulo de la nota no debe ser de mas de 40 caracteres"),
    body("contenido")
        .notEmpty().withMessage("El contenido de la nota es obligatorio")
        .isString().withMessage("El contenido de la nota debe ser una cadena de caracteres")
        .isLength({min: 1, max: 150}).withMessage("La nota debe tener un maximo de 150 caracteres"),

    async (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(409).json(errors.array());
        }

        const title_note_in_use = await Nota.findOne({
            titulo: req.body.titulo
        });
        // @ts-ignore
        if (title_note_in_use && title_note_in_use._id.toString() !== req.params.id.toString()) {
            return res.status(409).json({
                status: false,
                message: "Una nota con el mismo titulo ya esta creada dentro de la tarea"
            });
        }
        next();
    }
]

export {
    CreateNoteRequest,
    FindNoteRequest,
    UpdateNoteRequest
}