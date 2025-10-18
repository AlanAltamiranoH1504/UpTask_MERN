import {Request, Response} from "express";
import {Rol} from "../models/Rol";
import {v4 as uuidv4} from "uuid";

export class RolController {
    public prueba(req: Request, res: Response) {
        return res.status(200).json({
            status: true,
            message: "Funcionando controlador de roles"
        });
    }

    public async create_rol(req: Request, res: Response) {
        try {
            const rol_to_save = await Rol.create({
                nombre: req.body.nombre,
                slug: uuidv4(),
                empresa: req.body.empresa_id
            });
            return res.status(201).json({
                status: true,
                message: "Rol creado correctamente"
            });
        } catch (e) {
            return res.status(500).json({
                status: false,
                message: "Error en creación de rol",
                error: e.message
            });
        }
    }

    public async types_roles(req: Request, res: Response) {
        try {
            const roles_by_empresa = await Rol.find({
                empresa: req.body.empresa_id
            }).populate({
                path: "empresa",
                select: "_id nombre"
            }).select("_id nombre slug");

            return res.status(200).json({
                status: true,
                roles_by_empresa
            });
        } catch (e) {
            return res.status(500).json({
                status: false,
                message: "Error en listado de roles de la empresa",
                error: e.message
            });
        }
    }

    public async delete_rol(req: Request, res: Response) {
        try {
            const rol_to_delete = await Rol.deleteOne({
                _id: req.body.id
            });
            return res.status(200).json({
                status: true,
                message: "Rol eliminado correctamente"
            });
        } catch (e) {
            return res.status(500).json({
                status: false,
                message: "Error en eliminación de rol",
                error: e.message
            });
        }
    }
}