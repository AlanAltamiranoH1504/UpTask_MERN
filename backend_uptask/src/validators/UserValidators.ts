import {body, validationResult} from "express-validator";
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
        console.log(email_in_use);
        if (email_in_use) {
            return res.status(422).json({
                status: false,
                message: "El email ya se encuentra en uso"
            });
        }
        next();
    }
];

export {
    CreateUserRequest
}