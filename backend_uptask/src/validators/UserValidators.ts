import {body, param, validationResult} from "express-validator";
import User from "../models/User";

const CreateUserRequest = [
    body("nombre")
        .notEmpty().withMessage("El nombre del usuario es obligatorio")
        .isString().withMessage("El nombre del usuario debe ser una cadena de texto")
        .isLength({min: 3, max: 50}).withMessage("El nombre debe tener una longitud de entre 3 y 50 caracteres"),
    body("apellidos")
        .notEmpty().withMessage("Los apellidos son obligatorios")
        .isString().withMessage("Los apellidos deben ser una cadena de texto")
        .isLength({min: 3, max: 100}).withMessage("La longitud de los apellidos debe ser de entre 3 y 100 caracteres"),
    body("email")
        .notEmpty().withMessage("El email del usuario es obligatorio")
        .isString().withMessage("El email debe ser una cadena de texto")
        .isEmail().withMessage("Formato de email no valido"),
    body("password")
        .notEmpty().withMessage("El password es obligatorio")
        .isString().withMessage("El password debe ser una cadena de caracteres")
        .isLength({min: 6}).withMessage("El password debe tener al menos 6 caracteres"),

    async (req, res, next) => {
        const errores = validationResult(req);
        if (!errores.isEmpty()) {
            return res.status(409).json({
                errores
            });
        }

        const email_in_use = await User.findOne({
            email: req.body.email
        });
        if (email_in_use) {
            return res.status(422).json({
                status: false,
                message: "El email ya se encuentra en uso"
            });
        }
        next();
    }
];

const ConfirmUserRequest = [
    body("token")
        .notEmpty().withMessage("El token de confirmacion es obligatorio")
        .isString().withMessage("El token de confirmacion debe ser una cadena de texto"),
    param("token")
        .notEmpty().withMessage("El token de confirmacion es obligatorio")
        .isString().withMessage("El token de confirmacion debe ser una cadena de texto"),

    async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(409).json({
                errors
            });
        }

        //Validacion de token de request y de param
        if (req.body.token !== req.params.token) {
            return res.status(409).json({
                status: false,
                message: "Token de confirmacion corrupto"
            });
        }

        //Busqueda de usuario con ese token
        const token_register = await User.findOne({
            token: req.body.token
        });
        if (!token_register) {
            return res.status(404).json({
                status: false,
                message: "No existe un usuario pendiente de confirmacion con ese token"
            });
        }
        next();
    }
];

export {
    CreateUserRequest,
    ConfirmUserRequest
}