import {body, param, validationResult} from "express-validator";
import Tarea from "../models/Tarea";
import Proyecto from "../models/Proyecto";

const CreateTareaRequest = [
    body("nombre")
        .notEmpty().withMessage("El nombre el obligatorio")
        .isString().withMessage("El nombre debe ser una cadena de texto")
        .isLength({min: 1, max: 255}).withMessage("El nombre debe tener una longitud de entre 1 y 255 caracteres"),
    body("descripcion")
        .notEmpty().withMessage("La descripción es obligatoria")
        .isString().withMessage("La descripción debe ser una cadena de texto")
        .isLength({min: 1, max: 255}).withMessage("La descripción debe tener una longitud de entre 1 y 255 caracteres"),
    body("status")
        .notEmpty().withMessage("El status el obligatorio")
        .isString().withMessage("El status debe ser una cadena de texto")
        .isLength({min: 1, max: 255}).withMessage("El status debe tener una longitud de entre 1 y 255 caracteres"),

    (req, res, next) => {
        const errores = validationResult(req);
        if (!errores.isEmpty()) {
            return res.status(422).json({
                errores: errores.array()
            });
        }
        next();
    }
];

const ShowTareaRequest = [
    param("id")
        .notEmpty().withMessage("El id de la tarea es obligatorio")
        .isString().withMessage("El id de la tarea debe ser una cadena de texto"),

    async (req, res, next) => {
        const errores = validationResult(req);
        if (!errores.isEmpty()) {
            return res.status(422).json({
                errores: errores.array()
            });
        }
        const existenciaTarea = await Tarea.findById(req.params.id);
        if (!existenciaTarea) {
            return res.status(404).json({
                status: false,
                message: `Tarea con id ${req.params.id} no encontrada`
            });
        }
        next();
    }
];

const FindProyectoToTareaRequest = [
    param("idProyecto")
        .notEmpty().withMessage("El id del proyecto es obligatorio")
        .isString().withMessage("El id del proyecto debe ser una cadena de texto"),

    async (req, res, next) => {
        const errores = validationResult(req);
        if (!errores.isEmpty()) {
            return res.status(422).json({
                errores: errores.array()
            });
        }
        const proyectoToFound = await Proyecto.findById(req.params.idProyecto);
        if (!proyectoToFound) {
            return res.status(404).json({
                status: false,
                message: `El proyecto con id ${req.params.idProyecto} no fue encontrado`
            });
        }
        next();
    }
];

const UpdateTareaRequest = [
    param("id")
        .notEmpty().withMessage("El id de la tarea es obligatorio")
        .isString().withMessage("El id de la tarea debe ser una cadena de texto"),
    body("nombre")
        .notEmpty().withMessage("El nombre es obligatorio")
        .isString().withMessage("El nombre debe ser una cadena de texto"),
    body("descripcion")
        .notEmpty().withMessage("La descripcion es obligatoria")
        .isString().withMessage("La descripcion debe ser una cadena de texto"),
    body("status")
        .notEmpty().withMessage("El status el obligatorio")
        .isString().withMessage("El status debe ser una cadena de texto"),

    (req, res, next) => {
        const errores = validationResult(req);
        if (!errores.isEmpty()) {
            return res.status(422).json({
                errores: errores.array()
            });
        }
        next();
    }
];

const UpdateStatusRequest = [
    body("status")
        .notEmpty().withMessage("El status el obligatorio")
        .isString().withMessage("El status debe ser una cadena de texto"),
    (req, res, next) => {
        const errores = validationResult(req);
        if (!errores.isEmpty()) {
            return res.status(422).json({
                errores: errores.array()
            });
        }
        next();
    }
];

export {
    CreateTareaRequest,
    ShowTareaRequest,
    UpdateTareaRequest,
    UpdateStatusRequest,
    FindProyectoToTareaRequest
}