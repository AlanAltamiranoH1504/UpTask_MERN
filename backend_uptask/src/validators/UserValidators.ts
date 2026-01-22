import {body, param, validationResult} from "express-validator";
import User from "../models/User";
import {EmailConfirmEmpresa, EmailConfirmUser} from "../types";
import emailConfirmUser from "../emails/EmailConfirmUser";
import bcrypt from "bcrypt";
import {Empresa} from "../models/Empresa";
import {Request, Response,NextFunction} from "express";

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
    body("empresa")
        .notEmpty().withMessage("La empresa asociada es obligatoria")
        .isString().withMessage("La empresa no es valida"),
    // body("rol")
    //     .notEmpty().withMessage("El rol del usuario es obligatorio")
    //     .isString().withMessage("El id del rol no es valido"),

    async (req, res, next) => {
        const errores = validationResult(req);
        if (!errores.isEmpty()) {
            return res.status(409).json({
                errores
            });
        }

        const empresa_to_found = await Empresa.findOne({
            _id: req.body.empresa,
            status: true
        });
        if (!empresa_to_found) {
            return res.status(404).json({
                status: false,
                message: "Empresa no registrada."
            });
        }

        // * Busqueda de rol en la db
        // const rol_to_found = await Rol.findOne({
        //     _id: req.body.rol,
        //     empresa: req.body.empresa
        // });
        // if (!rol_to_found) {
        //     return res.status(404).json({
        //         status: false,
        //         message: "El rol no se encuentra registrado"
        //     });
        // }

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

const LoginRequest = [
    body("email")
        .notEmpty().withMessage("El email del usuario es obligatorio")
        .isString().withMessage("El email debe ser una cadena de texto")
        .isEmail().withMessage("Formato de email no valido"),
    body("password")
        .notEmpty().withMessage("El password es obligatorio")
        .isString().withMessage("El password debe ser una cadena de texto"),

    async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(409).json({
                errors
            });
        }

        //Validacion de usuario
        const user_to_found = await User.findOne({
            email: req.body.email
        });
        if (!user_to_found) {
            return res.status(409).json({
                status: false,
                message: "Usuario no registrado con ese email"
            });
        }

        if (!user_to_found.confirmado_empresa) {
            return res.status(409).json({
                status: false,
                message: "Tu usuario aun no ha sido confirmado por tu empresa. Espera a que lo confirme."
            });
        }

        //Validacion de confirmacion
        if (user_to_found.confirmado === false) {
            const data: EmailConfirmUser = {
                email: req.body.email,
                nombre: user_to_found.nombre,
                subject: "Confirmación de cuenta de usuario",
                token: user_to_found.token
            }
            await emailConfirmUser(data);
            return res.status(422).json({
                status: false,
                message: "Cuenta de usuario no confirmada. Email de confirmacion enviado"
            });
        }

        //Validacion de passwords
        const password_check = await bcrypt.compare(req.body.password, user_to_found.password);
        if (!password_check) {
            return res.status(422).json({
                status: false,
                message: "Credenciales incorrectas"
            });
        }

        next();
    }
];

const SendEmailResetPasswordRequest = [
    body("email")
        .notEmpty().withMessage("El email es obligatorio")
        .isEmail().withMessage("El formato del email no es valido")
        .isString().withMessage("El email debe ser una cadena de caracteres"),

    async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(409).json({
                errors: errors.array()
            });
        }

        //Find User By Email
        const user = await User.findOne({
            email: req.body.email
        });
        if (!user) {
            return res.status(404).json({
                status: false,
                message: `No existe un usuario registrado con el email '${req.body.email}'`
            });
        }
        next();
    }
];

const ResetPasswordRequest = [
    body("token")
        .notEmpty().withMessage("Token de reset de password obligatorio")
        .isString().withMessage("Token de reset de password no valido"),
    body("new_password")
        .notEmpty().withMessage("El password es obligatorio")
        .isString().withMessage("El password debe ser una cadena de caracteres")
        .isLength({min: 5}).withMessage("El password debe tener al menos 5 caracteres"),

    async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(404).json({
                errors: errors.array()
            });
        }
        //User to reset password
        const user_to_reset_password = await User.findOne({
            token: req.body.token
        });
        if (!user_to_reset_password) {
            return res.status(404).json({
                status: false,
                message: "Error en busqueda de usuario para reset de password"
            })
        }
        next();
    }
];

const EditProfileRequest = [
    body("nombre")
        .notEmpty().withMessage("El nombre es obligatorio")
        .isString().withMessage("El nombre debe ser una cadena texto"),
    body("apellidos")
        .notEmpty().withMessage("El apellidos es obligatorio")
        .isString().withMessage("El apellidos debe ser una cadena de caracteres"),
    body("email")
        .notEmpty().withMessage("El email es obligatorio")
        .isEmail().withMessage("Formato de email no valido"),

    async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(409).json(errors.array());
        }

        const email_in_use = await User.findOne({
            email: req.body.email
        });

        if (email_in_use && email_in_use._id.toString() !== req.user._id.toString()) {
            return res.status(409).json({
                status: false,
                message: "El email ya se encuentra en uso por otro usuario"
            });
        }
        next();
    }
]

export {
    CreateUserRequest,
    ConfirmUserRequest,
    LoginRequest,
    SendEmailResetPasswordRequest,
    ResetPasswordRequest,
    EditProfileRequest
}