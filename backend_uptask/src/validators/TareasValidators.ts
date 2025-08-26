import {body, validationResult} from "express-validator";

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
export {
    CreateTareaRequest
}