import {body, param, validationResult} from "express-validator";
import Proyecto from "../models/Proyecto";
import User from "../models/User";
import {Empresa} from "../models/Empresa";

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

        // * Si es dueño del proyecto entonces next(), si no lo es, checo que sea un integrante del proyecto
        if (existenciaProyecto.usuario.toString() !== req.user._id.toString()) {
            const is_team_member = existenciaProyecto.equipo.findIndex((member) => {
                return member._id.toString() === req.user._id.toString()
            });
            if (is_team_member < 0) {
                return res.status(401).json({
                    status: false,
                    message: "Permisos denegados"
                });
            }
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

const FindMemberToAddTeamRequest = [
    body("email")
        .notEmpty().withMessage("El email del miembro es obligatorio")
        .isEmail().withMessage("El email del miembro no es valido"),
    param("id")
        .notEmpty().withMessage("El id proyecto es obligatorio")
        .isString().withMessage("El id del proyecto no es valido"),

    async (req, res, next) => {
        const errores = validationResult(req);
        if (!errores.isEmpty()) {
            return res.status(409).json(errores.array());
        }

        //! Busqueda de proyecto y de id empresa
        const proyecto_to_found = await Proyecto.findOne({
            _id: req.params.id
        }).populate("usuario");
        const manager_project = proyecto_to_found.usuario as any;
        const id_company_owner = manager_project.empresa;
        const company_owner = await Empresa.findOne({
            _id: id_company_owner
        });

        //! Busqueda de usuario por email
        const user_to_found = await User.findOne({
            email: req.body.email
        });

        if (!user_to_found) {
            return res.status(404).json({
                status: false,
                message: "El usuario no se encuentra registrado"
            });
        }

        // ! Validacion de pertenecia de usuario con empresa dueña de proyecto
        if (user_to_found.empresa.toString() !== company_owner._id.toString()) {
            return res.status(409).json({
                status: false,
                message: "Error de asociacion de usuario con proyecto. El usuario no pertence a la empresa dueña del proyecto"
            });
        }

        next();
    }
];

const AddMemberToTeamRequest = [
    body("id")
        .notEmpty().withMessage("El usuario es obligatorio")
        .isString().withMessage("El usuario no es valido"),
    async (req, res, next) => {
        const errores = validationResult(req);
        if (!errores.isEmpty()) {
            return res.status(409).json(errores.array());
        }

        const user_to_add = await User.findById(req.body.id);
        if (!user_to_add) {
            return res.status(404).json({
                status: false,
                message: "El usuario no se encuentra registrado"
            });
        }
        next();
    }
];

const RemoveMemberToTeamRequest = [
    body("id")
        .notEmpty().withMessage("El usuario es obligatorio")
        .isString().withMessage("El usuario no es valido"),
    async (req, res, next) => {
        const errores = validationResult(req);
        if (!errores.isEmpty()) {
            return res.status(409).json(errores.array());
        }

        // * Busqueda de usuario en db
        const user_to_remove = await User.findById(req.body.id);
        if (!user_to_remove) {
            return res.status(404).json({
                status: false,
                message: "El usuario no se encuentra registrado"
            });
        }

        // * Busqueda de usuario en miembros de equipo de proyecto
        const {id} = req.params;
        const project_to_show = await Proyecto.findById(id);
        const exists_user_in_team = project_to_show.equipo.findIndex((member) => {
            return member._id.toString() === req.body.id
        });

        // * Validacion de usuario en equipo
        if (exists_user_in_team < 0) {
            return res.status(404).json({
                status: false,
                message: "El usuario no se encuentra como miembro del equipo,"
            });
        }
        next();
    }
];

export {
    CreateProyectoRequest,
    ShowProyectoById,
    UpdateProyectoRequest,
    FindMemberToAddTeamRequest,
    AddMemberToTeamRequest,
    RemoveMemberToTeamRequest
}