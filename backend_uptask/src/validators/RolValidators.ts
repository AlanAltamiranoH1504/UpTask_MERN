import {Request, Response, NextFunction} from "express";
import {body, validationResult} from "express-validator";
import {Rol} from "../models/Rol";
import {Empresa} from "../models/Empresa";
import {FindEmpresaRequest} from "./EmpresaValidators";

const CreateRolRequest = [
    body("nombre")
        .notEmpty().withMessage("El nombre del rol es obligatorio")
        .isString().withMessage("El nombre de rol debe ser una cadena de caracteres")
        .isLength({min: 1, max: 50}).withMessage("El nombre del rol debe tener una longitud maxima de 50 caracteres"),

    body("empresa_id")
        .notEmpty().withMessage("La empresa a la que pertenece el rol es obligatoria")
        .isString().withMessage("Empresa de pertenece del rol no valida"),

    async (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(409).json(errors.array());
        }

        // * Busqueda de empresa a asociar el rol
        const empresa_to_found = await Empresa.findById(req.body.empresa_id);
        if (!empresa_to_found) {
            return res.status(404).json({
                status: false,
                message: "Empresa para asociacion no existente"
            });
        }

        // * Busqueda de nombre de rol no en uso
        const name_rol_in_use = await Rol.findOne({
            nombre: req.body.nombre,
            empresa: req.body.empresa_id
        });

        if (name_rol_in_use) {
            return res.status(409).json({
                status: false,
                message: "El nombre del rol ya se encuentra en uso."
            });
        }
        next();
    }
];

const DeleteRolRequest = [
    body("id")
        .notEmpty().withMessage("El id del rol es obligatorio")
        .isString().withMessage("El id del rol no es valido"),

    async (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(409).json(errors.array());
        }

        const exists_rol = await Rol.findById(req.body.id);
        if (!exists_rol) {
            return res.status(404).json({
                status: false,
                message: "El rol no se encuentra registrado"
            });
        }
        next();
    }
];

const TypesRolesRequest = [
    body("empresa_id")
        .notEmpty().withMessage("El id de la empresa es obligatorio")
        .isString().withMessage("El id de la empresa debe ser una cadena de texto"),
    async (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(409).json(errors.array());
        }

        // * Busqueda de empresa
        const empresa_to_show = await Empresa.findById(req.body.empresa_id);
        if (!empresa_to_show) {
            return res.status(404).json({
                status: false,
                message: "Empresa no registrada en la base de datos"
            });
        }
        next();
    }
]

export {
    CreateRolRequest,
    DeleteRolRequest,
    TypesRolesRequest
}