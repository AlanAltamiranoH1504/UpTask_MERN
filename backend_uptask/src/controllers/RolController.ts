import {Request, Response} from "express";
import {Rol} from "../models/Rol";
import {v4 as uuidv4} from "uuid";
// @ts-ignore
import * as XLSX from "xlsx";
import * as fs from "node:fs";

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

    public async save_rols(req: Request, res: Response) {
        try {
            const file = req.file;
            // ! Validacion de archivo
            if (!file) {
                return res.status(404).json({
                    status: false,
                    message: "El archivo no fue cargado o hubo un error en la carga del mismo"
                });
            }

            // ! Validacion de los mimimes del archivo
            const mime = file.mimetype;
            const valid_mimes = ["application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "application/vnd.ms-excel"];
            const validated_mime = valid_mimes.includes(mime);
            if (!validated_mime) {
                return res.status(409).json({
                    status: false,
                    message: "Mimes de archivo no validas"
                });
            }

            const work_book = XLSX.readFile(file.path);
            const sheetName = work_book.SheetNames[0];
            const data_sheet = XLSX.utils.sheet_to_json(work_book.Sheets[sheetName]);

            let errors = [];
            let count_roles_saved = 0;
            for (let i = 0; i < data_sheet.length; i++) {
                let row = data_sheet[i];
                // @ts-ignore
                let name_rol = row.Rol
                let slug = uuidv4();

                // * Validacion de que el nombre del rol no esta registrado para los roles de la empresa
                let name_rol_in_use = await Rol.findOne({
                    empresa: req.body.empresa,
                    nombre: name_rol
                });

                if (name_rol_in_use) {
                    let error = `El rol '${name_rol}', ya se encontraba registrado en los roles de la empresa`
                    errors.push(error);
                    continue;
                }

                let rol_to_save = await Rol.create({
                    nombre: name_rol,
                    slug,
                    empresa: req.body.empresa
                });
                count_roles_saved++;
            }

            if (errors.length > 0) {
                return res.status(409).json({
                    status: false,
                    errors,
                    roles_guardados: count_roles_saved
                });
            }

            fs.unlinkSync(file.path);

            return res.status(201).json({
                status: true,
                message: "Roles de empresa guardado correctamente"
            });
        } catch (e) {
            return res.status(500).json({
                status: false,
                message: "Error en guardado de roles",
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