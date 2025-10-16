import {Request, Response, NextFunction} from "express";
import {body, param, validationResult} from "express-validator";
import {Empresa} from "../models/Empresa";

const CreateEmpresaRequest = [
    body("nombre")
        .notEmpty().withMessage("El nombre de la empresa es obligatorio")
        .isString().withMessage("El nombre de la empresa debe ser una cadena de texto")
        .isLength({min: 1, max: 100}).withMessage("El nombre de la empresa maximo debe tener 100 caracteres"),
    body("email")
        .notEmpty().withMessage("El email es obligatorio")
        .isEmail().withMessage("El formato del email no es valido"),

    async (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json(errors.array());
        }

        const data_in_use = await Empresa.find({
            $or: [
                {email: req.body.email},
                {nombre: req.body.nombre}
            ]
        });

        if (data_in_use.length > 0) {
            return res.status(409).json({
                status: false,
                message: "Los datos de creación ya se encuentran en uso"
            });
        }

        next();
    }
];

const FindEmpresaRequest = [
    param("id")
        .notEmpty().withMessage("El parametro de busqueda es obligatorio")
        .isString().withMessage("Parametro de busqueda no valido"),
    async (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json(errors.array());
        }
        const empresa_to_show = await Empresa.findById(req.params.id);
        if (!empresa_to_show) {
            return res.status(404).json({
                status: false,
                message: "Empresa no registrada."
            });
        }
        next();
    }
]

export {
    CreateEmpresaRequest,
    FindEmpresaRequest
}