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

    public async find_note(req: Request, res: Response) {
        try {
            const note_to_show = await Nota.findOne({
                _id: req.params.id
            }).populate("tarea", "nombre descripcion proyecto")
                .populate("createdBy", "_id nombre apellidos email")
                .select("-__v -createdAt -updatedAt");
            return res.status(200).json({
                status: true,
                nota: note_to_show
            });
        } catch (e) {
            return res.status(500).json({
                status: false,
                message: "Ocurrio un error en la busqueda de la nota",
                error: e.message
            })
        }
    }

    public async update_note(req: Request, res: Response) {
        try {
            const note_to_update = await Nota.findByIdAndUpdate({
                _id: req.params.id
            }, {
                $set: {
                    titulo: req.body.titulo,
                    contenido: req.body.contenido
                }
            });

            return res.status(200).json({
                status: true,
                message: "Nota actualizada correctamente"
            });
        } catch (e) {
            return res.status(500).json({
                status: false,
                message: "Ocurrio un error en la actualizacion de la nota",
                error: e.message
            })
        }
    }

    public async delete_note(req: Request, res: Response) {
        try {
            await Nota.findByIdAndDelete(req.params.id);
            return res.status(200).json({
                status: true,
                message: "La nota fue eliminada correctamente"
            });
        } catch (e) {
            return res.status(500).json({
                status: false,
                message: "Ocurrio un error en la eliminacion de la nota",
                error: e.message
            });
        }
    }
}