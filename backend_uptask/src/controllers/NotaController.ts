import {Request, Response} from "express";
import {Nota} from "../models/Nota";

export class NotaController {
    public pruebaNotaController(req: Request, res: Response) {
        return res.status(200).json({
            status: true,
            message: "Funcionando nota controller"
        });
    }

    public async create_note(req, res) {
        try {
            const note_to_create = await Nota.create({
                titulo: req.body.titulo,
                contenido: req.body.contenido,
                tarea: req.body.tarea,
                createdBy: req.user._id
            });

            return res.status(201).json({
                status: true,
                message: "Nota creada correctamente"
            });
        } catch (e) {
            return res.status(500).json({
                status: false,
                message: "Ocurrio un error en la creacion de la nota",
                error: e.message
            });
        }
    }
}