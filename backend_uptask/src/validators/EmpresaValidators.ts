import {Request, Response, NextFunction} from "express";
import {body, param, validationResult} from "express-validator";
import {Empresa} from "../models/Empresa";
import User from "../models/User";
import mongoose from "mongoose";

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
];

const ConfirmCollaboratonRequest = [
    body("email")
        .notEmpty().withMessage("El email del colaborador a confirmar es obligatorio")
        .isEmail().withMessage("El formato del email no es valido"),
    body("_id")
        .notEmpty().withMessage("El id del colaborador a confirmar es obligatorio")
        .isString().withMessage("Formato de id de colaborador no valido"),
    body("id_empresa")
        .notEmpty().withMessage("El id de la empresa es obligatorio")
        .isString().withMessage("Formato de id de empresa no valido"),
    body("id_rol")
        .notEmpty().withMessage("El rol del colaborador es obligatorio")
        .isString().withMessage("Formato de id de rol no valido"),
    // TODO: Aqui debe venir igual el id de la empresa en los headers de authorization dentro del JWT

    async (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json(errors.array());
        }
        // * Busqueda de usuario a confirmar x empresa
        const user_to_cofirm = await User.findOne({
            email: req.body.email,
            empresa: req.body.id_empresa,
            _id: new mongoose.Types.ObjectId(req.body._id),
            confirmado_empresa: false
        });
        if (!user_to_cofirm) {
            return res.status(404).json({
                status: false,
                message: "Usuario no encontrado para confirmación de cuenta"
            });
        }
        user_to_cofirm.confirmado_empresa = true;
        user_to_cofirm.rol = new mongoose.Types.ObjectId(req.body.id_rol)
        await user_to_cofirm.save();
        next();
    }
]

export {
    CreateEmpresaRequest,
    FindEmpresaRequest,
    ConfirmCollaboratonRequest
}