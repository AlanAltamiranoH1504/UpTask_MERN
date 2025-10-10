import {body, param, validationResult} from "express-validator";
import Proyecto from "../models/Proyecto";

const CreateProyectoRequest = [
    body("nombreProyecto")
        .notEmpty().withMessage("El nombre del proyecto es obligatorio.")
        .isString().withMessage("El nombre del proyecto debe ser una cadena de texto")
        .isLength({min: 3, max: 30}).withMessage("El nombre debe tener una longitud de entre 3 y 30 caraccteres"),
    body("nombreCliente")
        .notEmpty().withMessage("El nombre del cliente es obligatorio.")
        .isString().withMessage("El nombre del cliente debe ser una cadena de texto")
        .isLength({
            min: 3,
            max: 50
        }).withMessage("El nombre del cliente debe tener una longitud de entre 3 y 50 caraccteres"),
    body("descripcion")
        .notEmpty().withMessage("La descripción del proyecto es obligatoria")
        .isString().withMessage("La descripción del prouecto debe ser una cadena de texto")
        .isLength({
            min: 3,
            max: 200
        }).withMessage("La descripción del proyecto debe tener una longitud de entre 3 y 200 caraccteres"),

    async (req, res, next) => {
        const errores = validationResult(req);
        if (!errores.isEmpty()) {
            return res.status(422).json({
                errores: errores.array()
            });
        }

        //Validacion de que el nombre del proyecto es unico
        const nombreInUse = await Proyecto.findOne({
            nombreProyecto: req.body.nombreProyecto
        });
        if (nombreInUse) {
            return res.status(409).json({
                status: false,
                message: "El nombre del proyecto ya se encuentra en uso"
            });
        }
        next();
    }
];

const ShowProyectoById = [
    param("id")
        .notEmpty().withMessage("El id del proyecto es obligatorio.")
        .isString().withMessage("El id del proyecto debe ser una cadena de texto"),

    async (req, res, next) => {
        const errores = validationResult(req);
        if (!errores.isEmpty()) {
            return res.status(422).json({
                errores: errores.array()
            });
        }
        const existenciaProyecto = await Proyecto.findOne({
            status: true,
            _id: req.params.id
        });
        if (!existenciaProyecto) {
            return res.status(404).json({
                status: false,
                message: `El proyecto con el id ${req.params.id} no existe o se encuentra deshabilitado`
            });
        }

        if (existenciaProyecto.usuario.toString() !== req.user._id.toString()) {
            return res.status(401).json({
                status: false,
                message: "Permisos denegados"
            });
        }

        next();
    }
];

const UpdateProyectoRequest = [
    body("nombreProyecto")
        .notEmpty().withMessage("El nombre del proyecto es obligatorio.")
        .isString().withMessage("El nombre del proyecto debe ser una cadena de texto")
        .isLength({min: 3, max: 30}).withMessage("El nombre debe tener una longitud de entre 3 y 30 caraccteres"),
    body("nombreCliente")
        .notEmpty().withMessage("El nombre del cliente es obligatorio.")
        .isString().withMessage("El nombre del cliente debe ser una cadena de texto")
        .isLength({
            min: 3,
            max: 50
        }).withMessage("El nombre del cliente debe tener una longitud de entre 3 y 50 caraccteres"),
    body("descripcion")
        .notEmpty().withMessage("La descripción del proyecto es obligatoria")
        .isString().withMessage("La descripción del prouecto debe ser una cadena de texto")
        .isLength({
            min: 3,
            max: 200
        }).withMessage("La descripción del proyecto debe tener una longitud de entre 3 y 200 caraccteres"),
    body("status")
        .notEmpty().withMessage("El status es obligatorio.")
        .isBoolean().withMessage("El status debe ser un valor booleano"),

    async (req, res, next) => {
        const errores = validationResult(req);
        if (!errores.isEmpty()) {
            return res.status(422).json({
                errores: errores.array()
            });
        }

        //Validacion de que el nombre del proyecto es unico
        const nombreInUse = await Proyecto.findOne({
            nombreProyecto: req.body.nombreProyecto
        });

        if (nombreInUse && !nombreInUse._id.equals(req.params.id)) {
            return res.status(409).json({
                status: false,
                message: "El nombre del proyecto ya se encuentra en uso"
            });
        }
        next();
    }
];

export {
    CreateProyectoRequest,
    ShowProyectoById,
    UpdateProyectoRequest
}