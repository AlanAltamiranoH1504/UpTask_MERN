import {Request, Response, NextFunction} from "express";
import {Nota} from "../models/Nota";

export const UpdateNote_Middleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // @ts-ignore
        const user_in_session = await req.user;

        const note_to_update = await Nota.findById(req.params.id);
        if (note_to_update.createdBy.toString() !== user_in_session._id.toString()) {
            return res.status(403).json({
                status: false,
                message: "No tienes permisos para la edicion de la nota"
            });
        }
        next();

    } catch (e) {
        return res.status(500).json({
            status: false,
            message: "Error en middleware de actualizacion de notas",
            error: e.message
        });
    }
}