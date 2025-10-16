import {Request, Response} from "express";
import {Empresa} from "../models/Empresa";
import EmpresaRouter from "../routers/EmpresaRouter";

export class EmpresaController {

    public prueba(req: Request, res: Response) {
        return res.status(200).json({
            status: true,
            message: "Funcionando controlador de empresas"
        });
    }

    public async save_empresa(req: Request, res: Response) {
        try {
            const empresa_to_save = await Empresa.create(req.body);
            return res.status(201).json({
                status: true,
                message: "Empresa creada correctamente"
            });
        } catch (e) {
            return res.status(400).json({
                status: false,
                message: `Error en creacion de empresa: ${e.message}`
            })
        }
    }

    public async find_empresa(req: Request, res: Response) {
        try {
            const empresa_to_show = await Empresa.findById(req.params.id).select("_id nombre email status");
            return res.status(200).json({
                status: true,
                empresa: empresa_to_show
            });
        } catch (e) {
            return res.status(409).json({
                status: false,
                message: `Error en busqueda de empresa por id: ${e.message}`
            })
        }
    }

    public async delete_empresa(req: Request, res: Response) {
        try {
            const empresa_to_delete = await Empresa.findByIdAndDelete(req.params.id);
            return res.status(200).json({
                status: true,
                message: "Empresa eliminada correctamente"
            });
        } catch (e) {
            return res.status(500).json({
                status: false,
                message: `Error en eliminacion de empresa ${e.message}`
            })
        }
    }
}